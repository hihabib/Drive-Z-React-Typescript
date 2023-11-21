import { BiBowlHot } from "react-icons/bi";
import classes from "./EmptyDirectory.module.css";
import GeneralContextMenu from "../GeneralContextMenu/GeneralContextMenu.tsx";
import { useContextMenu } from "react-contexify";
import { MouseEvent } from "react";

const EmptyDirectory = () => {
    const { show } = useContextMenu({
        id: "GeneralContextMenu",
    });
    const displayGeneralContextMenu = (event: MouseEvent<HTMLElement>) => {
        show({ event });
    };
    return (
        <div className={"w-100"} onContextMenu={displayGeneralContextMenu}>
            <div className={classes.emptyBox}>
                <BiBowlHot className={classes.icon} />

                <div className={classes.text}>
                    <span>Drop Files Here</span>
                </div>
                <GeneralContextMenu id={"GeneralContextMenu"} />
            </div>
        </div>
    );
};
export default EmptyDirectory;
