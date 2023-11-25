import { useContextMenu } from "react-contexify";
import { MouseEvent } from "react";
import axios from "axios";
import { Auth } from "../model.ts";
import useStructure from "./useStructure.ts";
import { StructureActionType } from "../constants/structure.ts";
import { domain } from "../../server.ts";

const token = localStorage.getItem(Auth.TOKEN) as string;

const useItemContextMenu = (
    id: string,
    fileName: string = "",
    directoryName: string = "",
) => {
    const { show } = useContextMenu({
        id,
    });
    const { dispatch } = useStructure();
    // Move to trash
    const moveToTrash = async (): Promise<void> => {
        try {
            // Call trash api
            const moveToTrashURL = `${domain}/api/v1/options/trash/${id}`;
            const response = await axios.get(moveToTrashURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // remove trashed directory from state
                dispatch({
                    type: StructureActionType.removeDirectories,
                    payload: { ids: [id] },
                });

                // remove trashed file from state
                dispatch({
                    type: StructureActionType.removeFiles,
                    payload: { ids: [id] },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Donwload file
    const downloadFile = async () => {
        const downloadURL = `${domain}/api/v1/download/file/` + id;
        const { data: blobData } = await axios.get(downloadURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
        });
        const file = URL.createObjectURL(new Blob([blobData]));
        const download = document.createElement("a");
        download.href = file;
        download.setAttribute("download", fileName);
        download.click();
        setTimeout(() => {
            download.remove();
        }, 2000);
    };

    // Download Directory as Zip
    const downloadDirectory = async () => {
        const directoryZipURL = `${domain}/api/v1/download/directory/${id}`;
        const { data: blobData } = await axios.get(directoryZipURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
        });
        const directory = URL.createObjectURL(new Blob([blobData]));
        const download = document.createElement("a");
        download.href = directory;
        download.setAttribute("download", directoryName + ".zip");
        download.click();
        setTimeout(() => {
            download.remove();
        }, 2000);
    };
    const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
        show({
            event,
        });
    };
    return { displayContextMenu, downloadFile, downloadDirectory, moveToTrash };
};

export default useItemContextMenu;
