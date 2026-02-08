export default function NoteCard({ note, onEditClick, onDeleteClick }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "15px"
      }}
    >
      <h3 style={{ marginBottom: "5px", color: "#222" }}>{note.title}</h3>
      <p style={{ marginBottom: "10px", color: "#555" }}>{note.content}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onEditClick(note)}
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDeleteClick(note._id)}
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#dc2626",
            color: "white",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
