import { isCelebrateError } from 'celebrate';

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const isValidationError = isCelebrateError(error);
  const status = isValidationError ? 400 : error.statusCode || error.status || 500;
  let message = status === 500 ? 'Internal Server Error' : error.message;

  if (isValidationError) {
    message = [...error.details.values()].map((detail) => detail.message).join(', ');
  }

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({ message });
};