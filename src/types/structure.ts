import {TError} from "./error.ts";
import {TUser} from "./user.ts";

export type TDirectory = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    userId: number,
    parentDirId: number | null
}
export type TFile = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    userId: number,
    directoryId: number
}

export type TStructure = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    User: TUser,
    ParentDir: TDirectory | null,
    Directory: TDirectory[],
    File: TFile[]
} | TError

