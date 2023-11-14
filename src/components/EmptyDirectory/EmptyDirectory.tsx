import {BiBowlHot} from "react-icons/bi";
import classes from "./EmptyDirectory.module.css";

const EmptyDirectory = () => {
    return (
        <div  className={classes.emptyBox}>

                <BiBowlHot className={classes.icon}/>

            <div className={classes.text}>
                <span>Drop Files Here</span>
            </div>
        </div>
    );
};
export default EmptyDirectory;
