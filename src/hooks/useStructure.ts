import {useParams} from "react-router-dom";
import {Auth} from "../model.ts";
import {useEffect, useState} from "react";
import {isEmptyObj} from "../utils/objectUtil.ts";
import useStructureContext from "./useStructureContext.ts";
import axios, {AxiosResponse, isAxiosError} from "axios";
import {StructureItems} from "../@types/api";
import {StructureActionType} from "../constants/structure.ts";
import {SelectedIds} from "../@types/reducer";

const useStructure = () => {
    const {structures: {folders, files, isEmpty},isSelected,  toggleSelectedItem, dispatch} = useStructureContext();

    const path = useParams();
    const token = localStorage.getItem(Auth.TOKEN) as string;




    const [isDirNotFound, setIsDirNotFound] = useState(false)

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
                    setIsDirNotFound(true)
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
    }, [dispatch, token, path]);
    console.log(isEmpty)

    return {isEmpty, files, folders, isDirNotFound, toggleSelectedItem, isSelected}
}
export default useStructure