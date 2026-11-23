import createHttpError from 'http-errors';
import { Note } from '../models/note.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const noteNotFound = () => createHttpError(404, 'Note not found');

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(note);
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: req.user._id });
  res.status(200).json(notes);
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.noteId, userId: req.user._id });
  if (!note) {
    throw noteNotFound();
  }

  res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.noteId, userId: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!note) {
    throw noteNotFound();
  }

  res.status(200).json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user._id });
  if (!note) {
    throw noteNotFound();
  }

  res.status(200).json(note);
});