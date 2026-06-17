
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 72px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  margin-bottom: 20px;
  color: #6b7280;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #4338ca;
  color: white;
  cursor: pointer;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>404</Title>
      <Text>Page not found</Text>
      <Button onClick={() => navigate("/home")}>
        Go Home
      </Button>
    </Wrapper>
  );
};

export default NotFoundPage;