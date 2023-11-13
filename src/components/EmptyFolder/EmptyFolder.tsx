import {BiBowlHot} from "react-icons/bi";
import classes from "./EmptyFolder.module.css";

const EmptyFolder = () => {
    return (
        <div  className={classes.emptyBox}>

                <BiBowlHot className={classes.icon}/>

            <div className={classes.text}>
                <span>Drop Files Here</span>
            </div>
        </div>
    );
};
export default EmptyFolder;
