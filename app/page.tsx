import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VisiteurForm from "@/components/visiteur-form";

export default async function Home() {
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

            <div className="flex gap-4 mt-4">
              <Link href="/visiteurs">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 text-lg font-semibold rounded-lg">
                  Voir les inscrits
                </Button>
              </Link>
            </div>

            <div className="w-full mt-8">
              <VisiteurForm />
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
