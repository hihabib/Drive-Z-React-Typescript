import {IUser} from "../@types/authContext";
import {IUserAction} from "../@types/reducer";
import {UserAction} from "../constants/user.ts";


export const userReducer = (state:IUser, action:IUserAction) => {
    switch (action.type) {
        case UserAction.set:
            return {...action.payload}
        default:
            return state
    }
}