import { NextFunction } from 'express';
import { IError } from "../models/errorModel";

const appError = (httpStatus: string | number, errorMessage: string, next: NextFunction) => {
  const error: IError = new Error(errorMessage)
  error.message = errorMessage;
  error.statusCode = httpStatus;
  error.isOperational = true;
  next(error);
}

module.exports = appError