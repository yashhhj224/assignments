
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
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

const ChangePasswordTab = () => {
  const dispatch = useAppDispatch();
  const { changePassword, authError, clearAuthError } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    clearAuthError();

    const result = await changePassword({
      currentPassword,
      newPassword
    });

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast("Password changed successfully"));
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <div>
      <Title>Change Password</Title>

      {authError && <ErrorMessage message={authError} />}

      <Field>
        <label>Current Password</label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Field>

      <Field>
        <label>New Password</label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Field>

      <Button onClick={handleSubmit}>Update Password</Button>
    </div>
  );
};

export default ChangePasswordTab;
