import { ConnectApiDelete, ConnectApiGet, ConnectApiPost, ConnectApiPUT } from '../utils/conectionAPI';
import * as urls from './urls';

export const login = async (body) => {
  const respostaServico = await ConnectApiPost(urls.URL_AUTH, body);
  return respostaServico.data.user;
};

export const getUserData = async (idUser: number) => {
  const url = urls.URL_USER_ID.replace('{idUser}', `${idUser}`);
  const respostaServico = await ConnectApiGet(url);
  return respostaServico.data;
};

export const viewAllUser = async () => {
  const respostaServico = await ConnectApiGet(urls.URL_USER);
  return respostaServico.data;
};

export const deleteUser = async (idUser: number) => {
  const url = urls.URL_USER_ID.replace('{idUser}', `${idUser}`);
  const respostaServico = await ConnectApiDelete(url);
  return respostaServico.data;
};

export const insertUser = async (body) => {
  const respostaServico = await ConnectApiPost(urls.URL_USER, body);
  return respostaServico.data;
};

export const editUser = async (idUser: number, body) => {
  const url = urls.URL_USER_ID.replace('{idUser}', `${idUser}`);
  const respostaServico = await ConnectApiPUT(url, body);
  return respostaServico.data;
};
