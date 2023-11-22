import useRename, { UseRename } from "./useRename.ts";
import { useRef, RefObject, MouseEvent } from "react";
import useSelection from "./useSelection.ts";
import { getExtension } from "../utils/stringUtil.ts";
import useItemContextMenu from "./useItemContextMenu.ts";

interface useFileParam {
    fileName: string;
    id: string;
}
interface UseFile extends UseRename {
    downloadFile: () => Promise<void>;
    file: RefObject<HTMLDivElement>;
    selectedItemAction: (action: "ADD" | "REMOVE") => void;
    displayContextMenu: (event: MouseEvent<HTMLElement>) => void;
    isSelected: () => boolean;
    currentItemName: string;
    extension: string;
    renameItem: () => void;
}

const useFile = ({ fileName, id }: useFileParam): UseFile => {
    const {
        currentItemName,
        isRenameActive,
        handleSubmit,
        getFieldProps,
        renameRef,
        renameItem,
    } = useRename({
        initialItemName: fileName,
        id: id,
    });
    const file = useRef<HTMLDivElement>(null);
    const { isSelected, selectedItemAction } = useSelection({
        type: "file",
        id,
        ref: file,
    });
    const extension = getExtension(currentItemName);
    const { displayContextMenu, downloadFile } = useItemContextMenu(
        id,
        currentItemName,
    );
    return {
        downloadFile,
        file,
        selectedItemAction,
        displayContextMenu,
        isSelected,
        isRenameActive,
        handleSubmit,
        getFieldProps,
        renameRef,
        currentItemName,
        extension,
        renameItem,
    };
};

export default useFile;
