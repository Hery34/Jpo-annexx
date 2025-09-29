import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VisiteurForm from "@/components/visiteur-form";
import Image from "next/image";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 mb-4">
        <Image
          src="/logo_annexx.png"
          alt="Logo Annexx"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <VisiteurForm />
    </div>
  );
}
