import {ReactNode, useReducer} from "react";
import {initialStructure, structureReducer} from "../../reducers/structureReducer.ts";
import {StructureContext} from "./StructureContext.ts";
import {StructureActionType} from "../../constants/structure.ts";


interface StructureProviderProps {
    children: ReactNode
}

const StructureProvider = ({children}: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(structureReducer, initialStructure)
    const {selectedIds} = structures;


    const isSelected = (id: string): boolean => {
        return Boolean(selectedIds.ids[id]);
    }

    const toggleSelectedItem = (id: string): void => {
        dispatch({type: StructureActionType.setSelectionId, payload: {ids: {[id]: !selectedIds.ids[id]}}})
    }

    return (<StructureContext.Provider value={{toggleSelectedItem, isSelected, structures, dispatch}}>
        {children}
    </StructureContext.Provider>);
};

export default StructureProvider;