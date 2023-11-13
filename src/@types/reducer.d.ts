import {IUser} from "../context/UserContext/AuthContext.ts";
import {StructureItems} from "./api";


export interface IStructureState {
    folders: StructureItems[],
    files: StructureItems[]
}

export interface StructureAction {
    type: StructureActionType,
    payload: string | StructureItems[] | ({ type: string[], values: string[] })[]
}

export interface IUserAction {
    type: string,
    payload: IUser
}
