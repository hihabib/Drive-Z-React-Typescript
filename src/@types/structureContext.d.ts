import {IStructureState, StructureAction} from "./reducer";
import {Dispatch} from "react";


export interface IStructureContext extends IStructureState{
    dispatch: Dispatch<StructureAction>;
    isSelected: (id: string) => boolean,
    toggleSelectedItem: (id: string) => void
}
