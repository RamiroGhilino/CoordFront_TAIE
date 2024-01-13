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
import UserStatus from './userStatus'; // Update this line

const LoginPage = () => {
 const { data: session, status } = useSession();

 return (
    <div className="min-h-screen flex items-center justify-center">
        {session ? (
                   <UserStatus session={session} />
        ) : (
            <Card>
               <CardTitle className="m-4">
                Not signed in 
                <CardDescription className="m-2">
                  <Button onClick={() => signIn()} variant="outline">Sign in</Button>
                </CardDescription>
               </CardTitle>
            </Card>
        )}
    </div>
 )
}

export default LoginPage;
