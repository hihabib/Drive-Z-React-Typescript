import { Button } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import GeneralContextMenu from "../components/GeneralContextMenu/GeneralContextMenu.tsx";
import { useContextMenu } from "react-contexify";
import { MouseEvent } from "react";

const Sidebar = () => {
    const { show } = useContextMenu({
        id: "GeneralContextMenu",
    });

    const displayGeneralContextMenu = (event: MouseEvent<HTMLElement>) => {
        show({ event });
    };
    return (
        <div>
            <Button
                onClick={displayGeneralContextMenu}
                className={"bg-white px-4 py-2 shadow-sm rounded-4"}
                variant={"light"}
            >
                <span style={{ fontSize: "25px" }}>
                    <BiPlus />
                </span>
                New
            </Button>
            <GeneralContextMenu id={"GeneralContextMenu"} />
        </div>
    );
};

export default Sidebar;
