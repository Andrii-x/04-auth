import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import { validateLoginUser, validateRegisterUser } from '../validations/authValidation.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRegisterUser, registerUser);
authRoutes.post('/login', validateLoginUser, loginUser);
authRoutes.post('/refresh', refreshUserSession);
authRoutes.post('/logout', logoutUser);