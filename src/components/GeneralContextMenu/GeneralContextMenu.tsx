import { Item, Menu } from "react-contexify";
import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";
import classes from "./GeneralContextMenu.module.css";
import useGeneralContextMenu from "../../hooks/useGeneralContextMenu.ts";
interface GeneralContextMenuProps {
    id: string;
}
const GeneralContextMenu = ({ id }: GeneralContextMenuProps) => {
    const {
        hideNewDirectoryModal,
        showNewDirectoryModal,
        isCreateDirectoryModalVisible,
        handleCreateDirectorySubmission,
        getCreateDirectoryProps,
    } = useGeneralContextMenu();

    const createDirectoryModal = (
        <Modal
            centered
            className={classes.modal}
            show={isCreateDirectoryModalVisible}
            onHide={hideNewDirectoryModal}
        >
            <form onSubmit={handleCreateDirectorySubmission}>
                <Modal.Header className={"border-0 pb-0"}>
                    <Modal.Title>New Directory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <FormControl
                            autoFocus
                            {...getCreateDirectoryProps("create_new_directory")}
                            id={"create_new_directory"}
                            name={"create_new_directory"}
                            type={"text"}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer className={"border-0 pt-0"}>
                    <Button
                        onClick={hideNewDirectoryModal}
                        variant={"link"}
                        className={`${classes.button} rounded-5`}
                    >
                        Cancel
                    </Button>
                    <Button
                        type={"submit"}
                        variant={"link"}
                        className={`${classes.button} rounded-5`}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
    return (
        <>
            {createDirectoryModal}
            <Menu className={`contextMenu`} animation={false} id={id}>
                <Item onClick={showNewDirectoryModal}>New Directory</Item>
                {/*<Item onClick={() => {}}>Item 2</Item>*/}
                {/*<Separator />*/}
                {/*<Item disabled>Disabled</Item>*/}
                {/*<Separator />*/}
                {/*<Submenu label="Submenu">*/}
                {/*    <Item onClick={() => {}}>Sub Item 1</Item>*/}
                {/*    <Item onClick={() => {}}>Sub Item 2</Item>*/}
                {/*</Submenu>*/}
            </Menu>
        </>
    );
};

export default GeneralContextMenu;
