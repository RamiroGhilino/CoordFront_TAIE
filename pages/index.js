import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Aplicación para coordinadores de Tutorías TAIE
      </h1>

      <div className="mt-4">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
