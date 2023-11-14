import {RouterProvider} from "react-router-dom";
import router from "./routes/routes.tsx";
import AuthProvider from "./context/UserContext/AuthProvider.tsx";

const App = () => {
    return (<AuthProvider>
            <div className={'drive-z'}>
                <RouterProvider router={router}/>
            </div>
        </AuthProvider>);
};

export default App;