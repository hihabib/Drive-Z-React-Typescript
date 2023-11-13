import {IUser} from "../context/UserContext/AuthContext.ts";
import {FilesAndFolder} from "./api";


export interface IStructureState {
    folders: FilesAndFolder[],
    files: FilesAndFolder[]
}

export interface StructureAction {
    type: StructureActionType,
    payload: string | FilesAndFolder[] | ({ type: string[], values: string[] })[]
}

export interface IUserAction {
    type: string,
    payload: IUser
}
