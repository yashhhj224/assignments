const express = require("express");
const authenticateUser = require("../middlewares/authMiddleware");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/notesController");

const router = express.Router();

router.get("/notes", authenticateUser, getNotes);
router.post("/notes", authenticateUser, createNote);
router.put("/notes/:id", authenticateUser, updateNote);
router.delete("/notes/:id", authenticateUser, deleteNote);

module.exports = router;
