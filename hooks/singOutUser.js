import useAuth from "@/hooks/useAuth";
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"

const UserSignOut = () => {
    const { auth, setAuth } = useAuth();

    const handleSignOut = () => {
        // Deletes all backend data
        setAuth({});

        // Deletes all google session data
        signOut();
        
    };

    return (
        <Button onClick={() => handleSignOut()} variant="outline">
            Cerrar sesión
        </Button>
    );
};

export default UserSignOut;
