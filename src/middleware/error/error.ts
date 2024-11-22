import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/apperror";

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
  } else {
    // Erros gerais
    console.error(err.stack);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
