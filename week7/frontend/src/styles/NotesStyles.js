import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h1 {
    font-size: 30px;
    font-weight: 800;
    color: #111827;
  }
`;

export const WelcomeText = styled.p`
  margin-bottom: 25px;
  color: #374151;
  font-size: 15px;
`;

export const LogoutButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(120deg, #dc2626, #991b1b);
  color: white;
  cursor: pointer;
  font-weight: 700;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 15px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const NoteCardBox = styled.div`
  background: white;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 18px;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const NoteTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  word-break: break-word;
`;

export const NoteContent = styled.p`
  margin-bottom: 10px;
  color: #374151;
  line-height: 1.5;
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const NoteActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const NoteButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  flex: 1;
  transition: 0.3s;
  color: white;

  background: ${(props) =>
    props.$variant === "edit"
      ? "linear-gradient(120deg, #2563eb, #1d4ed8)"
      : "linear-gradient(120deg, #dc2626, #991b1b)"};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

export const ShowButton = styled.button`
  background: transparent;
  border: none;
  color: #2563eb;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const NoteFormBox = styled.form`
  background: white;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 25px;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);

  h2 {
    margin-bottom: 14px;
    font-size: 20px;
    font-weight: 800;
    color: #111827;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    outline: none;
    font-size: 15px;
    font-family: inherit;
  }

  input:focus,
  textarea:focus {
    border-color: #2563eb;
    box-shadow: 0px 0px 0px 3px rgba(37, 99, 235, 0.2);
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const FormButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 800;
  flex: 1;
  transition: 0.3s;
  color: white;

  background: ${(props) =>
    props.$variant === "cancel"
      ? "linear-gradient(120deg, #6b7280, #374151)"
      : "linear-gradient(120deg, #16a34a, #15803d)"};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

export const CharCounter = styled.p`
  text-align: right;
  margin-top: -8px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => (props.$danger ? "#dc2626" : "#6b7280")};
`;
