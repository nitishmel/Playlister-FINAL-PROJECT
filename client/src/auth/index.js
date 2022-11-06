import React, {createContext, useEffect, useState, useContext} from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'
import { GlobalStoreContext } from '../store'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    PROP_UP_ERROR: "PROP_UP_ERROR"
}

function AuthContextProvider(props) {

    //const { store } = useContext(GlobalStoreContext);
    
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errormodal: false,
        errormess: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errormodal: false,
                    errormess: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errormodal: false,
                    errormess: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errormodal: false,
                    errormess: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errormodal: false,
                    errormess: null               
                })
            }
            case AuthActionType.PROP_UP_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errormodal: true,
                    errormess: payload.errormess
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
    try {
        
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);

        if (response.status === 200){

            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    
                    user: response.data.user
                }
            })

            history.push("/");
        }
    } catch(error){

        authReducer({
            type: AuthActionType.PROP_UP_ERROR,
            payload: {errormess: error.response.data.errorMessage}
        })
    }
}

    auth.loginUser = async function(email, password) {

        try
        {
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
        }catch(error){

            authReducer({
                type: AuthActionType.PROP_UP_ERROR,
                payload: {errormess: error.response.data.errorMessage}
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.hideErrorModal = function() {

        authReducer({
            type: AuthActionType.GET_LOGGED_IN,
            payload: {}
        })
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };