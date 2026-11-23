import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { authRoutes } from './routes/authRoutes.js';
import { notesRoutes } from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || false, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);