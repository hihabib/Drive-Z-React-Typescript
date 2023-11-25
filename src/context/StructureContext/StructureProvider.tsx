import { ReactNode, useEffect, useReducer } from "react";
import {
    initialStructure,
    structureReducer,
} from "../../reducers/structureReducer.ts";
import { StructureContext } from "./StructureContext.ts";
import { StructureActionType } from "../../constants/structure.ts";
import { Auth } from "../../model.ts";
import axios, { AxiosResponse } from "axios";
import { StructureDirectory, StructureFile } from "../../@types/api";
import { useLocation } from "react-router-dom";
import { domain } from "../../../server.ts";

interface StructureProviderProps {
    children: ReactNode;
}

const token = localStorage.getItem(Auth.TOKEN) as string;

const StructureProvider = ({ children }: StructureProviderProps) => {
    const [structures, dispatch] = useReducer(
        structureReducer,
        initialStructure,
    );

    const path = useLocation().pathname;

    useEffect(() => {
        (async () => {
            try {
                // Fetch directories
                const directoryResponse: AxiosResponse<StructureDirectory[]> =
                    await axios.get(
                        `${domain}/api/v1/structures/get-directories${path}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                const { data: directories } = directoryResponse;

                if (0 === directories.length) {
                    dispatch({
                        type: StructureActionType.setDirectoryEmptyStatus,
                        payload: { directories: true },
                    });
                } else {
                    dispatch({
                        type: StructureActionType.setDirectoryEmptyStatus,
                        payload: { directories: false },
                    });
                }

                dispatch({
                    type: StructureActionType.setDirectories,
                    payload: directories,
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error?.response?.status === 404) {
                        dispatch({
                            type: StructureActionType.dirNotFound,
                            payload: { isDirNotFound: true },
                        });
                    }
                }
            }
            try {
                // Fetch Files
                const fileRequest: AxiosResponse<StructureFile[]> =
                    await axios.get(
                        `${domain}/api/v1/structures/get-files${path}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                const { data: files } = fileRequest;
                if (0 === files.length) {
                    dispatch({
                        type: StructureActionType.setFileEmptyStatus,
                        payload: { files: true },
                    });
                } else {
                    dispatch({
                        type: StructureActionType.setFileEmptyStatus,
                        payload: { files: false },
                    });
                }

                dispatch({
                    type: StructureActionType.setFiles,
                    payload: files,
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [path]);

    return (
        <StructureContext.Provider value={{ dispatch, ...structures }}>
            {children}
        </StructureContext.Provider>
    );
};

export default StructureProvider;
