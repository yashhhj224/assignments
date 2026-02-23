
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateProfile } from "../../redux/slices/authSlice";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

type Props = {
  user: any;
  onClose: () => void;
};

const EditProfileModal = ({ user, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);

    if (image) {
      formData.append("profilePicture", image);
    }

    await dispatch(updateProfile(formData));
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h2>Edit Profile</h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <ButtonRow>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default EditProfileModal;
