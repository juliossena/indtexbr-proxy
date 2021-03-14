import { Request } from 'express';

export interface UserData {
    idTypeUser: number,
    idUser: number,
    email: string,
    name: string,
    expiresToken: number,
}

export interface RequestUserData extends Request {
    userData: UserData
}
