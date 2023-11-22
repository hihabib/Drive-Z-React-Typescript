import { useContextMenu } from "react-contexify";
import { MouseEvent } from "react";
import axios from "axios";
import { Auth } from "../model.ts";
import { useLocation } from "react-router-dom";
const token = localStorage.getItem(Auth.TOKEN) as string;

const useItemContextMenu = (
    id: string,
    fileName: string = "",
    directoryName: string = "",
) => {
    const location = useLocation();
    const { show } = useContextMenu({
        id,
    });
    const downloadFile = async () => {
        const downloadURL = "http://localhost:8080/api/v1/download/file/" + id;
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

    const downloadDirectory = async () => {
        const directoryZipURL = `http://localhost:8080/api/v1/download/directory/${id}`;
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
    return { displayContextMenu, downloadFile, downloadDirectory };
};

export default useItemContextMenu;
