import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import Home from "../pages/Home/Home.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path:'/',
                element: <Home/>
            }
        ]
    }
]);

export default router;