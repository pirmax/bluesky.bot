import type { User } from "@repo/database";
import { redirect } from "next/navigation";
import { StarField } from "@/components/StarField";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { getUserFromSession } from "@/lib/actions";

export default async function Page() {
  const user: User | null = await getUserFromSession();

  if (!user) {
    redirect(`/`);
  }

  return (
    <div className="relative isolate flex flex-auto flex-col items-center justify-center overflow-hidden bg-gray-950 text-center">
      <svg
        aria-hidden="true"
        className="-z-10 -translate-x-1/2 absolute top-[-10vh] left-1/2 h-[120vh] w-[120vw] min-w-[60rem]"
      >
        <defs>
          <radialGradient id="gradient" cy="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>
      <StarField className="sm:-mt-16" />

      <div className="w-full max-w-sm">
        <UpdateProfileForm user={user} />
      </div>
    </div>
  );
}
