import { ConnectApiDelete, ConnectApiGet, ConnectApiPost, ConnectApiPUT } from '../utils/conectionAPI';
import * as urls from './urls';

export const viewAllProducts = async () => {
  const respostaServico = await ConnectApiGet(urls.URL_PRODUCT);
  return respostaServico.data;
};

export const insertProduct = async (body) => {
  const respostaServico = await ConnectApiPost(urls.URL_PRODUCT, body);
  return respostaServico.data;
};

export const deleteProduct = async (idProduct: number) => {
  const url = urls.URL_PRODUCT_ID.replace('{idProduct}', `${idProduct}`);
  const respostaServico = await ConnectApiDelete(url);
  return respostaServico.data;
};

export const viewProduct = async (idProduct: number) => {
  const url = urls.URL_PRODUCT_ID.replace('{idProduct}', `${idProduct}`);
  const respostaServico = await ConnectApiGet(url);
  return respostaServico.data;
};

export const editProduct = async (idProduct:number, body) => {
  const url = urls.URL_PRODUCT_ID.replace('{idProduct}', `${idProduct}`);
  const respostaServico = await ConnectApiPUT(url, body);
  return respostaServico.data;
};
