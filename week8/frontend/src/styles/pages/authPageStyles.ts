
import styled from "styled-components";

export const AuthPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 26px;
`;

export const AuthPageBottomText = styled.div`
  margin-top: 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AuthPageLinkText = styled.span`
  color: #3b82f6;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;
