import {ReactNode} from "react";
import {isEmptyObj} from "../utils/objectUtil.ts";
import useAuth from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode
}
const PrivateRoute = ({children} : PrivateRouteProps) => {
    const {user} = useAuth();

    if(isEmptyObj(user)){
        return <Navigate to={"/signin"}/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;