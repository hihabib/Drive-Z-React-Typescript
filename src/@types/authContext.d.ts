import React from "react";

export interface IUser {
    username: string
    fullName?: string
    email?: string
}
export interface IAuthContext {
    user: IUser
    dispatch: React.Dispatch<IUserAction>
}