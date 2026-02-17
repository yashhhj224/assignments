
import styled from "styled-components";

export const LoaderWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.surfaceLight};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
