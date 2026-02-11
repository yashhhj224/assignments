import { useEffect, useState } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/apiClient";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { clearAuthData, getLoggedInUser } from "../utils/authHelper";
import { useNavigate } from "react-router-dom";
import { DashboardContainer, DashboardHeader, WelcomeText, LogoutButton, NotesGrid, NoNotesText } from "../styles/NotesStyles";

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

      if (
        error.message.toLowerCase().includes("invalid token") ||
        error.message.toLowerCase().includes("access denied") ||
        error.message.toLowerCase().includes("token missing")
      ) {
        clearAuthData();
        navigate("/", { replace: true });
      }
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
    navigate("/", { replace: true });
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Notes Dashboard</h1>
        <LogoutButton type="button" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </DashboardHeader>

      <WelcomeText>Welcome, {loggedInUser?.fullName}</WelcomeText>

      <ErrorMessage message={errorMessage} />

      <NoteForm
        onSubmit={handleNoteSubmit}
        selectedNote={selectedNote}
        onCancel={handleCancelEdit}
      />

      {isLoading ? (
        <Loader />
      ) : notes.length === 0 ? (
        <NoNotesText>No notes found.</NoNotesText>
      ) : (
        <NotesGrid>
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </NotesGrid>
      )}
    </DashboardContainer>
  );
}
