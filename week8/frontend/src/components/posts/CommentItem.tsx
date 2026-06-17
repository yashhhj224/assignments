
import styled from "styled-components";
import UserLink from "../common/UserLink";

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Content = styled.p`
  margin-top: 6px;
`;

const CommentItem = ({ comment }: any) => {
  return (
    <Wrapper>
      <UserLink user={comment.user} size={32} />
      <Content>{comment.content}</Content>
    </Wrapper>
  );
};

export default CommentItem;