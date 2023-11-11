import {RouterProvider} from "react-router-dom";
import router from "./routes/routes.tsx";
import StructureProvider from "./context/StructureContext/StructureProvider.tsx";
const App = () => {
    return (
        <StructureProvider>
           <div className={'drive-z'}>
               <RouterProvider router={router}/>
           </div>
        </StructureProvider>
    );
};

export default App;