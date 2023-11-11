import {useContextMenu} from "react-contexify";
import {MouseEvent} from "react";


const useDriveContextMenu = (id: string) => {
    const {show} = useContextMenu({
        id
    })
    const displayContextMenu = (event: MouseEvent<HTMLElement>): void => {
        show({
            event
        })
    }
   return {displayContextMenu}
};

export default useDriveContextMenu;