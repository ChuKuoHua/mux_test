const appError = (httpStatus, errorMessage, next) => {
  const error = new Error(errorMessage)
  error.message = errorMessage;
  error.statusCode = httpStatus;
  error.isOperational = true;
  next(error);
}

module.exports = appError