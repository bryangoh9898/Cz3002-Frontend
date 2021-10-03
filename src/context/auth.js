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
    const [username, setUsername] = useState(null);
    const [id, setID] = useState(null);
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
            setUsername(response.data.username);
            setID(response.data.id);
            localStorage.setItem('user',JSON.stringify({token:response.data.token,username:response.data.username,id:response.data.id}));
            cb();
            return response.token
            })
            .catch(function (error) {
            console.log(error);
            alert("Incorrect username or password")
            });
    };
  
    const signout = (cb) => {
        console.log("SIGNOUT");
        setToken(null);
        localStorage.removeItem('user');
        console.log("CALLBACK");
        cb();
    };
  
    useEffect(() => {
        if(token == null)
        {
            let userStored = localStorage.getItem('user');
            console.log(userStored);
            if(userStored != null)
            {
                const {token,username,id} = JSON.parse(userStored);
                setToken(token);
                setUsername(username);
                setID(id);
            }
            setLoading(false);
        }
      }, [token]);

    return {
        loading,
        token,
        username,
        id,
        signin,
        signout
    };
  }