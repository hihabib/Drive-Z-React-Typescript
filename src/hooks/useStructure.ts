import {useParams} from "react-router-dom";
import {Auth} from "../model.ts";
import {useEffect, useState} from "react";
import {isEmptyObj} from "../utils/objectUtil.ts";
import useStructureContext from "./useStructureContext.ts";
import axios, {AxiosResponse, isAxiosError} from "axios";
import {FilesAndFolder} from "../@types/api";
import {StructureActionType} from "../constants/structure.ts";

const useStructure = () => {
    const path = useParams();
    const token = localStorage.getItem(Auth.TOKEN) as string;
    const [isEmpty, setIsEmpty] = useState({files: false, folders: false});
    const [isDirNotFound, setIsDirNotFound] = useState(false)
    const {structures: {folders, files}, dispatch} = useStructureContext();
    useEffect(() => {
        let nestedPath = "";
        if (!isEmptyObj(path)) {
            nestedPath = path['*'] as string;
        }
        (async () => {
            try {
                const folderRequest: AxiosResponse<FilesAndFolder[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-folders/${nestedPath}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {data: folders} = folderRequest;


                if (0 === folders.length) {
                    setIsEmpty(currNotFoundState => {
                        return {
                            ...currNotFoundState, folders: true
                        }
                    })
                }

                dispatch({type: StructureActionType.setFolders, payload: folders})
            } catch (error) {
                if (isAxiosError(error) && error?.response?.status) {
                    setIsDirNotFound(true)
                }
            }

            try {
                const fileRequest: AxiosResponse<FilesAndFolder[]> = await axios.get(`http://localhost:8080/api/v1/structures/get-files/${nestedPath}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const {data: files} = fileRequest;
                if (0 === files.length) {
                    setIsEmpty(currNotFoundState => {
                        return {
                            ...currNotFoundState, files: true
                        }
                    })
                }
                dispatch({type: StructureActionType.setFiles, payload: files})
            } catch (error) {
                console.log(error)
            }
        })()
    }, [dispatch, token, path]);

    return {isEmpty, files, folders, isDirNotFound}
}
export default useStructure