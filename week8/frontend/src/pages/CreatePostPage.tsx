
import styled from "styled-components";
import PostEditor from "../components/posts/PostEditor";

const Wrapper = styled.div`
  padding: 0px 0px;
`;

const CreatePostPage = () => {
  return (
    <Wrapper>
      <PostEditor />
    </Wrapper>
  );
};

export default CreatePostPage;