import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <Link href="/protected/visiteurs">
              <Button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Users className="h-4 w-4" />
                Voir les inscrits
              </Button>
            </Link>
            {!hasEnvVars ? null : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-6 max-w-5xl p-4">
          {children}
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
