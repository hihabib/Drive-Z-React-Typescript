import {Item, Menu, Separator, Submenu} from "react-contexify";

interface GeneralContextMenuProps {
    id: string
}
const GeneralContextMenu = ({id}: GeneralContextMenuProps) => {
    function handleItemClick({event, props, triggerEvent, data}) {
        console.log(event, props, triggerEvent, data);
    }

    return (<Menu id={id}>
            <Item onClick={handleItemClick}>
                Item 1
            </Item>
            <Item onClick={handleItemClick}>
                Item 2
            </Item>
            <Separator/>
            <Item disabled>Disabled</Item>
            <Separator/>
            <Submenu label="Submenu">
                <Item onClick={handleItemClick}>
                    Sub Item 1
                </Item>
                <Item onClick={handleItemClick}>Sub Item 2</Item>
            </Submenu>
        </Menu>);
};

export default GeneralContextMenu;