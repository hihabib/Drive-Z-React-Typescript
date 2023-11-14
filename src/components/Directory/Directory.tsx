import {BiDotsVerticalRounded, BiSolidFolder} from "react-icons/bi";
import classes from "./Directory.module.css";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";
import {useRef} from "react";
import useSelection from "../../hooks/useSelection.ts";
import {useNavigate} from "react-router-dom";

interface DirectoryProps {
    id: string,
    dirName: string
}

const Directory = ({id, dirName}: DirectoryProps) => {
    const {displayContextMenu} = useDriveContextMenu(id);
    const directory = useRef<HTMLDivElement>();
    const {isSelected, selectedItemAction} = useSelection({
        type: 'directory', ref: directory, id,
    });

    const navigate = useNavigate();
    const openDirectory = () => {
        navigate(dirName, {relative: "path"});
    }

    console.log("Directory")
    return (<>
        <div ref={directory}
             style={{backgroundColor: isSelected() ? 'rgb(194, 231, 255)' : 'rgb(242, 246, 252)'}}
             onClick={() => selectedItemAction("ADD")}
             onDoubleClick={openDirectory}
             onContextMenu={displayContextMenu}
             className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${classes.directory}`}>

            <div className={`d-inline-flex gap-3 rounded-4 align-items-center ${classes.directoryNameWithIcon}`}>
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
    </>)
}

export default Directory;