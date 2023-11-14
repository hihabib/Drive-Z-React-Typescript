import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";
import {CardHeader, Stack} from "react-bootstrap";
import classes from "./File.module.css";
import {BiDotsVerticalRounded, BiSolidFile} from "react-icons/bi";
import {getExtension} from "../../utils/stringUtil.ts";
import useSelection from "../../hooks/useSelection.ts";
import {useRef} from "react";

interface FileProps {
    id: string
    fileName: string,
}


const File = ({id, fileName}: FileProps) => {

    const file = useRef<HTMLDivElement>();
    const {isSelected, selectedItemAction} = useSelection({type: 'file', id, ref: file});
    const extension = getExtension(fileName)
    const {displayContextMenu, downloadFile} = useDriveContextMenu(id, fileName);
    return (<div onDoubleClick={downloadFile} ref={file} onClick={() => selectedItemAction("ADD")}
                 onContextMenu={displayContextMenu}>
        <div style={{backgroundColor: isSelected() ? 'rgb(194, 231, 255)' : 'rgb(242, 246, 252)'}}
             className={classes.frame}>
            <Stack direction={'horizontal'} className={'justify-content-between align-items-center'}>
                <div className={`d-flex gap-3 align-items-center ${classes.fileNameWithIcon}`}>
                    <BiSolidFile/>
                    <CardHeader className={classes.fileTitle}>{fileName}</CardHeader>
                </div>
                <div className={`d-flex justify-content-center align-items-center ${classes.moreIcon}`}
                     onClick={displayContextMenu}>
                    <BiDotsVerticalRounded/>
                </div>
            </Stack>
            <div className={`${classes.staticThumbnail}`}>
                <div>{extension} file</div>
            </div>
        </div>
        <ContextMenu downloadFunc={downloadFile} id={id} isDir={false}/>
    </div>);
};

export default File;