import {useContextMenu} from "react-contexify";
import {MouseEvent} from "react";
import axios from "axios";
import {Auth} from "../model.ts";
import {useLocation} from "react-router-dom";
const token = localStorage.getItem(Auth.TOKEN) as string;


const useDriveContextMenu = (id: string, fileName:string) => {
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
        download.click()
    }
    const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
        show({
            event
        })
    }
   return {displayContextMenu, downloadFile}
};

export default useDriveContextMenu;