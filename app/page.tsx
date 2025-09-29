import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  
  // Vérifier si l'utilisateur est connecté
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    redirect("/protected");
  }
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
 
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/logo_annexx.png"
              alt="Logo Annexx"
              width={400}
              height={400}
              className="object-contain"
            />
            <h1 className="text-4xl font-bold text-center text-red-600 max-w-4xl">
              Journées portes ouvertes Marseille EST
              <br />
              <span className="text-2xl">03 & 04 octobre 2025</span>
            </h1>
            <div className="mt-8">
              <Link href="/auth/login">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                  Accéder au formulaire d'inscription
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
        <p>
            Powered by{" "}
            <span className="font-bold text-red-600">
              Service Informatique Annexx
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}
