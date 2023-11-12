import {IUser} from "../context/UserContext/AuthContext.ts";

enum UserAction {
    set = "SET"
}
export interface IUserAction {
    type: string,
    payload: IUser
}
export const userReducer = (state:IUser, action:IUserAction) => {
    switch (action.type) {
        case UserAction.set:
            return {...action.payload}
        default:
            return state
    }
}