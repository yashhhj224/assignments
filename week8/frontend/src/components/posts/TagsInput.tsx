
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-radius: 12px;
`;

const Tag = styled.div`
  background: #eef2ff;
  padding: 6px 10px;
  border-radius: 14px;
  font-size: 13px;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagsInput = ({ tags, setTags }: Props) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  return (
    <Wrapper>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
      <Input
        placeholder="Add tag..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Wrapper>
  );
};

export default TagsInput;