import {BiDotsVerticalRounded, BiSolidFolder} from "react-icons/bi";
import classes from "./Directory.module.css";
interface DirectoryProps {
    dirName: string
}
const Directory = ({dirName} : DirectoryProps) => {
    return (
        <div className={`d-inline-flex gap-3 rounded-4 align-items-center justify-content-between ${classes.directory}`}>
            <div className={`d-inline-flex gap-3 rounded-4 align-items-center`}>
                <div className={`d-flex align-items-center`}><BiSolidFolder/></div>
                <div className={`${classes.directoryName}`}>{dirName}</div>
            </div>
            <div className={`d-flex justify-content-center align-items-center rounded-circle ${classes.moreIcon}`}>
                <BiDotsVerticalRounded/>
            </div>
        </div>
    );
};

export default Directory;