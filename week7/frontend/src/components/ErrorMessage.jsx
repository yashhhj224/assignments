export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffdddd",
        color: "#a40000",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "10px",
        fontWeight: "600"
      }}
    >
      {message}
    </div>
  );
}
