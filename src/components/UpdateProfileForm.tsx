"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/Button";
import type { User } from "@/generated/prisma/client";
import { updateNewHandle } from "@/lib/actions";

export function UpdateProfileForm({ user }: { user: User }) {
  const id = useId();

  const [currentHandle, setCurrentHandle] = useState<string>(
    user.newHandle || user.oldHandle,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [handle, setHandle] = useState<string>("");
  const [message, setMessage] = useState<
    | {
        type: "success" | "error";
        text: string;
      }
    | undefined
  >();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage(undefined);
    setLoading(true);

    if (!handle || handle.includes(".")) {
      setLoading(false);
      setMessage({
        type: "error",
        text: "Invalid handle!",
      });

      return;
    }

    try {
      user = await updateNewHandle(
        handle
          .replace(process.env.NEXT_PUBLIC_HANDLE_SUFFIX as string, "")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toLowerCase(),
      );

      setMessage({
        type: "success",
        text: "Handle claimed successfully! You must change your handle by the new handle in your Bluesky settings.",
      });

      setCurrentHandle(`${handle}${process.env.NEXT_PUBLIC_HANDLE_SUFFIX}`);
      setHandle("");
    } catch (_) {
      setMessage({
        type: "error",
        text: "Invalid handle or handle already taken!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Image
        src={user.avatar || ""}
        width={100}
        height={100}
        alt="Bluesky Avatar"
        className="mx-auto size-48 rounded-lg ring-4 ring-white/10"
      />
      <div className="relative isolate flex items-center pr-1">
        <label htmlFor={`atproto-did-${id}`} className="sr-only">
          ATProto Did
        </label>
        <input
          required
          type="text"
          id={`atproto-did-${id}`}
          className="peer w-full flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-50 focus:outline-none sm:text-[0.8125rem]/6"
          value={user.did}
          readOnly
        />
        <div className="-z-10 absolute inset-0 rounded-lg transition peer-focus:ring-4 peer-focus:ring-blue-300/15" />
        <div className="-z-10 absolute inset-0 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-blue-300" />
      </div>
      <div className="relative isolate flex items-center pr-1">
        <label htmlFor={`old-handle-${id}`} className="sr-only">
          Bluesky Handle
        </label>
        <input
          required
          type="text"
          id={`old-handle-${id}`}
          className="peer w-full flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-50 focus:outline-none sm:text-[0.8125rem]/6"
          value={currentHandle}
          readOnly
        />
        <div className="-z-10 absolute inset-0 rounded-lg transition peer-focus:ring-4 peer-focus:ring-blue-300/15" />
        <div className="-z-10 absolute inset-0 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-blue-300" />
      </div>
      <div className="relative isolate flex items-center pr-1">
        <label htmlFor={`new-handle-${id}`} className="sr-only">
          New Bluesky Handle
        </label>
        <input
          required
          type="text"
          id={`new-handle-${id}`}
          placeholder="example"
          className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-50 focus:outline-none sm:text-[0.8125rem]/6"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <Button type="submit" disabled={loading} loading={loading} arrow>
          Claim Handle
        </Button>
        <div className="-z-10 absolute inset-0 rounded-lg transition peer-focus:ring-4 peer-focus:ring-blue-300/15" />
        <div className="-z-10 absolute inset-0 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-blue-300" />
      </div>
      {message && (
        <div>
          <p
            className={clsx("font-semibold text-sm", {
              "text-green-400": message.type === "success",
              "text-red-400": message.type === "error",
            })}
          >
            {message.text}
          </p>
        </div>
      )}
      <div className="mt-10 text-balance text-sm text-white tracking-tighter">
        To update the new handle, please change it in your Bluesky settings at{" "}
        <Link
          href="https://bsky.app/settings/account"
          target="_blank"
          className="underline"
        >
          bsky.app/settings/account
        </Link>
      </div>
    </form>
  );
}
