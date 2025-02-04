import { createContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from '../GraphQL/Auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    /* const [authToken, setAuthToken] = useState(null); */
    const [refreshToken, setRefreshToken] = useState(null);

    const [refresh, { loading, data, error }] = useMutation(REFRESH_TOKEN);
    /* console.log("Refresh token from context is ", refreshToken) */

    const updateToken = async () => {

        const result = await refresh({
            variables: {
                refreshToken,
                revokeRefreshToken: false
            }
        })

        const data = result.data.refreshToken

        const isSuccessful = data.success

        if(isSuccessful){
            const {token} = data.token
            localStorage.setItem("Access", token)
            /* console.log("New access token is ", token) */
        }

    }

    useEffect(() => {

        const oneHour = 60 * 60 * 1000;

        const interval = setInterval(() => {
            if(localStorage.getItem("Access")){
                updateToken();
            }else{
                console.log("Refresh token is not valid")
                setRefreshToken(null)
            }
        }, oneHour)

        return () => clearInterval(interval)

    },[refreshToken])

    return(
        <AuthContext.Provider value={{refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )
}