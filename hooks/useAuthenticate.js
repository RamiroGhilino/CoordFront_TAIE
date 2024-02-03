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
          console.log("Respuesta de Back =>", response?.data);
          const access_token = response?.data?.access_token;
          const refresh_token = response?.data?.refresh_token;
          const user = response?.data?.user;
          await setAuth({access_token, refresh_token, user});
          return true;
        }catch(err){
          if (!err?.response) {
            console.log('No Server Response');
          } else if (err.response?.status === 400) {
            console.log('Missing Google Access Token');
          } else if (err.response?.status === 401) {
            console.log('Unauthorized');
          } else {
            setErconsole.logrMsg('Login Failed');
          }

          return false;
        }
      }
    
    return verifyGoogleAccount;
};

export default useAuthenticate;