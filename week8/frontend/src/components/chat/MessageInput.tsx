
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendMessage } from "../../redux/slices/chatSlice";
import { IoSend } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { getSocket } from "../../socket";

interface Props {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const MessageInput = ({ inputRef }: Props) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { activeConversationId } = useAppSelector((state) => state.chat);

  const handleSend = () => {
    if (!activeConversationId) return;

    const trimmed = text.trim();

    if (!trimmed && files.length === 0) return;

    dispatch(
      sendMessage({
        conversationId: activeConversationId,
        content: trimmed,
        files,
      })
    );

    setText("");
    setFiles([]);
    setPreviews([]);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleFileChange = (fileList: FileList) => {
    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    Array.from(fileList).forEach((f) => {
      if (f.type.startsWith("image/") || f.type.startsWith("video/")) {
        validFiles.push(f);
        validPreviews.push(URL.createObjectURL(f));
      }
    });

    setFiles(validFiles);
    setPreviews(validPreviews);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-2">

      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {previews.map((p, i) => (
            <div key={i} className="relative">
              {files[i]?.type.startsWith("image/") ? (
                <img src={p} className="w-24 rounded-lg" />
              ) : (
                <video src={p} className="w-28 rounded-lg" controls />
              )}

              <button
                onClick={() => {
                  const newFiles = [...files];
                  const newPreviews = [...previews];
                  newFiles.splice(i, 1);
                  newPreviews.splice(i, 1);
                  setFiles(newFiles);
                  setPreviews(newPreviews);
                }}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-4">

        <label className="cursor-pointer bg-gray-100 p-3 rounded-full hover:bg-gray-200">
          <FiPlus size={18} />

          <input
            type="file"
            hidden
            accept="*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                handleFileChange(e.target.files);
              }
            }}
          />
        </label>

        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            const socket = getSocket();
            if (!socket || !activeConversationId) return;

            socket.emit("typing", {
              conversationId: activeConversationId,
            });

            setTimeout(() => {
              socket.emit("stop_typing", {
                conversationId: activeConversationId,
              });
            }, 1000);

            const el = e.target;
            el.style.height = "auto";

            const maxHeight = 150;

            if (el.scrollHeight > maxHeight) {
              el.style.height = maxHeight + "px";
              el.style.overflowY = "auto";
            } else {
              el.style.height = el.scrollHeight + "px";
              el.style.overflowY = "hidden";
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 bg-gray-100 rounded-2xl px-6 py-3 text-sm resize-none
          focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleSend}
          className="bg-primary text-white p-3 rounded-full hover:opacity-90"
        >
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
