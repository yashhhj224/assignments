
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateProfile } from "../../redux/slices/authSlice";
import { DEFAULT_AVATAR } from "../../constants/assets";
import { fetchUserById } from "../../redux/slices/usersSlice";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 460px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 22px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #475569;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #4338ca;
    box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.15);
  }
`;

const FileInput = styled.input`
  font-size: 14px;
`;

const AvatarPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f5f9;
  align-self: center;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }
`;

const SaveButton = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #4338ca, #6366f1);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(67, 56, 202, 0.35);
  }
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

  const previewUrl = image
    ? URL.createObjectURL(image)
    : user?.profilePic
    ? `http://localhost:5000/${user.profilePic}`
    : null;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);

    if (image) {
      formData.append("profilePic", image);
    }

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      dispatch(fetchUserById(user._id));
      onClose();
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>Edit Profile</Title>

        <AvatarPreview>
          <AvatarImage 
            src={ 
              previewUrl
                ? previewUrl
                : DEFAULT_AVATAR 
            } 
          />
        </AvatarPreview>

        <Field>
          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Profile Picture</Label>
          <FileInput
            type="file"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
        </Field>

        <ButtonRow>
          <CancelButton onClick={onClose}>
            Cancel
          </CancelButton>
          <SaveButton onClick={handleSubmit}>
            Save Changes
          </SaveButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default EditProfileModal;