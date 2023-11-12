import React, {createContext} from "react";
import {IUserAction} from "../../reducers/userReducer.ts";

export interface IUser {
    username: string
    fullName?: string
    email?: string
}

interface IAuthContext {
    user: IUser
    dispatch: React.Dispatch<IUserAction>
}
export const AuthContext = createContext({} as IAuthContext)