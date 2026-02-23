
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostDetail from "../components/posts/PostDetail";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  padding: 10px 10px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0
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