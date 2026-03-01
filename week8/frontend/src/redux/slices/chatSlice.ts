
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchConversationsApi,
  fetchMessagesApi,
  sendMessageApi,
} from "../../api/chatApi";

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
    return { conversationId, messages: data.data };
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
  conversations: any[];
  messages: Record<string, any[]>;
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
        const convId = action.payload.conversation;
        if (!state.messages[convId]) {
          state.messages[convId] = [];
        }
        state.messages[convId].push(action.payload);
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;
