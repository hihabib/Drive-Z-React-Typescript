import {ReactNode, useReducer} from "react";
import {IStructureState, structureReducer} from "../../reducers/structureReducer.ts";
import {StructureContext} from "./StructureContext.ts";


interface StructureProviderProps {
    children: ReactNode
}

const StructureProvider = ({children}: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(structureReducer,
        {
            folders: []
        } as IStructureState)

    return (<StructureContext.Provider value={{structures, dispatch}}>
        {children}
    </StructureContext.Provider>);
};

export default StructureProvider;