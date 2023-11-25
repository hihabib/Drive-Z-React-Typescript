import {ReactNode} from "react";
import {isEmptyObj} from "../utils/objectUtil.ts";
import useAuth from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";
import {Auth} from "../model.ts";
import axios from "axios";
import {IUser} from "../@types/authContext";
import {UserAction} from "../constants/user.ts";
import { domain } from "../../server.ts";


interface PrivateRouteProps {
    children: ReactNode
}
const PrivateRoute = ({children} : PrivateRouteProps) => {
    const {user, dispatch} = useAuth();

    if(isEmptyObj(user)){
        const token = localStorage.getItem(Auth.TOKEN);
        if(token){
            (async () =>{
                try {
                    const {data: {user}} : {data: {user:IUser}} = await axios.get(`${domain}/api/v1/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    localStorage.setItem(Auth.USER, JSON.stringify(user));
                    dispatch({type: UserAction.set, payload: user})
                } catch (error) {
                    console.error(error)
                }
            })()
        } else {
            return <Navigate to={"/signin"}/>
        }
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;
