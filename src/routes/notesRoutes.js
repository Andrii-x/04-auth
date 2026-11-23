import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateCreateNote,
  validateNoteId,
  validateUpdateNote,
} from '../validations/notesValidation.js';

export const notesRoutes = Router();

notesRoutes.use(authenticate);
notesRoutes.get('/', getAllNotes);
notesRoutes.get('/:noteId', validateNoteId, getNoteById);
notesRoutes.post('/', validateCreateNote, createNote);
notesRoutes.patch('/:noteId', validateNoteId, validateUpdateNote, updateNote);
notesRoutes.delete('/:noteId', validateNoteId, deleteNote);