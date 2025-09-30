"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/Button";
import { signInWithBluesky } from "@/lib/actions";

export function SignUpForm() {
  const router = useRouter();

  const id = useId();

  const [loading, setLoading] = useState<boolean>(false);
  const [handle, setHandle] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (!handle) {
      return;
    }

    try {
      // Sign in with Bluesky
      const url: string = await signInWithBluesky(handle);

      // Redirect to the Bluesky login page
      router.push(url);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative isolate mt-8 flex items-center pr-1"
    >
      <label htmlFor={`old-handle-${id}`} className="sr-only">
        Current Bluesky Handle
      </label>
      <input
        required
        type="text"
        id={`old-handle-${id}`}
        placeholder="Your current Bluesky handle"
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Button type="submit" disabled={loading} loading={loading} arrow>
        Join Community
      </Button>
      <div className="-z-10 absolute inset-0 rounded-lg transition peer-focus:ring-4 peer-focus:ring-blue-300/15" />
      <div className="-z-10 absolute inset-0 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-blue-300" />
    </form>
  );
}
