import { Request, Response } from 'express';

import logger from '../utils/log';
import { internalError } from '../utils/response';
import * as userServices from '../services/userServices';

// POST
// service to insert user admin company
export const insertUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userServices.insertUser(req.body);

    return res.status(201).send(user);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    return internalError(res);
  }
};

// GET
// service to view all users company
export const viewAllUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userServices.viewAllUser();
    return res.json(users);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};

// GET
// service to view user id
export const viewUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.params;
    const user = await userServices.getUserData(parseInt(idUser));

    return res.json(user);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    return internalError(res);
  }
};

// DELETE
// service to delete user id
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.params;
    await userServices.deleteUser(parseInt(idUser));

    return res.status(204).send();
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};

// PUT
// service to edit user
export const editUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idUser } = req.params;
    const user = await userServices.editUser(parseInt(idUser), req.body);
    return res.json(user);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};
