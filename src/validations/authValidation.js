import { Joi, Segments, celebrate } from 'celebrate';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegisterUser = celebrate({ [Segments.BODY]: registerUserSchema });
export const validateLoginUser = celebrate({ [Segments.BODY]: loginUserSchema });