
import styled from "styled-components";
import UserLink from "../common/UserLink";

const Wrapper = styled.div<{ $detailed?: boolean }>`
  background: ${({ $detailed }) =>
    $detailed ? "white" : "transparent"};
  padding: ${({ $detailed }) =>
    $detailed ? "20px" : "0"};
  border-radius: 12px;
  margin-bottom: 20px;
`;

const AuthorCard = ({ author, detailed }: any) => {
  return (
    <Wrapper $detailed={detailed}>
      <UserLink user={author} size={48} />
    </Wrapper>
  );
};

export default AuthorCard;