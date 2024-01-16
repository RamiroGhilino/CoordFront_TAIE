import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  // Función para manejar el inicio de sesión
  const handleSignIn = () => {
    signIn(); // Utiliza la función signIn de next-auth para iniciar sesión
  };

  // Redirige a /dashboard si hay una sesión activa
  if (status === "authenticated") {
    window.location.href = "/dashboard";
    return null; // Puedes también mostrar un loader o mensaje mientras redirige
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Aplicación para coordinadores de Tutorías TAIE
      </h1>

      <div className="mt-4">
        <Button onClick={handleSignIn}>Iniciar tablero</Button>
      </div>
    </div>
  );
}
