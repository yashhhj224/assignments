
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getSocket } from "../../socket";
import { receiveMessage, setCurrentUserId } from "../../redux/slices/chatSlice";

const ChatLayout = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(setCurrentUserId(currentUser._id));
    }
  }, [currentUser, dispatch]);
  
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message: any) => {
      dispatch(receiveMessage(message));
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [dispatch]);

  return (
    <div className="h-full flex bg-white">
      
      <div className="w-[340px] border-r border-gray-200 flex flex-col bg-white">
        <ConversationList />
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatLayout;
