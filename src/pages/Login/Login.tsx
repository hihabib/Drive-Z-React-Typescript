import {Button, Container, FloatingLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import classes from "./Login.module.css";
import useAuth from "../../hooks/useAuth.ts";
import {isEmptyObj} from "../../utils/objectUtil.ts";
import {Navigate} from "react-router-dom";

const Login = () => {
    const {user} = useAuth()
    if(!isEmptyObj(user)){
        return <Navigate to={"/"}/>
    }
    return (
        <Container className={'vh-100 d-flex justify-content-center align-items-center'}>
            <div className={classes.loginContainer}>
                <Form>
                    <FloatingLabel label={'Enter your username'}>
                        <FormControl placeholder={'Enter your username'}/>
                    </FloatingLabel>
                    <FloatingLabel className={'mt-3'} label={'Enter your Password'}>
                        <FormControl placeholder={'Enter your Password'}/>
                    </FloatingLabel>
                    <FormGroup className={'mt-3'}>
                        <Button variant={'primary'} className={'w-100 btn-lg'}>Login</Button>
                    </FormGroup>

                </Form>
            </div>
        </Container>
    );
};

export default Login;