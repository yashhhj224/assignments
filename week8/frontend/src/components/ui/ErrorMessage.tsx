
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 16px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
  margin-bottom: 16px;
`;

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return <Wrapper>{message}</Wrapper>;
};

export default ErrorMessage;