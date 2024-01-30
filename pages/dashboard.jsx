import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserStatus from './userStatus.js'; 
import { useRouter } from 'next/router';
import { withAuth } from '../lib/authcheck.js';




const Dashboard = () => {
 const { data: session, status } = useSession();
 const router = useRouter(); // Incluye esta línea
 
 return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      {session ? (
        <UserStatus session={session} />
      ) : (
        <Card>
          <CardTitle className="m-4">
            Parece que no encontramos tu sesión, intenta de nuevo:
          </CardTitle>
          <CardDescription className="m-2">
            <Button onClick={() => signIn()} variant="outline">Iniciar sesión</Button>
          </CardDescription>
        </Card>
      )}
    </div>
  </div>
 )
}

export default withAuth (Dashboard);
