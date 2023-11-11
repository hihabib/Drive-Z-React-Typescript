import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import useDriveContextMenu from "../../hooks/useDriveContextMenu.ts";
import {CardHeader, Stack} from "react-bootstrap";
import classes from "./File.module.css";
import {BiDotsVerticalRounded, BiSolidFile} from "react-icons/bi";
interface FileProps {
    id: string
    fileName: string
}
const File = ({id, fileName}: FileProps) => {
    const {displayContextMenu} = useDriveContextMenu(id);
    return (
        <div onContextMenu={displayContextMenu}>
            <div className={classes.frame}>
                <Stack direction={'horizontal'} className={'justify-content-between align-items-center'}>
                    <div className={'d-flex gap-3 align-items-center'}>
                        <BiSolidFile/>
                        <CardHeader>{fileName}</CardHeader>
                    </div>
                    <div>
                        <BiDotsVerticalRounded/>
                    </div>
                </Stack>
            </div>
            <ContextMenu id={id} isDir={false}/>
        </div>
    );
};

export default File;