
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
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
  content: string;
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
  lastMessage?: string;
  lastMessageAt?: string;
  lastReadMessageIds?: Record<string, string>;
  unreadCounts?: Record<string, number>;
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
  }: {
    conversationId: string;
    content: string;
  }) => {
    const data = await sendMessageApi(conversationId, content);
    return data.data;
  }
);

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  onlineUsers: string[];
  currentUserId: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  onlineUsers: [],
  currentUserId: null,
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

      if (!conv.lastReadMessageIds) {
        conv.lastReadMessageIds = {};
      }

      const currentUserId = state.currentUserId;

      const isIncoming =
        currentUserId &&
        message.receiver?._id === currentUserId;

      const isChatOpen =
        state.activeConversationId === convId;

      if (isIncoming && isChatOpen) {
        conv.lastReadMessageIds[currentUserId] = message._id;
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
          const lastMessage = messages[messages.length - 1];

          if (!conv.lastReadMessageIds) {
            conv.lastReadMessageIds = {};
          }

          conv.lastReadMessageIds[state.currentUserId] =
            lastMessage._id;
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
      });
  },
});

export const {
  setActiveConversation,
  setCurrentUserId,
  receiveMessage,
  addConversation,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;



