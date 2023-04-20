export interface IError extends Error {
  statusCode?: string | number;
  name: string;
  isOperational?: boolean;
}

export interface serverError {
  syscall: string;
  code: string | number;
}

