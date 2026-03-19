
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createGroup, setActiveConversation } from "../../redux/slices/chatSlice";
import { fetchAllUsers } from "../../redux/slices/usersSlice";
import UserLink from "../common/UserLink";

const CreateGroupModal = ({ onClose }: any) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const toggleUser = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleAvatarChange = (file: File) => {
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

    const handleCreate = async () => {
    if (!name || selected.length === 0 || loading) return;

    setLoading(true);

    try {
        const res = await dispatch(
        createGroup({
            name,
            memberIds: selected,
            avatar,
        })
        ).unwrap();

        if (res?._id) {
        dispatch(
            setActiveConversation({
            conversationId: res._id,
            currentUserId: res.groupAdmin, 
            })
        );
        }

        onClose();
    } catch (err) {
        console.error("Group creation failed:", err);
        alert(err);
    }

    setLoading(false);
  };

  const isValid = name.trim().length > 0 && selected.length > 0;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white w-[440px] rounded-2xl shadow-xl p-6 animate-fadeIn">
        
        {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-gray-600">
                    Creating group...
                </span>
                </div>
            </div>
        )}

        <h2 className="text-lg font-semibold mb-4">
          Create Group
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <label className="cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500">
                  Upload
                </span>
              )}
            </div>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleAvatarChange(e.target.files[0]);
                }
              }}
            />
          </label>

          <input
            placeholder="Enter group name..."
            className="flex-1 bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selected.map((id) => {
              const user = users.find((u: any) => u._id === id);
              if (!user) return null;

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-primaryLight px-3 py-1 rounded-full text-xs"
                >
                  {user.username}
                  <button
                    onClick={() => toggleUser(id)}
                    className="text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="max-h-[220px] overflow-y-auto space-y-2 mb-4 pr-1">
          {users.map((u: any) => {
            const isChecked = selected.includes(u._id);

            return (
              <div
                key={u._id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
                  isChecked ? "bg-primaryLight" : "hover:bg-gray-100"
                }`}
                onClick={() => toggleUser(u._id)}
              >
                <UserLink user={u} />

                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="accent-primary pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={!isValid || loading}
            className={`text-sm px-4 py-2 rounded-lg text-white transition flex items-center gap-2 ${
                !isValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:opacity-90"
            }`}
            >
            {loading && (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
