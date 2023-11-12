import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Home from "../pages/Home/Home.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Login from "../pages/Login/Login.tsx";

const router = createBrowserRouter([
    {
        path: '/signin',
        element: <Login/>
    },
    {
        path: '/',
        element: <PrivateRoute><Layout/></PrivateRoute>,
        children: [
            {
                path:'/',
                element: <Home/>
            }
        ]
    }
]);

export default router;