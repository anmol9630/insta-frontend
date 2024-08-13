import { createContext, useContext } from "react";

export const loginContext = createContext({
    loggedIn: false,
    username:'',
    userId:'',
    login : () => {},
    logout : () => {},
    setUser : (id) => {},
    userDetails : {},
    
    setUserDetails : (data) => {}
});

export const useloginContext = () => useContext(loginContext)

export const LoginProvider = loginContext.Provider;

