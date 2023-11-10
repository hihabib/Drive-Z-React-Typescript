import {Outlet} from "react-router-dom";
import {FloatingLabel, Form, FormControl} from "react-bootstrap";
import logo from '../assets/images/drive.png'
import classes from './Layout.module.css'
import {IoSettingsOutline} from "react-icons/io5";
import {BiUserCircle} from "react-icons/bi";

const Layout = () => {
    return (<>
        <header className={'d-flex gap-5 p-3 align-items-center'}>
            <div className={`${classes.logo} d-flex align-items-center gap-2`}>
                <img src={logo} style={{height: '40px', width: '40px'}} alt="drive-z"/>
                <span>Drive-Z</span>
            </div>
            <Form className={'w-75'}>
                <FloatingLabel className={classes.topSearch} label={"Search..."}>
                    <FormControl className={'rounded-5 ps-4'} placeholder={'Search...'}/>
                </FloatingLabel>
            </Form>
            <div className={`${classes.options} d-flex gap-3`}>
                <div className={`d-flex align-items-center`}>
                    <IoSettingsOutline/>
                </div>
                <div className={`d-flex align-items-center`}>
                    <BiUserCircle/>
                </div>
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
    </>);
};

export default Layout;