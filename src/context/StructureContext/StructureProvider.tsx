import {ReactNode, useReducer} from "react";
import {initialStructure, structureReducer} from "../../reducers/structureReducer.ts";
import {StructureContext} from "./StructureContext.ts";


interface StructureProviderProps {
    children: ReactNode
}

const StructureProvider = ({children}: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(structureReducer, initialStructure)

    return (<StructureContext.Provider value={{structures, dispatch}}>
        {children}
    </StructureContext.Provider>);
};

export default StructureProvider;