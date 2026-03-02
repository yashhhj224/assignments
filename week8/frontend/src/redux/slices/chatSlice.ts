
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchConversationsApi,
  fetchMessagesApi,
  sendMessageApi,
} from "../../api/chatApi";

export interface Message {
  _id: string;
  conversation: string;
  sender: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  participants: {
    _id: string;
    username: string;
  }[];
  lastMessage?: Message;
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
        messages: data.data.messages 
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
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },

    receiveMessage(state, action) {
      const message = action.payload;
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
    },

    updateConversationLastMessage(state, action) {
      const message = action.payload;

      const conv = state.conversations.find(
        (c) => c._id === message.conversationId
      );

      if (conv) {
        conv.lastMessage = message;
      }
    },

    addConversation(state, action) {
        const exists = state.conversations.some(
            (c) => c._id === action.payload._id
        );

        if (!exists) {
            state.conversations.push(action.payload);
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages[action.payload.conversationId] =
          action.payload.messages;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        const convId = message.conversationId;

        if (!state.messages[convId]) {
          state.messages[convId] = [];
        }

        state.messages[convId].push(message);

        const conv = state.conversations.find(
          (c) => c._id === convId
        );

        if (conv) {
          conv.lastMessage = message;
        }
      });
  },
});

export const {
  setActiveConversation,
  receiveMessage,
  updateConversationLastMessage,
  addConversation
} = chatSlice.actions;

export default chatSlice.reducer;