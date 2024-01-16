import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"; // Agrega esta importación

export function withAuth(Component) {
  const Auth = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter(); // Incluye esta línea

    // Si el estado de la sesión es "loading", muestra un indicador de carga o lo que desees
    if (status === "loading") return <Loading />;

    // Si el usuario no está autenticado, redirige a la página de inicio
    if (!session) {
      // Puedes personalizar la redirección según tus necesidades
      router.replace("/");
      return null;
    }

    // Si el usuario está autenticado, renderiza el componente original
    return <Component {...props} />;
  };

  return Auth;
}
