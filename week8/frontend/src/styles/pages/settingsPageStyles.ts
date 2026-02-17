
import styled from "styled-components";

export const SettingsWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SettingsCard = styled.div`
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;
