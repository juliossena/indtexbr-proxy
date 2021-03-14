import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { RequestUserData } from '../models/request';
import { configAuth } from '../config/auth';
import logger from '../utils/log';
import { notFound, internalError, unauthorized } from '../utils/response';
import { User } from '../models/user';
import * as userServices from '../services/userServices';

const generateToken = (user: User) => {
  const token = sign({
    idTypeUser: user.idTypeUser,
    idUser: user.idUser,
    email: user.email,
    name: user.name,
    expiresToken: new Date().getTime() + parseInt(configAuth.jwt.expiresIn),
  }, configAuth.jwt.secret, {
    subject: String(user.idUser),
    expiresIn: configAuth.jwt.refreshExpiresIn,
  });
  return token;
};

// POST
// service to Auth
export const auth = async (req: RequestUserData, res: Response): Promise<Response> => {
  try {
    const user = await userServices.login(req.body);
    const token = generateToken(user);

    return res.json({ user: user, token });
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};

// GET
// service to refresh token
export const refreshToken = async (req: RequestUserData, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.userData;

    const user = await userServices.getUserData(idUser);

    if (!user) {
      return notFound(res);
    }

    if (user.block || (user.company && user.company.block)) {
      return unauthorized(res);
    }

    const token = generateToken(user);

    res.json({ user, token });
    if (user.firstAccess) {
      user.update({
        ...user,
        firstAccess: false,
      });
    }
  } catch (e) {
    logger.error(e);
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    internalError(res);
  }
};

// GET
// service to getUserData
export const getUserData = async (req: RequestUserData, res: Response): Promise<Response> => {
  try {
    const {
      idUser,
    } = req.userData;
    const user = await userServices.getUserData(idUser);

    if (!user) {
      return notFound(res);
    }
    const token = generateToken(user);

    return res.json({ user, token });
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};
