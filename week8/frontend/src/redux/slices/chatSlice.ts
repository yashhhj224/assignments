
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGroupApi,
  fetchConversationsApi,
  fetchMessagesApi,
  sendMessageApi,
} from "../../api/chatApi";

export interface Message {
  _id: string;
  conversationId: string;

  sender: {
    _id: string;
    username: string;
    profilePic?: string;
  };

  receiver: {
    _id: string;
    username: string;
    profilePic?: string;
  };

  type: "TEXT" | "MEDIA";

  content: string;

  media?: {
    type: "IMAGE" | "VIDEO";
    url: string;
  }[];

  createdAt: string;
}

export interface Conversation {
  _id: string;

  participants: {
    _id: string;
    username: string;
    profilePic?: string;
    isOnline?: boolean;
  }[];

  type: "DIRECT" | "GROUP";

  groupName?: string;
  groupAvatar?: string;
  groupAdmin?: string;

  lastMessage?: string;
  lastMessageSender?: string;
  lastMessageAt?: string;

  unreadBy?: string[];
}

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async () => {
    const data = await fetchConversationsApi();
    return data.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId: string) => {
    const data = await fetchMessagesApi(conversationId);
    return {
      conversationId,
      messages: data.data.messages,
    };
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({
    conversationId,
    content,
    files,
  }: {
    conversationId: string;
    content: string;
    files?: File[];
  }) => {
    const data = await sendMessageApi(conversationId, content, files);
    return data.data;
  }
);

export const createGroup = createAsyncThunk(
  "chat/createGroup",
  async ({
    name,
    memberIds,
    avatar,
  }: {
    name: string;
    memberIds: string[];
    avatar?: File | null;
  }) => {
    const data = await createGroupApi(name, memberIds, avatar);
    return data.data;
  }
);

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  onlineUsers: string[];
  currentUserId: string | null;
  typingUsers: Record<string, boolean>;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  onlineUsers: [],
  currentUserId: null,
  typingUsers: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation(state, action) {
      const { conversationId } = action.payload;
      state.activeConversationId = conversationId;
    },

    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },

    receiveMessage(state, action) {
      const message: Message = action.payload;
      const convId = message.conversationId;

      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }

      const exists = state.messages[convId].some(
        (m) => m._id === message._id
      );

      if (!exists) {
        state.messages[convId].push(message);
      }

      const index = state.conversations.findIndex(
        (c) => c._id === convId
      );

      if (index === -1) return;

      const conv = state.conversations[index];

      const currentUserId = state.currentUserId;

      const isIncoming =
        currentUserId &&
        message.receiver?._id === currentUserId;

      const isChatOpen =
        state.activeConversationId === convId;

      if (conv && currentUserId) {
        if (isIncoming && isChatOpen) {
          conv.unreadBy = conv.unreadBy?.filter(
            (id) => id !== currentUserId
          );
        }

        if (!isIncoming) {
          const receiverId = message.receiver?._id;

          if (receiverId && !conv.unreadBy?.includes(receiverId)) {
            conv.unreadBy = [...(conv.unreadBy || []), receiverId];
          }
        }
      }
      
      const updatedConv = {
        ...conv,
        lastMessage: message.content,
        lastMessageAt: message.createdAt,
      };

      state.conversations.splice(index, 1);
      state.conversations.unshift(updatedConv);
    },

    addConversation(state, action) {
      const newConv: Conversation = action.payload;

      const exists = state.conversations.some(
        (c) => c._id === newConv._id
      );

      if (!exists) {
        state.conversations.unshift(newConv);
      }
    },

    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },

    setTyping(state, action) {
      const { conversationId, userId, isTyping } = action.payload;

      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = false;
      }

      state.typingUsers[conversationId] = isTyping;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload || [];
      })

      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;

        state.messages[conversationId] = messages || [];

        const conv = state.conversations.find(
          (c) => c._id === conversationId
        );

        if (
          conv &&
          state.currentUserId &&
          messages.length > 0 &&
          state.activeConversationId === conversationId
        ) {
          if (conv && state.currentUserId) {
            conv.unreadBy = conv.unreadBy?.filter(
              (id) => id !== state.currentUserId
            );
          }
        }
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        const message: Message = action.payload;
        const convId = message.conversationId;

        if (!state.messages[convId]) {
          state.messages[convId] = [];
        }

        const exists = state.messages[convId].some(
          (m) => m._id === message._id
        );

        if (!exists) {
          state.messages[convId].push(message);
        }

        const index = state.conversations.findIndex(
          (c) => c._id === convId
        );

        if (index !== -1) {
          const updatedConv = {
            ...state.conversations[index],
            lastMessage: message.content,
            lastMessageAt: message.createdAt,
          };

          state.conversations.splice(index, 1);
          state.conversations.unshift(updatedConv);
        }
      })

      .addCase(createGroup.fulfilled, (state, action) => {
        if (!action.payload) return; 

        const exists = state.conversations.some(
          (c) => c._id === action.payload._id
        );

        if (!exists) {
          state.conversations.unshift(action.payload);
        }
      });
  },
});

export const {
  setActiveConversation,
  setCurrentUserId,
  receiveMessage,
  addConversation,
  setOnlineUsers,
  setTyping,
} = chatSlice.actions;

export default chatSlice.reducer;



