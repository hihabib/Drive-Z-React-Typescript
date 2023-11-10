import {Button} from "react-bootstrap";
import {BiPlus} from "react-icons/bi";

const Sidebar = () => {
    return (
        <div>
            <Button className={'bg-white px-4 py-2 shadow-sm rounded-4'} variant={'light'}>
                <span style={{fontSize: '25px'}}><BiPlus/></span>
                New
            </Button>
        </div>
    );
};

export default Sidebar;