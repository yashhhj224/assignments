import { useState } from "react";
import { NoteCardBox, NoteTitle, NoteContent, NoteActions, NoteButton, ShowButton } from "../styles/NotesStyles";

export default function NoteCard({ note, onEditClick, onDeleteClick }) {
  const [showFull, setShowFull] = useState(false);

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const isLongTitle = note.title.length > 40;
  const isLongContent = note.content.length > 120;

  return (
    <NoteCardBox>
      <NoteTitle>{showFull ? note.title : limitText(note.title, 40)}</NoteTitle>

      <NoteContent>
        {showFull ? note.content : limitText(note.content, 120)}
      </NoteContent>

      {(isLongTitle || isLongContent) && (
        <ShowButton onClick={() => setShowFull(!showFull)}>
          {showFull ? "Show Less" : "Show More"}
        </ShowButton>
      )}

      <NoteActions>
        <NoteButton $variant="edit" onClick={() => onEditClick(note)}>
          Edit
        </NoteButton>

        <NoteButton $variant="delete" onClick={() => onDeleteClick(note._id)}>
          Delete
        </NoteButton>
      </NoteActions>
    </NoteCardBox>
  );
}
