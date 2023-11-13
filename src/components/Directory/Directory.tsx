import {BiDotsVerticalRounded, BiSolidFolder} from "react-icons/bi";
import classes from "./Directory.module.css";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";
import {useState} from "react";

interface DirectoryProps {
    dirName: string,
    id: string
}

const Directory = ({dirName, id}: DirectoryProps) => {
    const {displayContextMenu} = useDriveContextMenu(id);
    const [isSelected, setIsSelected] = useState(false)
    const enterFolder = () => {
        console.log("Entered")
    }
    const selectFolder = () => {
        setIsSelected(true)
    }
    return (<>
        <div
            style={{backgroundColor: isSelected ? 'rgb(194, 231, 255)' : 'rgb(242, 246, 252)'}}
            onClick={selectFolder}
            onDoubleClick={enterFolder}
            onContextMenu={displayContextMenu}
            className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${classes.directory}`}>

            <div className={`d-inline-flex gap-3 rounded-4 align-items-center ${classes.folderNameWithIcon}`}>
                <div className={`d-flex align-items-center`}><BiSolidFolder/></div>
                <div className={`${classes.directoryName}`}>{dirName}</div>
            </div>
            <div onClick={displayContextMenu}
                 className={`d-flex justify-content-center align-items-center rounded-circle ${classes.moreIcon}`}>
                <div className={classes.dots}>
                    <BiDotsVerticalRounded/>
                </div>
            </div>
        </div>
        <ContextMenu isDir={true} dirName={dirName} id={id}/>
    </>);
};

export default Directory;