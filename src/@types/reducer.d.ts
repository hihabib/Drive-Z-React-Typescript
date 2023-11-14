import {IUser} from "../context/UserContext/AuthContext.ts";
import {StructureItems} from "./api";
import {StructureActionType} from "../constants/structure.ts";

export interface SelectedIds {
    [id:string] : boolean | undefined
}
export interface IStructureState {
    folders: StructureItems[],
    files: StructureItems[],
    selectedIds: {
        ids: SelectedIds
    },
    isEmpty: {files: boolean, folders: boolean},
    isDirNotFound: boolean
}
export type IEmptyItemsStatus = {
    files: boolean
} | {
    folders: boolean
}

export interface isDirNotFound {
    isDirNotFound: boolean
}
export interface StructureAction {
    type: StructureActionType,
    payload: StructureItems[] | {ids: SelectedIds} | IEmptyItemsStatus | isDirNotFound
}

export interface IUserAction {
    type: string,
    payload: IUser
}
