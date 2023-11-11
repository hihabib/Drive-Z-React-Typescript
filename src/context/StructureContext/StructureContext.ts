import {IStructureState, StructureAction} from "../../reducers/structureReducer.ts";
import {createContext, Dispatch} from "react";

interface IStructureContext {
    structures: IStructureState;
    dispatch: Dispatch<StructureAction>;
}
export const StructureContext = createContext({} as IStructureContext)
