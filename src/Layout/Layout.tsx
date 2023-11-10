import {FloatingLabel, Form, FormControl} from "react-bootstrap";
import logo from '../assets/images/drive.png'
import classes from './Layout.module.css'
import {IoSettingsOutline} from "react-icons/io5";
import {BiUserCircle} from "react-icons/bi";

const Layout = () => {
    return (<>
        <header className={'d-flex align-items-center gap-4 px-3 pt-3'}>
            <div className={`d-flex align-items-center ${classes.headerLeft}`}>
                <div className={`${classes.logo} d-flex align-items-center gap-2`}>
                    <img src={logo} style={{height: '40px', width: '40px'}} alt="drive-z"/>
                    <span>Drive-Z</span>
                </div>
            </div>
            <div className={`d-flex justify-content-between align-items-center ${classes.headerRight}`}>
                <Form className={`w-75`}>
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
            </div>
        </header>
        <main className={`d-flex gap-4 px-3 mt-2`}>
            <aside className={`${classes.sidebar}`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aspernatur dignissimos dolore dolorem eius eligendi est fugit iste laboriosam libero magni maxime minus molestiae molestias, nesciunt nihil quo repudiandae unde vel velit vitae voluptate, voluptates. Earum laborum nobis quam. Autem consectetur cum debitis enim ex hic, magnam nobis placeat quis quisquam repellat similique suscipit tenetur. Accusamus adipisci beatae iste? Distinctio error fugit laboriosam natus nostrum numquam omnis repellat repudiandae vero! Distinctio eos est exercitationem fuga hic labore, magni minima, mollitia necessitatibus nemo non officiis quibusdam quo sit soluta, suscipit tenetur velit? Consequuntur excepturi impedit ipsum, laborum mollitia quisquam voluptate. Blanditiis distinctio, exercitationem inventore ipsum reiciendis saepe soluta? Assumenda hic maiores, provident quam quisquam repellendus repudiandae temporibus. Adipisci autem debitis enim exercitationem expedita fuga, incidunt inventore iure labore minus, molestias, nesciunt placeat quas similique tenetur? At excepturi labore optio quaerat quam! Adipisci aliquid aperiam cupiditate ea et eveniet harum illum inventore itaque iusto labore laboriosam maiores molestiae mollitia necessitatibus nulla pariatur porro, quis quisquam quod recusandae rem repellendus tempora tenetur ut voluptas voluptate. Assumenda distinctio dolore facilis ipsam magnam magni molestiae quaerat quia quod voluptatem. Ab aspernatur eligendi porro reprehenderit vel. Aliquam aspernatur expedita fuga, iste nulla pariatur quos rerum voluptatem?
            </aside>
            <div>
                helelo world
                {/*<Outlet/>*/}
            </div>
        </main>
    </>);
};

export default Layout;