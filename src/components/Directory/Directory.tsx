import { BiDotsVerticalRounded, BiSolidFolder } from "react-icons/bi";
import classes from "./Directory.module.css";
import "react-contexify/dist/ReactContexify.css";
import ItemContextMenu from "../ItemContextMenu/ItemContextMenu.tsx";
import ToolTipItemName from "../ToolTipItemName/ToolTipItemName.tsx";
import useDirectory from "../../hooks/useDriectory.ts";

interface DirectoryProps {
  id: string;
  dirName: string;
}

const Directory = ({ id, dirName }: DirectoryProps) => {
  const {
    directory,
    isSelected,
    selectedItemAction,
    openDirectory,
    displayContextMenu,
    isRenameActive,
    handleSubmit,
    getFieldProps,
    renameRef,
    downloadDirectory,
    currentItemName: currentDirName,
    renameItem: renameDirectory,
    deleteItem,
    copyLink,
    linkToBeCopied,
  } = useDirectory({
    id,
    initialDirName: dirName,
  });

  return (
    <>
      <ToolTipItemName id={`tooltip-${id}`} directoryName={currentDirName}>
        <div
          ref={directory}
          onClick={() => selectedItemAction("ADD")}
          onDoubleClick={openDirectory}
          onContextMenu={displayContextMenu}
          className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${
            classes.directory
          } ${isSelected() ? classes.selected : ""}`}
        >
          <div
            className={`d-inline-flex gap-3 rounded-4 align-items-center ${classes.directoryNameWithIcon}`}
          >
            <div className={`d-flex align-items-center`}>
              <BiSolidFolder />
            </div>
            {isRenameActive ? (
              <>
                <form
                  className={`${classes.directoryName}`}
                  onSubmit={handleSubmit}
                >
                  <input
                    onDoubleClick={(e) => e.stopPropagation()}
                    {...getFieldProps(id)}
                    name={id}
                    ref={renameRef}
                    style={{ maxWidth: "100%" }}
                    id={id}
                    type={"text"}
                  ></input>
                </form>
              </>
            ) : (
              <>
                <div className={`${classes.directoryName}`}>
                  {currentDirName}
                </div>
              </>
            )}
          </div>
          <div
            onClick={displayContextMenu}
            className={`d-flex justify-content-center align-items-center rounded-circle ${classes.moreIcon}`}
          >
            <div className={classes.dots}>
              <BiDotsVerticalRounded />
            </div>
          </div>
        </div>
      </ToolTipItemName>
      <ItemContextMenu
        linkToBeCopied={linkToBeCopied}
        copyLink={copyLink}
        renameFunc={renameDirectory}
        downloadFunc={downloadDirectory}
        isDir={true}
        dirName={currentDirName}
        id={id}
        deleteItem={deleteItem}
      />
    </>
  );
};
export default Directory;
