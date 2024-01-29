import {Button, Container, FloatingLabel, Form, FormControl, FormGroup,} from "react-bootstrap";
import classes from "./Login.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Auth} from "../../model.ts";
import {domain} from "../../../server.ts";
import {userSignal} from "../../signals";
import {TUser} from "../../types/user.ts";

const Login = () => {

    const {getFieldProps, handleSubmit} = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async ({username, password}) => {
            try {
                const {data: LoginResponse, status} = await axios.post(
                    `${domain}/api/v1/user/login`,
                    {
                        username,
                        password,
                    },
                );
                const token: string = LoginResponse.token;
                const user = LoginResponse.user as TUser;

                if (200 === status) {
                    localStorage.setItem(Auth.TOKEN, token);
                    localStorage.setItem(Auth.USER, JSON.stringify(user));
                    toast.success("Login Successful", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        rtl: false,
                        pauseOnFocusLoss: true,
                        draggable: true,
                        pauseOnHover: true,
                        theme: "colored",
                    });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    // save user here
                    userSignal.value = user;
                    // navigate("/")
                    window.location.href = "/";
                    return;
                } else {
                    toast.error("Login Failed", {
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
            } catch (error) {
                toast.error("Login Failed", {
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
        },
    });
    if (userSignal.value !== null) {
        return <Navigate to={"/"}/>;
    }

    return (
        <Container
            className={
                "vh-100 d-flex justify-content-center align-items-center"
            }
        >
            <div className={classes.loginContainer}>
                <ToastContainer/>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel label={"Enter your username"}>
                        <FormControl
                            {...getFieldProps("username")}
                            name={"username"}
                            id={"username"}
                            placeholder={"Enter your username"}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your Password"}
                    >
                        <FormControl
                            type={"password"}
                            {...getFieldProps("password")}
                            name={"password"}
                            id={"password"}
                            placeholder={"Enter your Password"}
                        />
                    </FloatingLabel>
                    <FormGroup className={"mt-3"}>
                        <Button
                            type={"submit"}
                            variant={"primary"}
                            className={"w-100 btn-lg"}
                        >
                            Login
                        </Button>
                        <NavLink
                            to={"/signup"}
                            className={"w-100 btn btn-link mt-3 "}
                        >
                            Create new account
                        </NavLink>
                    </FormGroup>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
