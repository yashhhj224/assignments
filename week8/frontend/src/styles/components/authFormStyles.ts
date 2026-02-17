
import styled from "styled-components";

export const AuthFormWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const AuthFormTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AuthLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
