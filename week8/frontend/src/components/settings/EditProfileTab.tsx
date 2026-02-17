
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateProfileApi } from "../../api/userApi";
import ErrorMessage from "../common/ErrorMessage";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/slices/toastSlice";

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
`;

const EditProfileTab = () => {
  const dispatch = useAppDispatch();
  const { authUser, refreshProfile } = useAuth();

  const [username, setUsername] = useState(authUser?.username || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setError(null);

      await updateProfileApi({ username, email });

      dispatch(showToast("Profile updated successfully"));

      await refreshProfile();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Title>Edit Profile</Title>

      {error && <ErrorMessage message={error} />}

      <Field>
        <label>Username</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>

      <Field>
        <label>Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Button onClick={handleUpdate}>Save Changes</Button>
    </div>
  );
};

export default EditProfileTab;
