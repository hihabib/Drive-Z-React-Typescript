import {RouterProvider} from "react-router-dom";
import router from "./routes/routes.tsx";

const App = () => {
    return (
       <div className={'drive-z'}>
           <RouterProvider router={router}/>
       </div>
    );
};

export default App;