import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UserData } from './../models/request';
import { RequestUserData } from '../models/request';
import logger from '../utils/log';
import { configAuth } from '../config/auth';
import { unauthorized, internalError } from '../utils/response';
import { typeUser } from '../enums/typeUser';

export const authMiddleware = async (req: RequestUserData, res: Response, next: NextFunction, isRefreshToken: boolean = false) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return unauthorized(res);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = <UserData>verify(token, configAuth.jwt.secret);

      if (!isRefreshToken) {
        if (new Date().getTime() > decodedToken.expiresToken) {
          return unauthorized(res, 'Token expirado.');
        }
      }
      req.userData = {
        idTypeUser: decodedToken.idTypeUser,
        idUser: decodedToken.idUser,
        email: decodedToken.email,
        name: decodedToken.name,
        expiresToken: decodedToken.expiresToken,
      };

      next();
    } catch (error) {
      return unauthorized(res);
    }
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

export const authMiddlewareRefreshToken = async (req: RequestUserData, res: Response, next: NextFunction, isRefreshToken: boolean = false) => {
  return authMiddleware(req, res, next, true);
};

export const isAdmin = async (req: RequestUserData, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { idTypeUser } = req.userData;

    if (idTypeUser !== typeUser.ADMIN) {
      return unauthorized(res);
    }
    next();
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};
