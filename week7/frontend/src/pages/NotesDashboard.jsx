import { useEffect, useState } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/apiClient";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { clearAuthData, getLoggedInUser } from "../utils/authHelper";
import { useNavigate } from "react-router-dom";

export default function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const loadNotes = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const notesData = await fetchNotes();
      setNotes(notesData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNoteSubmit = async (noteData) => {
    setErrorMessage("");

    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, noteData);
        setSelectedNote(null);
      } else {
        await createNote(noteData);
      }

      await loadNotes();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = (note) => {
    setSelectedNote(note);
  };

  const handleCancelEdit = () => {
    setSelectedNote(null);
  };

  const handleDeleteClick = async (noteId) => {
    setErrorMessage("");

    try {
      await deleteNote(noteId);
      await loadNotes();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Notes Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#dc2626",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ marginTop: "5px", marginBottom: "20px", color: "#444" }}>
        Welcome, {loggedInUser?.fullName}
      </p>

      <ErrorMessage message={errorMessage} />

      <NoteForm
        onSubmit={handleNoteSubmit}
        selectedNote={selectedNote}
        onCancel={handleCancelEdit}
      />

      {isLoading ? (
        <Loader />
      ) : notes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notes found.</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))
      )}
    </div>
  );
}
