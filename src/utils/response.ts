import { Response } from 'express';

export const unauthorized = (res: Response, message?: string) => {
  return res.status(401).send({ message: message || 'Sem permissão.' });
};

export const notFound = (res: Response) => {
  return res.status(404).send({ message: 'Não encontrado' });
};

export const customError = (res: Response, message: string) => {
  return res.status(400).send({ message });
};

export const internalError = (res: Response) => {
  return res.status(500).send({ message: 'Erro interno no servidor!' });
};
