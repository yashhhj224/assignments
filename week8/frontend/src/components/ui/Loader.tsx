
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 4px solid #e5e7eb;
  border-top-color: #4338ca;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loader;