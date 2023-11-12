import {IUser, AuthContext} from "./AuthContext.ts";
import {ReactNode, useReducer} from "react";
import {userReducer} from "../../reducers/userReducer.ts";

interface AuthProviderProps {
    children: ReactNode
}
const AuthProvider = ({children} : AuthProviderProps) => {
    const [user, dispatch] = useReducer(userReducer, {} as IUser)
    return (
        <AuthContext.Provider value={{user, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;