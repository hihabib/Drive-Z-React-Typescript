import {
    Button,
    Container,
    FloatingLabel,
    Form,
    FormControl,
    FormGroup,
} from "react-bootstrap";
import classes from "./Signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { domain } from "../../../server.ts";

const Signup = () => {
    const navigate = useNavigate();
    const { getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            mobile: "",
            country: "",
        },
        onSubmit: async ({
            fullname,
            username,
            email,
            password,
            mobile,
            country,
        }) => {
            try {
                const { status } = await axios.post(
                    `${domain}/api/v1/auth/signup`,
                    {
                        fullName: fullname,
                        username: username,
                        email: email,
                        password: password,
                        mobile: mobile,
                        country: country,
                    },
                );

                if (201 === status) {
                    toast.success("Signup Successful", {
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
                    navigate("/");
                    return;
                } else {
                    toast.error("Signup Failed", {
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
                toast.error("Signup Failed", {
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

    return (
        <Container
            className={
                "vh-100 d-flex justify-content-center align-items-center"
            }
        >
            <div className={classes.signupContainer}>
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your Full name"}
                    >
                        <FormControl
                            {...getFieldProps("fullname")}
                            name={"fullname"}
                            id={"fullname"}
                            placeholder={"Enter your Full name"}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your username"}
                    >
                        <FormControl
                            {...getFieldProps("username")}
                            name={"username"}
                            id={"username"}
                            placeholder={"Enter your username"}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your email address"}
                    >
                        <FormControl
                            {...getFieldProps("email")}
                            name={"email"}
                            id={"email"}
                            placeholder={"Enter your email address"}
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
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your Mobile Number"}
                    >
                        <FormControl
                            type={"text"}
                            {...getFieldProps("mobile")}
                            name={"mobile"}
                            id={"mobile"}
                            placeholder={"Enter your Mobile Number"}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className={"mt-3"}
                        label={"Enter your Country Name"}
                    >
                        <FormControl
                            type={"text"}
                            {...getFieldProps("country")}
                            name={"country"}
                            id={"country"}
                            placeholder={"Enter your Country Name"}
                        />
                    </FloatingLabel>
                    <FormGroup className={"mt-3"}>
                        <Button
                            type={"submit"}
                            variant={"primary"}
                            className={"w-100 btn-lg"}
                        >
                            Signup
                        </Button>
                        <NavLink
                            to={"/signin"}
                            className={"w-100 btn mt-3 btn-danger btn-lg"}
                        >
                            Signin
                        </NavLink>
                    </FormGroup>
                </Form>
            </div>
        </Container>
    );
};

export default Signup;
