import { MouseEvent, RefObject, useRef } from "react";
import useItemContextMenu from "./useItemContextMenu.ts";
import useSelection from "./useSelection.ts";
import { useNavigate } from "react-router-dom";

import useRename, { UseRename } from "./useRename.ts";
interface UseDirectoryParam {
    initialDirName: string;
    id: string;
}

interface UseDirectory extends UseRename {
    directory: RefObject<HTMLDivElement>;
    isSelected: () => boolean;
    selectedItemAction: (action: "ADD" | "REMOVE") => void;
    openDirectory: () => void;
    displayContextMenu: (event: MouseEvent<HTMLElement>) => void;
    downloadDirectory: () => Promise<void>;
    moveToTrash: () => Promise<void>;
}

const useDirectory = ({
    initialDirName,
    id,
}: UseDirectoryParam): UseDirectory => {
    const {
        currentItemName,
        isRenameActive,
        handleSubmit,
        getFieldProps,
        renameRef,
        renameItem,
    } = useRename({
        initialItemName: initialDirName,
        id: id,
    });

    const { displayContextMenu, downloadDirectory, moveToTrash } =
        useItemContextMenu(id, "", currentItemName);
    const directory = useRef<HTMLDivElement>(null);

    const { isSelected, selectedItemAction } = useSelection({
        type: "directory",
        ref: directory,
        id,
    });

    const navigate = useNavigate();
    const openDirectory = () => {
        navigate(currentItemName, { relative: "path" });
    };

    return {
        directory,
        isSelected,
        selectedItemAction,
        openDirectory,
        displayContextMenu,
        downloadDirectory,
        currentItemName,
        isRenameActive,
        handleSubmit,
        getFieldProps,
        renameRef,
        renameItem,
        moveToTrash,
    };
};
export default useDirectory;
