export default class AppError extends Error {
  public statusCode: number;
  private errorType: string;
  public errors: string[];

  constructor(message: string | string[], statusCode = 400) {
    super();

    this.errorType = 'AppError';

    if (Array.isArray(message)) this.errors = message;
    else this.message = message;

    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  getType() {
    return this.errorType;
  }
}
