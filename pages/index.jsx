import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/modeTogle";
import { useRouter } from "next/router";
import axios from "./api/axios";
import useAuth from "@/hooks/useAuth";
import useAuthenticate from "@/hooks/useAuthenticate";
import { toast } from "@/components/ui/use-toast";
import { CheckIcon } from "@radix-ui/react-icons";

const TOKEN_AUTH = "/api/token/auth/";

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
  const verifyGoogleAccount = useAuthenticate();

  useEffect(() => {
    if (session?.access_token) {
      toast({
        action: (
          <div className="w-full flex items-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[0.125em] motion-reduce:animate-spin-[1.5s] ease-linear infinite"
              role="loading"
            ></div>
            <span className="ml-2">Verificando cuenta institucional...</span>
          </div>
        ),
      });
      verifyGoogleAccount().then((verified) => {
        if (!verified) {
          // If the verification fails, sign out the user, but signOut() refresh the page,
          // so all react status are lost, i need to save in localstorage to show toast when re-render
          //localStorage.setItem("rejected", true);
          localStorage.setItem("rejected", true);
          signOut();
          return;
        }
        toast({
          variant: "success",
          action: (
            <div className="w-full flex items-center">
              <CheckIcon className="w-8 h-8" />
              <span className="first-letter:capitalize">
                ¡Cuenta Verificada!
              </span>
            </div>
          ),
        });
        router.push("/postulations");
      });
    }
  }, [session?.access_token]);

  useEffect(() => {
    //Check if we just re-rendered the page because of a singOut() call
    if (localStorage.getItem("rejected")) {
      localStorage.removeItem("rejected");
      toast({
        variant: "destructive",
        title: "Cuenta no autorizada",
        description:
          "Sola las cuentas de dominio UCC corespondientes a Coordinadores pueden ingresar.",
      });
    }
  }, []);

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
