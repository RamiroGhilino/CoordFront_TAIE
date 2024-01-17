import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';
import image from '../lib/files/SIGLA_UCC_negativo.png';

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav style={{ backgroundColor: '#132D58', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%' } }>
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              <Image src={image} alt="UCC LOGO" className="h-8 w-8" />
            </div>

            <div className="hidden sm:ml-6 sm:flex space-x-4">
              <Link href="/dashboard" className={`text-white hover:text-gray-300 ${router.pathname === '/dashboard' ? 'font-bold' : ''}`}>
                Tutorias
              </Link>
              <Link href="/postulations" className={`text-white hover:text-gray-300 ${router.pathname === '/postulations' ? 'font-bold' : ''}`}>
                Postulaciones
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button>
              <div className="text-white">
                {session?.user?.name ?? 'No inicio correctamente'}
              </div>
            </Button>
            <Button onClick={() => signOut()} variant="outline" size="sm">
                Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
