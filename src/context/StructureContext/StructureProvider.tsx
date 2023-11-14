import {ReactNode, useCallback, useEffect, useMemo, useReducer} from "react";
import {initialStructure, structureReducer} from "../../reducers/structureReducer.ts";
import {StructureContext} from "./StructureContext.ts";
import {StructureActionType} from "../../constants/structure.ts";
import {Auth} from "../../model.ts";
import axios, {AxiosResponse, isAxiosError} from "axios";
import {StructureItems} from "../../@types/api";
import {useLocation, useParams} from "react-router-dom";


interface StructureProviderProps {
    children: ReactNode,
}

const token = localStorage.getItem(Auth.TOKEN) as string;


const StructureProvider = ({children}: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(structureReducer, initialStructure)

    const path = useLocation().pathname;

    useEffect(() => {

        (async () => {
            try {
                const directoryRequest: AxiosResponse<StructureItems[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-directories/${path}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {data: directories} = directoryRequest;


                if (0 === directories.length) {
                    dispatch({type: StructureActionType.setDirectoryEmptyStatus, payload: {directories: true}})
                } else {
                    dispatch({type: StructureActionType.setDirectoryEmptyStatus, payload: {directories: false}})
                }

                dispatch({type: StructureActionType.setDirectories, payload: directories})
            } catch (error) {
                if (isAxiosError(error) && error?.response?.status) {
                    dispatch({type: StructureActionType.dirNotFound, payload: {isDirNotFound: true}})
                }
            }

            try {
                const fileRequest: AxiosResponse<StructureItems[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-files/${path}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const {data: files} = fileRequest;
                if (0 === files.length) {
                    dispatch({type: StructureActionType.setFileEmptyStatus, payload: {files: true}})
                } else {
                    dispatch({type: StructureActionType.setFileEmptyStatus, payload: {files: false}})
                }

                dispatch({type: StructureActionType.setFiles, payload: files})
            } catch (error) {
                console.log(error)
            }
        })()
    }, [path]);

    return (<StructureContext.Provider value={{dispatch, ...structures}}>
        {children}
    </StructureContext.Provider>);
};

export default StructureProvider;