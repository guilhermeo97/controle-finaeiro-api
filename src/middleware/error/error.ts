import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/apperror";
import { ValidationError } from "class-validator";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    // Erros customizados
    res.status(err.statusCode).json({
      error: err.message,
    });
  } else if (Array.isArray(err) && err[0] instanceof ValidationError) {
    // Erros do class-validator
    const validationErrors = err.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));
    res.status(400).json({
      error: "Erro de validação",
      details: validationErrors,
    });
  } else {
    // Erros gerais
    console.error(err.stack);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
