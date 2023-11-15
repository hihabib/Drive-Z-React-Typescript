import ItemContextMenu from "../ContextMenu/ItemContextMenu.tsx";
import {CardHeader, Stack} from "react-bootstrap";
import classes from "./File.module.css";
import {BiDotsVerticalRounded, BiSolidFile} from "react-icons/bi";
import useFile from "../../hooks/useFile.ts";


interface FileProps {
    id: string
    fileName: string,
}

const File = ({id, fileName}: FileProps) => {
    const {downloadFile, file, selectedItemAction, displayContextMenu, isSelected, isRenameActive, handleSubmit, getFieldProps, renameRef, currentItemName, extension, renameItem} = useFile({
        fileName: fileName,
        id: id
    })
    return (<div onDoubleClick={downloadFile} ref={file} onClick={() => selectedItemAction("ADD")}
                 onContextMenu={displayContextMenu}>
        <div style={{backgroundColor: isSelected() ? 'rgb(194, 231, 255)' : 'rgb(242, 246, 252)'}}
             className={classes.frame}>
            <Stack direction={'horizontal'} className={'justify-content-between align-items-center'}>
                <div className={`d-flex gap-3 align-items-center ${classes.fileNameWithIcon}`}>
                    <BiSolidFile/>
                    <CardHeader className={classes.fileTitle}>{isRenameActive ? <>
                        <form onSubmit={handleSubmit}>
                            <input onDoubleClick={e => e.stopPropagation()} {...getFieldProps(id)} name={id}
                                   ref={renameRef} style={{maxWidth: "100%"}} id={id}
                                   type={'text'}></input>
                        </form>
                    </> : <>
                        {currentItemName}   </>}</CardHeader>
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
        <ItemContextMenu renameFunc={renameItem} downloadFunc={downloadFile} id={id} isDir={false}/>
    </div>);
};

export default File;