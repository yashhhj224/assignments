import { useEffect, useState } from "react";
import { NoteFormBox, FormActions, FormButton, CharCounter } from "../styles/NotesStyles";

export default function NoteForm({ onSubmit, selectedNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const TITLE_LIMIT = 120;

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.length > TITLE_LIMIT) {
      alert(`Title cannot exceed ${TITLE_LIMIT} characters.`);
      return;
    }

    onSubmit({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <NoteFormBox onSubmit={handleSubmit}>
      <h2>{selectedNote ? "Update Note" : "Create Note"}</h2>

      <input
        type="text"
        placeholder="Enter note title (e.g. Shopping List)"
        value={title}
        maxLength={TITLE_LIMIT}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <CharCounter $danger={title.length === TITLE_LIMIT}>
        {title.length}/{TITLE_LIMIT}
      </CharCounter>

      <textarea
        placeholder="Write your note here... (e.g. Buy milk, eggs, bread)"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />

      <FormActions>
        <FormButton type="submit">
          {selectedNote ? "Update" : "Create"}
        </FormButton>

        {selectedNote && (
          <FormButton type="button" $variant="cancel" onClick={onCancel}>
            Cancel
          </FormButton>
        )}
      </FormActions>
    </NoteFormBox>
  );
}
