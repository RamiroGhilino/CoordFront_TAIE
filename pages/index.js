import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut, getSession} from 'next-auth/react';
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/modeTogle";
import APIClient from "@/pages/api/apiClient";
import { useRouter } from 'next/router';

const apiClient = APIClient.getInstance();

/**
 * Renders the authentication page component.
 * This component handles the authentication process for a web application.
 * It checks the user's session status using the `useSession` hook from the `next-auth/react` library.
 * If the user is already authenticated, it redirects them to the dashboard page.
 * Otherwise, it displays a login form with a button to sign in using Google.
 * The component also includes a mode toggle button to switch between light and dark themes.
 *
 * @returns {JSX.Element} The rendered authentication page component.
 */
export default function AuthenticationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if(session?.access_token){
    try{
      apiClient.setAccessToken(session.access_token);
      const responseFetch = async () => await apiClient.fetchAccessToken(session.access_token)
      console.log("Access Token del Fetch ====> ", responseFetch);
      router.push('/reports');
    }catch(error){
      //TODO: Revisar que efectivamente niegue a los mail no UCC
      console.log("===================Error ==========>", error);
      signOut();
    }
  }
  
  /**
   * Handles the sign-in process.
   * Uses the `signIn` function from the `next-auth` library to initiate the sign-in.
   */
  const handleSignIn = () => {
    signIn();
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <ModeToggle />
      </div>
      <div className="w-full lg:w-11/12 mx-auto">
        <Card>
          <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r rounded-l-xl overflow-hidden">
              <div className="absolute inset-0 bg-zinc-900">
                <Image
                  src="/images/comunidad_ucc.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Comunidad UCC"
                  className="rounded-l-xl"
                  priority={true}
                />
              </div>
              <div className="relative z-20 flex items-center font-medium">
                <Image
                  src="/images/ucc_logo.png"
                  alt="Logo de la Universidad Católica de Córdoba"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-2xl">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="scroll-m-20 font-extrabold tracking-tight lg:text-5xl">
                  ¡Bienvenido al apartado de Coordinadores del Turnero TAIE!
                </h1>
                <p className="text-lg text-muted-foreground ">
                  Ingresá con tu cuenta institucional UCC.
                </p>
                <div>
                  <Button onClick={handleSignIn}> Ingresar con Google</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
