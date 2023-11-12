import {RouterProvider} from "react-router-dom";
import router from "./routes/routes.tsx";
import StructureProvider from "./context/StructureContext/StructureProvider.tsx";
import AuthProvider from "./context/UserContext/AuthProvider.tsx";
const App = () => {
    return (
        <AuthProvider>
            <StructureProvider>
               <div className={'drive-z'}>
                   <RouterProvider router={router}/>
               </div>
            </StructureProvider>
        </AuthProvider>
    );
};

export default App;