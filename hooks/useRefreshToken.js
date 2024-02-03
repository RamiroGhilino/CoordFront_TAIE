import { useEffect } from 'react';
import axios from "../pages/api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('api/token/refresh/',
            JSON.stringify({
                refresh: auth?.refresh_token,
            }),
        {
            'Content-Type': 'application/json'
        });
        setAuth(prev => {
            console.log("Previous access_token:", JSON.stringify(prev));
            console.log("New access_token:", JSON.stringify(response.data));
            return { ...prev, access_token: response.data.access, refresh_token: response.data.refresh };
        });
        return response.data.access;
    }
    
    return refresh;
};

export default useRefreshToken;