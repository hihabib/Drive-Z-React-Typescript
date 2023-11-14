import {IUser} from "../context/UserContext/AuthContext.ts";
import {StructureItems} from "./api";
import {StructureActionType} from "../constants/structure.ts";


export interface IStructureState {
    directories: StructureItems[],
    files: StructureItems[],
    isEmpty: {files: boolean, directories: boolean},
    isDirNotFound: boolean
}
export type IEmptyItemsStatus = {
    files: boolean
} | {
    directories: boolean
}

export interface isDirNotFound {
    isDirNotFound: boolean
}
export interface StructureAction {
    type: StructureActionType,
    payload: StructureItems[] | IEmptyItemsStatus | isDirNotFound
}

export interface IUserAction {
    type: string,
    payload: IUser
}
