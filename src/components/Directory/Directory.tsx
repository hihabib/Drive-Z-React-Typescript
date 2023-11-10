import {
    BiAddToQueue, BiBarChart,
    BiDotsVerticalRounded,
    BiDownload,
    BiFolderOpen, BiInfoCircle,
    BiLinkAlt,
    BiPencil, BiSearch,
    BiSolidFolder, BiStar, BiTrash,
    BiUserPlus
} from "react-icons/bi";
import classes from "./Directory.module.css";
import {MouseEvent} from "react";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import {Stack} from "react-bootstrap";

interface DirectoryProps {
    dirName: string,
    id: string
}

const Directory = ({dirName, id}: DirectoryProps) => {
    const {show} = useContextMenu({
        id
    })
    const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
        show({
            event
        })
    }
    return (<>
        <div onContextMenu={displayContextMenu}
             className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${classes.directory}`}>
            <div className={`d-inline-flex gap-3 rounded-4 align-items-center`}>
                <div className={`d-flex align-items-center`}><BiSolidFolder/></div>
                <div className={`${classes.directoryName}`}>{dirName}</div>
            </div>
            <div onClick={displayContextMenu}
                 className={`d-flex justify-content-center align-items-center rounded-circle ${classes.moreIcon}`}>
                <BiDotsVerticalRounded/>
            </div>
        </div>
        <Menu className={'contextMenu'} animation={false} id={id}>
            <Item onClick={() => console.log("Working Context menu")}>
                <Stack direction={'horizontal'} gap={3}>
                    <div style={{fontSize: '20px'}}><BiDownload/></div>
                    <div>Download</div>
                </Stack>
            </Item>
            <Item onClick={() => console.log("Working Context menu")}>
                <Stack direction={'horizontal'} gap={3}>
                    <div style={{fontSize: '20px'}}><BiPencil/></div>
                    <div>Rename</div>
                </Stack>
            </Item>
            <Separator/>
            <Submenu label={<Stack direction={'horizontal'} gap={3}>
                <div style={{fontSize: '20px'}}><BiUserPlus/></div>
                <div>Share</div>
            </Stack>
                }>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiUserPlus/></div>
                        <div>Share</div>
                    </Stack>
                </Item>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiLinkAlt/></div>
                        <div>Copy Link</div>
                    </Stack>
                </Item>
            </Submenu>
            <Submenu label={
                <Stack direction={'horizontal'} gap={3}>
                    <div style={{fontSize: '20px'}}><BiFolderOpen/></div>
                    <div>Organize</div>
                </Stack>
                }>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiDownload/></div>
                        <div>Move</div>
                    </Stack>
                </Item>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiAddToQueue/></div>
                        <div>Add Shortcut</div>
                    </Stack>
                </Item>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiStar/></div>
                        <div>Add to starred</div>
                    </Stack>
                </Item>
            </Submenu>
            <Submenu label={
                <Stack direction={'horizontal'} gap={3}>
                    <div style={{fontSize: '20px'}}><BiInfoCircle/></div>
                    <div>File Information</div>
                </Stack>
                }>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiInfoCircle/></div>
                        <div>Details</div>
                    </Stack>
                </Item>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiBarChart/></div>
                        <div>Activity</div>
                    </Stack>
                </Item>
                <Item onClick={() => console.log("Working Context menu")}>
                    <Stack direction={'horizontal'} gap={3}>
                        <div style={{fontSize: '20px'}}><BiSearch/></div>
                        <div>Search within {dirName}</div>
                    </Stack>
                </Item>
            </Submenu>
            <Separator/>
            <Item onClick={() => console.log("Working Context menu")}>
                <Stack direction={'horizontal'} gap={3}>
                    <div style={{fontSize: '20px'}}><BiTrash/></div>
                    <div>Move to trash</div>
                </Stack>
            </Item>
        </Menu>
    </>);
};

export default Directory;