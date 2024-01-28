import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
 title: "Authentication",
 description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
 return (
    <div className="flex items-center justify-center min-h-screen">
        <div className=" w-full lg:w-11/12 mx-auto">
          <Card>
            <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
              <div className="relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r rounded-l-xl overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900">
                 <Image
                    src="/images/comunidad_ucc.jpg"
                    fill
                    style={{objectFit:"cover"}}
                    alt="Comunidad UCC"
                    className="rounded-l-xl"
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
                  <p className="text-base text-muted-foreground ">Ingresá con tu cuenta institucional UCC.</p>
                  <Button onClick={() => signIn()} >
                    Ingresar con Google
                  </Button>
                 </div>
                </div>
            </div>
          </Card>
        </div>
      </div>
 )
}
