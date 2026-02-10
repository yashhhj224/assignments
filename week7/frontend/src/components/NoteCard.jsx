import { useState } from "react";
import "../styles/notes.css";

export default function NoteCard({ note, onEditClick, onDeleteClick }) {
  const [showFull, setShowFull] = useState(false);

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const isLongTitle = note.title.length > 40;
  const isLongContent = note.content.length > 120;

  return (
    <div className="note-card">
      <h3 className="note-title">
        {showFull ? note.title : limitText(note.title, 40)}
      </h3>

      <p className={`note-content ${showFull ? "expanded" : ""}`}>
        {showFull ? note.content : limitText(note.content, 120)}
      </p>

      {(isLongTitle || isLongContent) && (
        <button className="show-btn" onClick={() => setShowFull(!showFull)}>
          {showFull ? "Show Less" : "Show More"}
        </button>
      )}

      <div className="note-actions">
        <button className="note-btn edit" onClick={() => onEditClick(note)}>
          Edit
        </button>

        <button
          className="note-btn delete"
          onClick={() => onDeleteClick(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
