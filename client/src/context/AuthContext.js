import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user:{
        _id: "64bae101387a4e24fd6b9b92",
        username:"jane",
        email:"jane@gmail.com",
        profilePictrue: "person/1.jpeg",
        coverPictrue: "",
        isAdmin: false,
        followers: [],
        followings: []
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
    <AuthContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error, dispatch}}>
        {children}

    </AuthContext.Provider>);
}