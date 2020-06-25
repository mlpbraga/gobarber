import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

const { jwt } = authConfig;

interface TokenPayload {
  iat: string; // Header
  exp: string; // ExpiresIn
  sub: string; // Subject
}

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('JWT token is missing.', 401);

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, jwt.secret);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token.', 401);
  }
};

export default ensureAuthenticated;
