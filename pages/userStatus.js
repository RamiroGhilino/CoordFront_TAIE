// UserStatus.js
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "next/link";

const UserStatus = ({ session }) => {
  const { name, email } = session.user;

  return (
    <div className="min-h-screen flex flex-col w-full">
      <nav className="bg-blue-900 shadow-md w-full">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-white">
                <span className="text-2xl font-bold">Logo</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex space-x-4">
                <a href="/home" className="text-white hover:text-gray-300">
                  Dashboard
                </a>
                <a
                  href="/playground"
                  className="text-white hover:text-gray-300"
                >
                  Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center">
        <Card>
          <CardTitle className="m-4">
            Signed in as {email}
            <CardDescription className="m-2">
              <Button onClick={() => signOut()} variant="outline">
                Sign out
              </Button>
            </CardDescription>
          </CardTitle>
        </Card>
      </div>
    </div>
  );
};

export default UserStatus;
