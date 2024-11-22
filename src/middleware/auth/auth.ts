import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppError } from "../../utils/apperror";

const secretKey = process.env.DB_PRIVATE_KEY as string;

export const generateToken = (payload: object, expiresIn = "1h"): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["x-access-token"] as string | undefined;
  if (!token) {
    next(new AppError("Token não fornecido", 401));
    return;
  }
  try {
    const decoded = jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token inválido ou expirado" });
        return;
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return next(new AppError("Token inválido ou expirado", 403));
  }
}
