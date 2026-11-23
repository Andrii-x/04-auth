import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { clearSessionCookies, createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password });
  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteMany({ userId: user._id });
  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(200).json(user);
});

export const refreshUserSession = asyncHandler(async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = mongoose.isValidObjectId(sessionId) && refreshToken
    ? await Session.findOne({ _id: sessionId, refreshToken })
    : null;

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.refreshTokenValidUntil <= new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({ _id: session._id });
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const { sessionId } = req.cookies;
  if (mongoose.isValidObjectId(sessionId)) {
    await Session.deleteOne({ _id: sessionId });
  }

  clearSessionCookies(res);
  res.status(204).end();
});