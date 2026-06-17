
import { useAppSelector } from "../../redux/hooks";

const GroupInfoModal = ({ conversation, onClose }: any) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6">

        <div className="flex flex-col items-center gap-3 mb-4">
          <img
            src={
              conversation.groupAvatar
                ? `http://localhost:5000/${conversation.groupAvatar}`
                : "/default-group-avatar.png"
            }
            className="w-20 h-20 rounded-full object-cover"
          />

          <h2 className="font-semibold text-lg">
            {conversation.groupName}
          </h2>
        </div>

        <div className="max-h-[250px] overflow-y-auto space-y-2">
          {conversation.participants.map((p: any) => (
            <div
              key={p._id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <img
                src={
                  p.profilePic
                    ? `http://localhost:5000/${p.profilePic}`
                    : "/default-avatar.png"
                }
                className="w-8 h-8 rounded-full"
              />

              <span className="text-sm">
                {p._id === currentUser?._id ? "You" : p.username}
              </span>

              {conversation.groupAdmin === p._id && (
                <span className="text-xs text-primary ml-auto">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoModal;
