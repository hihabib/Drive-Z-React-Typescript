import {MouseEvent, RefObject, useRef} from "react";
import useItemContextMenu from "./useItemContextMenu.ts";
import useSelection from "./useSelection.ts";
import {useNavigate} from "react-router-dom";

import useRename, {UseRename} from "./useRename.ts";


interface useDirectoryParam {
    initialDirName: string,
    id: string
}

interface useDirectory extends UseRename {
    directory: RefObject<HTMLDivElement>
    isSelected: () => boolean,
    selectedItemAction: (action: ("ADD" | "REMOVE")) => void,
    openDirectory: () => void,
    displayContextMenu: (event: MouseEvent<HTMLElement>) => void,
    downloadFolder: () => Promise<void>
}

const useDirector = ({initialDirName, id}: useDirectoryParam): useDirectory => {

    const {
        currentItemName, isRenameActive, handleSubmit, getFieldProps, renameRef, renameItem
    } = useRename({
        initialItemName: initialDirName, id: id
    })


    const {displayContextMenu, downloadFolder} = useItemContextMenu(id, '', currentItemName);
    const directory = useRef<HTMLDivElement>(null);
    const {isSelected, selectedItemAction} = useSelection({
        type: 'directory', ref: directory, id,
    });


    const navigate = useNavigate();
    const openDirectory = () => {
        navigate(currentItemName, {relative: "path"});
    }


    return {
        directory, isSelected, selectedItemAction, openDirectory, displayContextMenu, downloadFolder, currentItemName, isRenameActive, handleSubmit, getFieldProps, renameRef, renameItem
    }
}
export default useDirector;