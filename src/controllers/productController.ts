import { Request, Response } from 'express';

import logger from '../utils/log';
import { internalError } from '../utils/response';
import * as productServices from '../services/productServices';

// POST
// service to insert product
export const insertProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = await productServices.insertProduct(req.body);

    return res.status(201).send(product);
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
export const viewAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await productServices.viewAllProducts();
    return res.json(result);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};

// GET
// service to view product id
export const viewProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idProduct } = req.params;
    const result = await productServices.viewProduct(parseInt(idProduct));
    return res.json(result);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    return internalError(res);
  }
};

// DELETE
// service to delete product id
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idProduct } = req.params;
    await productServices.deleteProduct(parseInt(idProduct));

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
// service to edit product
export const editProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idProduct } = req.params;
    const product = await productServices.editProduct(parseInt(idProduct), req.body);
    return res.json(product);
  } catch (e) {
    if (e.response && e.response.status && e.response.data) {
      return res.status(e.response.status).send({ message: e.response.data.message });
    }
    logger.error(e);
    internalError(res);
  }
};
