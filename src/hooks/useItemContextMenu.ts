import { useContextMenu } from "react-contexify";
import { MouseEvent } from "react";
import axios from "axios";
import { Auth } from "../model.ts";
import { domain } from "../../server.ts";
import { structureSignal } from "../signals";
import { isError } from "../utils/errorUtils.ts";
import { showToast } from "../components/TinyToast/TinyToast.tsx";

const token = localStorage.getItem(Auth.TOKEN) as string;

const useItemContextMenu = (
  id: string,
  fileName: string = "",
  directoryName: string = "",
) => {
  const { show } = useContextMenu({
    id,
  });
  // delete Item
  const deleteItem = async (): Promise<void> => {
    try {
      // Call trash api
      const deleteItemURL = `${domain}/api/v1/tree/deleteDirectory/${
        id.split("dir-")[1]
      }`;
      const response = await axios.get(deleteItemURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // remove trashed directory from state
        if (id.startsWith("dir-")) {
          if (
            structureSignal.value !== null &&
            !isError(structureSignal.value)
          ) {
            // find the index of deleted directory in structureSignal
            const index = structureSignal.value.Directory.findIndex(
              (dir) => dir.id === Number(id.split("dir-")[1]),
            );
            // creating a clone of all directory and delete the targeted directory from the signal
            const allDirs = [...structureSignal.value.Directory];
            allDirs.splice(index, 1);
            // set the new directory list to structure signal
            structureSignal.value = {
              ...structureSignal.value,
              Directory: [...allDirs],
            };
            showToast(true, "Directory is deleted successfully");
          }
        }
        // remove trashed file from state
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Donwload file
  const downloadFile = async () => {
    showToast(true, "Downloading is started");
    window.location.href = "https://test.webgeniusbd.tech/directory.zip";
  };

  // Download Directory as Zip
  const downloadDirectory = async () => {
    showToast(true, "Downloading is started");
    window.location.href = "https://test.webgeniusbd.tech/directory.zip";
  };
  const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    show({
      event,
    });
  };
  const linkToBeCopied = location.href.endsWith("/")
    ? location.href +
      encodeURIComponent(id.startsWith("dir-") ? directoryName : fileName)
    : location.href +
      "/" +
      encodeURIComponent(id.startsWith("dir-") ? directoryName : fileName);
  const copyLink = async () => {
    await window.navigator.clipboard.writeText(linkToBeCopied);
    showToast(true, "Link is copied in your clipboard");
  };
  return {
    displayContextMenu,
    downloadFile,
    downloadDirectory,
    deleteItem,
    copyLink,
    linkToBeCopied,
  };
};

export default useItemContextMenu;
