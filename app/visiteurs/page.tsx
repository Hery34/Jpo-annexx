import { getVisiteurs } from "@/lib/supabase/visiteurs";
import VisiteursList from "@/components/visiteurs-list";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Force la page à être dynamique et à récupérer les données fraîches à chaque requête
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VisiteursPage() {
  // Récupérer la liste des visiteurs
  const visiteurs = await getVisiteurs();

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-6 max-w-7xl p-5">
        <div className="flex flex-col items-center gap-4 mb-4 mt-8">
          <Image
            src="/logo_annexx.png"
            alt="Logo Annexx"
            width={150}
            height={150}
            className="object-contain"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              Liste des inscrits
            </h1>
            <p className="text-lg text-gray-600">
              Journées Portes Ouvertes Marseille EST
            </p>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour au formulaire
            </Button>
          </Link>
        </div>

        <VisiteursList visiteurs={visiteurs} />
      </div>
    </main>
  );
}
