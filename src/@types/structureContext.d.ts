import {IStructureState, StructureAction} from "./reducer";
import {Dispatch} from "react";

export interface IStructureContext {
    structures: IStructureState;
    dispatch: Dispatch<StructureAction>;
}