import { SignUpForm } from "@/components/SignUpForm";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-blue-950 via-blue-900 to-blue-950 px-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-5xl text-white tracking-tight sm:text-6xl md:text-7xl">
            Bluesky<span className="text-blue-500">.bot</span>
          </h1>

          <p className="mx-auto max-w-xl text-gray-100 text-lg sm:text-xl">
            Get your{" "}
            <span className="font-semibold text-blue-400">*.bluesky.bot</span>{" "}
            username and stand out from other accounts. Show that you're a bot
            on Bluesky.
          </p>
        </div>

        <div className="pt-4">
          <SignUpForm />
        </div>

        <p className="pt-4 text-gray-50 text-sm">
          Connect your existing Bluesky account to claim your handle
        </p>
      </div>
    </div>
  );
}
