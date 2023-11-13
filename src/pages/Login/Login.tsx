import {Button, Container, FloatingLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import classes from "./Login.module.css";
import useAuthContext from "../../hooks/useAuthContext.ts";
import {isEmptyObj} from "../../utils/objectUtil.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Auth} from "../../model.ts";
import {UserAction} from "../../constants/user.ts";

const Login = () => {
    const {user, dispatch} = useAuthContext()
    const navigate = useNavigate();
    const {getFieldProps, handleSubmit} = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async ({username, password}) => {
            try {
                const {data:LoginResponse, status} = await axios.post("http://localhost:8080/api/v1/auth/signin", {
                    username,
                    password
                });
                const token:string = LoginResponse.token;
                const user : {
                    name: string,
                    email: string,
                    username: string
                } = LoginResponse.user;

                if(200 === status) {
                    localStorage.setItem(Auth.TOKEN, token)
                    localStorage.setItem(Auth.USER, JSON.stringify(user))
                    toast.success("Login Successful", {
                        position:"top-right",
                        autoClose:2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        rtl: false,
                        pauseOnFocusLoss: true,
                        draggable: true,
                        pauseOnHover: true,
                        theme:"colored",
                    })
                    await new Promise((resolve) => setTimeout(resolve, 2000))
                    dispatch({type: UserAction.set, payload: {
                            username: user.username,
                            fullName: user.name,
                            email: user.email
                        }})
                    navigate("/")
                    return;
                } else {
                    toast.error('Login Failed', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }catch (error) {
                toast.error('Login Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    })
    if(!isEmptyObj(user)){
        return <Navigate to={"/"}/>
    }

    return (
        <Container className={'vh-100 d-flex justify-content-center align-items-center'}>
            <div className={classes.loginContainer}>
                <ToastContainer/>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel label={'Enter your username'}>
                        <FormControl {...getFieldProps('username')} name={'username'} id={'username'} placeholder={'Enter your username'}/>
                    </FloatingLabel>
                    <FloatingLabel className={'mt-3'} label={'Enter your Password'}>
                        <FormControl type={'password'} {...getFieldProps('password')} name={'password'} id={'password'} placeholder={'Enter your Password'}/>
                    </FloatingLabel>
                    <FormGroup className={'mt-3'}>
                        <Button type={'submit'} variant={'primary'} className={'w-100 btn-lg'}>Login</Button>
                    </FormGroup>
                </Form>
            </div>
        </Container>
    );
};

export default Login;