require('dotenv/config');

export const URL_AUTH = `${process.env.SERVER_USER}/auth`;

export const URL_USER = `${process.env.SERVER_USER}/user`;
export const URL_USER_ID = `${process.env.SERVER_USER}/user/{idUser}`;

export const URL_PRODUCT = `${process.env.SERVER_PRODUCT}/product`;
export const URL_PRODUCT_ID = `${process.env.SERVER_PRODUCT}/product/{idProduct}`;
