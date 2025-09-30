import {
  IconBrandBluesky,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { IconLink } from "@/components/IconLink";
import { Logo } from "@/components/Logo";
import { SignUpForm } from "@/components/SignUpForm";

export function Intro() {
  return (
    <>
      <div>
        <Link href="/">
          <Logo className="inline-block h-14 w-auto fill-white" />
        </Link>
      </div>
      <h1 className="mt-14 text-balance font-display font-light text-4xl/tight text-white">
        Claim your <span className="text-blue-300">*.bluesky.bot</span> handle
        today and stand out on <span className="text-blue-300">Bluesky</span>{" "}
        network!
      </h1>
      <p className="mt-2 text-gray-300 text-sm/6">
        Follow the instructions below to get your own{" "}
        <code className="rounded-md bg-gray-800 px-1 py-0.5 text-gray-300 text-sm/6">
          bluesky.bot
        </code>{" "}
        handle. It&apos;s free and easy!
      </p>
      <SignUpForm />
      <div className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        <IconLink
          href="https://bsky.app/profile/bluesky.bot"
          target="_blank"
          icon={IconBrandBluesky}
          className="flex-none"
        >
          Bluesky
        </IconLink>
        <IconLink
          href="mailto:contact@pirmax.fr"
          target="_blank"
          icon={IconMail}
          className="flex-none"
        >
          Contact
        </IconLink>
        <IconLink
          href="https://github.com/pirmax/bluesky.bot"
          target="_blank"
          icon={IconBrandGithub}
          className="flex-none"
        >
          GitHub
        </IconLink>
      </div>
    </>
  );
}

export function IntroFooter() {
  return (
    <div>
      <p className="mt-2 flex items-baseline text-[0.8125rem]/6 text-gray-500">
        Powered by{" "}
        <IconLink
          href="https://bsky.app/profile/pirmax.fr"
          target="_blank"
          icon={IconBrandBluesky}
          compact
        >
          Maxence Rose
        </IconLink>{" "}
        • Source Code on{" "}
        <IconLink
          href="https://github.com/pirmax/bluesky.bot"
          target="_blank"
          icon={IconBrandGithub}
          compact
        >
          GitHub
        </IconLink>
      </p>
    </div>
  );
}
