import { IUser } from "../context/UserContext/AuthContext.ts";
import { StructureDirectory, StructureFile, StructureItems } from "./api";
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

export interface isDirNotFound {
    isDirNotFound: boolean;
}
export interface StructureAction {
    type: StructureActionType;
    payload:
        | StructureItems[]
        | IEmptyItemsStatus
        | isDirNotFound
        | CurrentDirectoryId;
}

export interface IUserAction {
    type: string;
    payload: IUser;
}
