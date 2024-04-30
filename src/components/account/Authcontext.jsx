import React, { useState, createContext, useEffect} from "react";
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = props => {
    const [auth, setAuth] = useState({})

    const login = async (user, password) => {
        const reqbody = {
            user: user,
            password: password,
        }

        try {
            const loginReq = await axios.post('http://localhost:8080/user/login', JSON.stringify(reqbody), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            if (loginReq.status === 201) {

              localStorage.setItem('token', loginReq.data.accsess_token )
                const result = {

                    user: jwtDecode(loginReq.data.accsess_token)
                }
                setAuth(result)
                return loginReq
            }
        } catch (error) {
            
            throw error
        }
    }

    
    const LogOut =  () => {

        localStorage.removeItem('token')
        
        setAuth({})

        return true
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            setAuth({
                jwt: token,
                user: user
            });
        }
    }, [])



    return (
        <AuthContext.Provider value={{auth, setAuth, login, LogOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}