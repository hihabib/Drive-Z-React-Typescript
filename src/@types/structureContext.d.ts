import {IStructureState, StructureAction} from "./reducer";
import {Dispatch} from "react";


export interface IStructureContext extends IStructureState{
    dispatch: Dispatch<StructureAction>;
}
