
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const AuthLayout = ({ left, right }: Props) => {
  return (
    <Wrapper>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Wrapper>
  );
};

export default AuthLayout;