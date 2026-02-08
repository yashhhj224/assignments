import { useEffect, useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f9fafb",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>
        {selectedNote ? "Update Note" : "Create Note"}
      </h2>

      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <textarea
        placeholder="Enter note content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minHeight: "90px"
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#16a34a",
            color: "white",
            cursor: "pointer"
          }}
        >
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#6b7280",
              color: "white",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
