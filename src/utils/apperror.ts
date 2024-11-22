export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Define o prototype explicitamente para garantir o correto funcionamento de instanceof
    Object.setPrototypeOf(this, new.target.prototype);

    // Garante que o stack trace mostre a origem correta do erro
    Error.captureStackTrace(this, this.constructor);
  }
}
