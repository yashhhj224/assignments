
import styled from "styled-components";
import PostEditor from "../components/posts/PostEditor";

const Wrapper = styled.div`
  padding: 40px 60px;
`;

const CreatePostPage = () => {
  return (
    <Wrapper>
      <PostEditor />
    </Wrapper>
  );
};

export default CreatePostPage;