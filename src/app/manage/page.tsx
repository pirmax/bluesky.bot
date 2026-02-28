import { redirect } from "next/navigation";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import type { User } from "@/generated/prisma/client";
import { getUserFromSession } from "@/lib/actions";

export default async function Page() {
  const user: User | null = await getUserFromSession();

  if (!user) {
    redirect(`/`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-950 via-blue-900 to-blue-950 px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <UpdateProfileForm user={user} />
      </div>
    </div>
  );
}
