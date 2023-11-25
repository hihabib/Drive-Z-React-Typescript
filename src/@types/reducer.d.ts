import { IUser } from "../context/UserContext/AuthContext.ts";
import { StructureDirectory, StructureFile } from "./api";
import { StructureActionType } from "../constants/structure.ts";

export interface CurrentDirectoryId {
    currentDirectoryId: string;
}
export interface IStructureState extends CurrentDirectoryId {
    directories: StructureDirectory[];
    files: StructureFile[];
    isEmpty: { files: boolean; directories: boolean };
    isDirNotFound: boolean;
}
export type IEmptyItemsStatus =
    | {
          files: boolean;
      }
    | {
          directories: boolean;
      };

export interface IsDirNotFound {
    isDirNotFound: boolean;
}
export interface ItemIdList {
    ids: string[];
}
export interface StructureAction {
    type: StructureActionType;
    payload:
        | StructureDirectory[]
        | StructureFile[]
        | IEmptyItemsStatus
        | IsDirNotFound
        | CurrentDirectoryId
        | ItemIdList;
}

export interface IUserAction {
    type: string;
    payload: IUser;
}
