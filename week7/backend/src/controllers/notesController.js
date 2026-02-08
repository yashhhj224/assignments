const Note = require("../models/noteModel");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newNote = await Note.create({
      userId: req.user._id,
      title,
      content
    });

    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    const note = await Note.findOne({ _id: noteId, userId: req.user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();

    return res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.user._id
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
