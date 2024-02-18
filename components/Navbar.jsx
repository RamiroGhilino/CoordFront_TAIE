import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';
import image from '../lib/files/SIGLA_UCC_negativo.png';
import { ModeToggle } from "@/components/modeTogle";
import UserPopOver from "@/components/UserPopOver";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav style={{ backgroundColor: '#132D58', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%' }}>
      <div className="px-4 mx-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white">
              <Image src={image} alt="UCC LOGO" className="h-10 w-10" />
            </div>

            <div className="hidden sm:ml-6 sm:flex space-x-4">
              <Link href="/reports" className={`text-white hover:text-gray-300 ${router.pathname === '/reports' ? 'font-bold' : ''}`}>
                Tutorías
              </Link>
              <Link href="/postulations" className={`text-white hover:text-gray-300 ${router.pathname === '/postulations' ? 'font-bold' : ''}`}>
                Postulaciones
              </Link>
              <a href="http://metabasetaie.me/" target="_blank" rel="noopener noreferrer" className={`text-white hover:text-gray-300`}>
                Estadísticas
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Button for user name */}
            <UserPopOver />

            {/* ModeToggle component */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
