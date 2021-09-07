import axios from 'axios';
import constants from '../Constants';
import React, { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  }
export const useAuth = () => {
    return useContext(AuthContext);
};
function useProvideAuth() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    //cb is callback function
    const signin = (username, password,cb) => {
        console.log("username" + username+"password"+password);
        return axios.post(`${constants.URL}users/login`, {
            username: username,
            password: password
            })
            .then(function (response) {
            console.log(response.data.token);
            setToken(response.data.token);
            localStorage.setItem('token',token);
            cb();
            return response.token
            })
            .catch(function (error) {
            console.log(error);
            });
    };
  
    const signout = (cb) => {
        console.log("SIGNOUT");
        setToken(null);
        localStorage.removeItem('token');
        console.log("CALLBACK");
        cb();
    };
  
    useEffect(() => {
        if(token == null)
        {
            let tokenStored = localStorage.getItem('token',token);
            console.log(tokenStored);
            if(tokenStored != null)
            {
                setToken(tokenStored);
            }
            setLoading(false);
        }
      }, [token]);

    return {
        loading,
        token,
        signin,
        signout
    };
  }