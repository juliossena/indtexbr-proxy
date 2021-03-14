import { Request, Response } from 'express';

import logger from '../utils/log';
import { notFound, internalError } from '../utils/response';
import Product from '../models/product';

// POST
// service to insert product
export const insertProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      amount,
    } = req.body;

    const product = await Product.create({
      name,
      amount,
    });

    return res.status(201).send(product);
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

// GET
// service to view all users company
export const viewAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await Product.findAll();
    return res.json(result);
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};

// GET
// service to view product id
export const viewProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idProduct } = req.params;
    const result = await Product.findOne({
      where: {
        idProduct,
      },
    });
    if (result) {
      return res.json(result);
    }
    return notFound(res);
  } catch (e) {
    logger.error(e);
    return internalError(res);
  }
};

// DELETE
// service to delete product id
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idProduct } = req.params;
    const result = await Product.findOne({
      where: {
        idProduct,
      },
    });

    if (!result) {
      return notFound(res);
    }

    await result.destroy();

    return res.status(204).send();
  } catch (e) {
    logger.error(e);
    internalError(res);
  }
};

// PUT
// service to edit product
export const editProduct = async (req: Request, res: Response): Promise<Response> => {
  const { idProduct } = req.params;
  const product = await Product.findOne({
    where: { idProduct },
  });
  const {
    name,
    amount,
  } = req.body;

  await product.update({
    ...product,
    name,
    amount,
  });
  return res.json(product);
};
