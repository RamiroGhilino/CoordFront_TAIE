import { useEffect, useState } from 'react';
import { useSession, signIn} from 'next-auth/react';
import axios from "../pages/api/axios";
import useAuth from './useAuth';

const useAuthenticate = () => {
    const { auth, setAuth } = useAuth();
    const { data: session, status } = useSession();
    
    const verifyGoogleAccount = async () => {
        console.log("Verificando cuenta de Google con un Usuario UCC..");
        try{
          const response = await axios.post(
            '/api/token/auth/', 
            JSON.stringify({
              token: session?.access_token,
              origin: "page"
            }),
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const access_token = response?.data?.access_token;
          const refresh_token = response?.data?.refresh_token;
          const user = response?.data?.user;
          await setAuth({access_token, refresh_token, user});
          return true;
        }catch(err){
          return false;
        }
      }
    
    return verifyGoogleAccount;
};

export default useAuthenticate;