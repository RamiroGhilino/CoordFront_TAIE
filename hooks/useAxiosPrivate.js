import axiosPrivate from "../pages/api/axios";
import { useEffect } from 'react';
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/**
 * Custom hook that creates an instance of axios with private authorization headers.
 * It automatically handles token refreshing and retries failed requests with a new access token.
 *
 * @returns {AxiosInstance} The axios instance with private authorization headers.
 */
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(()=>{
        
        // This interceptor adds the authorization header to each request
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    console.log("Adding authorization header:", auth?.access_token);

                    config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                }
                console.log("Headers Actualizados:", JSON.stringify(config));

                return config
            }, (error) => Promise.reject(error)
        )

        // This interceptor handles token refreshing and retries failed requests with a new access token only once.
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log("Detected error on fetch:", error);
                const prevRequest = error?.config;
                //This if prevents for retry more than 1 time
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // This is a clean up function
        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;