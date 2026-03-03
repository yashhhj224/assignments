
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
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
setActiveConversation(state, action) {
  state.activeConversationId = action.payload;

  const conv = state.conversations.find(
    c => c._id === action.payload
  );

  if (conv && conv.unreadCounts) {
    const userId = action.meta?.currentUserId;
    if (userId) {
      conv.unreadCounts[userId] = 0;
    }
  }
},

    receiveMessage(state, action) {
      const message: Message = action.payload;
      const convId = message.conversationId;

      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }

      const alreadyExists = state.messages[convId].some(
        (m) => m._id === message._id
      );

      if (!alreadyExists) {
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
        state.messages[action.payload.conversationId] =
          action.payload.messages || [];
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
  const message: Message = action.payload;
  const convId = message.conversationId;

  if (!state.messages[convId]) {
    state.messages[convId] = [];
  }

  // Prevent duplicate
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

    // Remove old position
    state.conversations.splice(index, 1);

    // Move to top
    state.conversations.unshift(updatedConv);
  }
});
  },
});

export const {
  setActiveConversation,
  receiveMessage,
  addConversation,
  setOnlineUsers
} = chatSlice.actions;

export default chatSlice.reducer;
