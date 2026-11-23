import { Joi, Segments, celebrate } from 'celebrate';
import { TAGS } from '../constants/tags.js';

const noteFields = {
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  tag: Joi.string().valid(...TAGS).required(),
};

export const validateCreateNote = celebrate({
  [Segments.BODY]: Joi.object(noteFields),
});

export const validateUpdateNote = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim(),
    content: Joi.string().trim(),
    tag: Joi.string().valid(...TAGS),
  })
    .min(1)
    .required(),
});

export const validateNoteId = celebrate({
  [Segments.PARAMS]: Joi.object({ noteId: Joi.string().hex().length(24).required() }),
});