import {useContext} from "react";
import {AuthContext} from "../context/UserContext/AuthContext.ts";

const useAuthContext = () => {
    return useContext(AuthContext)
};

export default useAuthContext;