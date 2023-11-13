import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";
import {CardHeader, Stack} from "react-bootstrap";
import classes from "./File.module.css";
import {BiDotsVerticalRounded, BiSolidFile} from "react-icons/bi";
import {getExtension} from "../../utils/stringUtil.ts";
interface FileProps {
    id: string
    fileName: string,
    addSelectedItem: (id: string) => void
    isSelected: (id: string) => boolean
}
const File = ({id, fileName, addSelectedItem, isSelected}: FileProps) => {
    const extension = getExtension(fileName)
    const {displayContextMenu} = useDriveContextMenu(id);
    return (
        <div onClick={() => addSelectedItem(id)} onContextMenu={displayContextMenu}>
            <div style={{backgroundColor: isSelected(id) ? 'rgb(194, 231, 255)':'rgb(242, 246, 252)'}} className={classes.frame}>
                <Stack direction={'horizontal'} className={'justify-content-between align-items-center'}>
                    <div className={`d-flex gap-3 align-items-center ${classes.fileNameWithIcon}`}>
                        <BiSolidFile/>
                        <CardHeader className={classes.fileTitle}>{fileName}</CardHeader>
                    </div>
                    <div className={`d-flex justify-content-center align-items-center ${classes.moreIcon}`} onClick={displayContextMenu}>
                        <BiDotsVerticalRounded/>
                    </div>
                </Stack>
                <div className={`${classes.staticThumbnail}`}>
                    <div>{extension} file</div>
                </div>
            </div>
            <ContextMenu id={id} isDir={false}/>
        </div>
    );
};

export default File;