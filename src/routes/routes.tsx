import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Structure from "../pages/Structure/Structure.tsx";
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
                element: <Structure/>
            },
            {
                path: '*',
                element: <Structure/>
            }
        ]
    }
]);

export default router;