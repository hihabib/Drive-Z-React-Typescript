import {BiDotsVerticalRounded, BiSolidFolder} from "react-icons/bi";
import classes from "./Directory.module.css";
import "react-contexify/dist/ReactContexify.css";
import ItemContextMenu from "../ItemContextMenu/ItemContextMenu.tsx";
import useDirector from "../../hooks/useDirectory.ts";

interface DirectoryProps {
    id: string,
    dirName: string
}

const Directory = ({id, dirName}: DirectoryProps) => {
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
        downloadFolder,
        currentItemName:currentDirName,
        renameItem:renameDirectory
    } = useDirector({
        id, initialDirName: dirName
    })
    return <>
        <div ref={directory}
             style={{backgroundColor: isSelected() ? 'rgb(194, 231, 255)' : 'rgb(242, 246, 252)'}}
             onClick={() => selectedItemAction("ADD")}
             onDoubleClick={openDirectory}
             onContextMenu={displayContextMenu}
             className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${classes.directory}`}>
            <div className={`d-inline-flex gap-3 rounded-4 align-items-center ${classes.directoryNameWithIcon}`}>
                <div className={`d-flex align-items-center`}><BiSolidFolder/></div>
                {isRenameActive ? <>
                    <form className={`${classes.directoryName}`} onSubmit={handleSubmit}>
                        <input {...getFieldProps(id)} name={id} ref={renameRef} style={{maxWidth: "100%"}} id={id}
                               type={'text'}></input>
                    </form>
                </> : <>
                    <div className={`${classes.directoryName}`}>{currentDirName}</div>
                </>}
            </div>
            <div onClick={displayContextMenu}
                 className={`d-flex justify-content-center align-items-center rounded-circle ${classes.moreIcon}`}>
                <div className={classes.dots}>
                    <BiDotsVerticalRounded/>
                </div>
            </div>
        </div>
        <ItemContextMenu renameFunc={renameDirectory} downloadFunc={downloadFolder} isDir={true} dirName={currentDirName}
                         id={id}/>
    </>
}
export default Directory;