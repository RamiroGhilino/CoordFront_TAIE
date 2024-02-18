import Loading from "@/components/Loading";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router"; // Agrega esta importación
import useAuthenticate from "@/hooks/useAuthenticate";
import useAuth from "@/hooks/useAuth";

export function withAuth(Component) {
  const Auth = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const verifyGoogleAccount = useAuthenticate();
    const { auth, setAuth } = useAuth();

    // Si el estado de la sesión es "loading", muestra un indicador de carga o lo que desees
    if (status === "loading") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Loading />
        </div>
      );
    }

    // Si el usuario no está autenticado, redirige a la página de inicio
    if (!session) {
      router.replace("/");
      return null;
    } else {
      if (Object.keys(auth).length === 0) {
        verifyGoogleAccount().then((verified) => {
          if (!verified) {
            signOut();
            return null;
          }
        });
      }
    }

    // Si el usuario está autenticado, renderiza el componente original
    return <Component {...props} />;
  };

  return Auth;
}
