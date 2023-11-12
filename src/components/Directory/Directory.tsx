import {BiDotsVerticalRounded, BiSolidFolder} from "react-icons/bi";
import classes from "./Directory.module.css";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";

interface DirectoryProps {
    dirName: string,
    id: string
}

const Directory = ({dirName, id}: DirectoryProps) => {
    const {displayContextMenu} = useDriveContextMenu(id);
    return (<>
        <div onContextMenu={displayContextMenu}
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