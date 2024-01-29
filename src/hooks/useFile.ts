import useRename, { UseRename } from "./useRename.ts";
import { MouseEvent, RefObject, useRef } from "react";
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
  deleteItem: () => Promise<void>;
}

const useFile = ({ fileName, id }: useFileParam): UseFile => {
  // File rename functionality
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

  // File selection
  const file = useRef<HTMLDivElement>(null);
  const { isSelected, selectedItemAction } = useSelection({
    type: "file",
    id,
    ref: file,
  });

  // Get file extension as separate string
  const extension = getExtension(currentItemName);

  // File Context menu
  const { displayContextMenu, downloadFile, deleteItem } = useItemContextMenu(
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
    deleteItem,
  };
};

export default useFile;
