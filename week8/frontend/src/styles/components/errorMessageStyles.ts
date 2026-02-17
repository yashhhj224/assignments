
import styled from "styled-components";

export const ErrorWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 77, 79, 0.08);
  border: 1px solid rgba(255, 77, 79, 0.3);
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
