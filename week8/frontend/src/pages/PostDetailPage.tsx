
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostDetail from "../components/posts/PostDetail";

const Wrapper = styled.div`
  background: #f3f4f6;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0px 0 80px 0;
`;

const PostDetailPage = () => {
  const { id } = useParams(); 

  if (!id) return null;

  return (
    <Wrapper>
      <Container>
        <PostDetail postId={id} />
      </Container>
    </Wrapper>
  );
};

export default PostDetailPage;