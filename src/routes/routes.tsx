import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Structure from "../pages/Structure/Structure.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Login from "../pages/Login/Login.tsx";
import Signup from "../pages/Signup/Signup.tsx";

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Layout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/",
                element: <Structure />,
            },
            {
                path: "*",
                element: <Structure />,
            },
        ],
    },
]);

export default router;
