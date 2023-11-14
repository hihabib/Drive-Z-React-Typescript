import {ReactNode, useEffect, useReducer} from "react";
import {initialStructure, structureReducer} from "../../reducers/structureReducer.ts";
import {StructureContext} from "./StructureContext.ts";
import {StructureActionType} from "../../constants/structure.ts";
import {useParams} from "react-router-dom";
import {Auth} from "../../model.ts";
import {isEmptyObj} from "../../utils/objectUtil.ts";
import axios, {AxiosResponse, isAxiosError} from "axios";
import {StructureItems} from "../../@types/api";
import {SelectedIds} from "../../@types/reducer";


interface StructureProviderProps {
    children: ReactNode
}
const token = localStorage.getItem(Auth.TOKEN) as string;


const StructureProvider = ({children}: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(structureReducer, initialStructure)
    const {selectedIds} = structures;


    const isSelected = (id: string): boolean => {
        return Boolean(selectedIds.ids[id]);
    }

    const toggleSelectedItem = (id: string): void => {
        dispatch({type: StructureActionType.setSelectionId, payload: {ids: {[id]: !selectedIds.ids[id]}}})
    }

    let {"*" : path} = useParams();
    path = path ?? "";

    useEffect(() => {
        let nestedPath = "";
        if (!isEmptyObj(path)) {
            nestedPath = path['*'] as string;
        }
        (async () => {
            try {
                const folderRequest: AxiosResponse<StructureItems[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-folders/${nestedPath}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {data: folders} = folderRequest;


                if (0 === folders.length) {
                    dispatch({type: StructureActionType.setFolderEmptyStatus, payload: {folders: true}})
                } else {
                    dispatch({type: StructureActionType.setFolderEmptyStatus, payload: {folders: false}})
                }
                const unSelectedFolderInitialData = folders.reduce((curr, next) => {
                    curr[next.id] = false;
                    return curr;
                }, {} as SelectedIds)

                dispatch({type: StructureActionType.setSelectionId, payload: {ids: unSelectedFolderInitialData}})
                dispatch({type: StructureActionType.setFolders, payload: folders})
            } catch (error) {
                if (isAxiosError(error) && error?.response?.status) {
                    dispatch({type: StructureActionType.dirNotFound, payload: {isDirNotFound: true}})
                }
            }

            try {
                const fileRequest: AxiosResponse<StructureItems[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-files/${nestedPath}`, {
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

                const unSelectedFolderInitialData = files.reduce((curr, next) => {
                    curr[next.id] = false;
                    return curr;
                }, {} as SelectedIds)

                dispatch({type: StructureActionType.setSelectionId, payload: {ids: unSelectedFolderInitialData}})
                dispatch({type: StructureActionType.setFiles, payload: files})
            } catch (error) {
                console.log(error)
            }
        })()
    }, [path]);

    return (<StructureContext.Provider value={{toggleSelectedItem, isSelected, dispatch, ...structures}}>
        {children}
    </StructureContext.Provider>);
};

export default StructureProvider;