import {useContext} from "react";
import {AuthContext} from "../context/UserContext/AuthContext.ts";

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;