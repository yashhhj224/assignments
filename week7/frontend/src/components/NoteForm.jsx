import { useEffect, useState } from "react";
import "../styles/notes.css";

export default function NoteForm({ onSubmit, selectedNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{selectedNote ? "Update Note" : "Create Note"}</h2>

      <input
        type="text"
        placeholder="Enter note title (e.g. Shopping List)"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Write your note here... (e.g. Buy milk, eggs, bread)"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />

      <div className="form-actions">
        <button type="submit" className="form-btn save">
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button type="button" className="form-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
