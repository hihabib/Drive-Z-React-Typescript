import {useContextMenu} from "react-contexify";
import {MouseEvent} from "react";
import axios from "axios";
import {Auth} from "../model.ts";
import {useLocation} from "react-router-dom";
const token = localStorage.getItem(Auth.TOKEN) as string;


const useDriveContextMenu = (id: string, fileName:string = "", folderName:string ="") => {
    const location = useLocation();
    const {show} = useContextMenu({
        id
    })
    const downloadFile = async () => {
        const downloadURL = "http://localhost:8080/api/v1/download/file" + location.pathname + "/" + fileName;
        const {data: blobData} = await axios.get(downloadURL, {
            headers: {
                Authorization: `Bearer ${token}`
            }, responseType: "blob"
        })
        const file = URL.createObjectURL(new Blob([blobData]))
        const download = document.createElement('a');
        download.href = file;
        download.setAttribute('download', fileName);
        download.click();
        setTimeout(() => {
            download.remove();
        }, 2000);
    }

    const downloadFolder = async () => {
        const folderZipURL = `http://localhost:8080/api/v1/download/folder${location.pathname}/${folderName}`;
        const {data: blobData} = await axios.get(folderZipURL, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
        });
        const folder = URL.createObjectURL(new Blob([blobData]));
        const download = document.createElement('a');
        download.href = folder;
        download.setAttribute('download', folderName + '.zip');
        download.click();
        setTimeout(() => {
            download.remove();
        }, 2000);
    }
    const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
        show({
            event
        })
    }
   return {displayContextMenu, downloadFile, downloadFolder}
};

export default useDriveContextMenu;