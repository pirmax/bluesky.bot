import clsx from "clsx";
import Link from "next/link";

function ButtonInner({
  arrow = false,
  children,
}: {
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="absolute inset-0 rounded-md bg-linear-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-15" />
      <span className="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10" />
      {children} {arrow ? <span aria-hidden="true">&rarr;</span> : null}
    </>
  );
}

export function Button({
  className,
  loading,
  arrow,
  children,
  ...props
}: { loading?: boolean; arrow?: boolean } & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
)) {
  className = clsx(
    className,
    "group relative isolate flex-none rounded-md py-1.5 font-semibold text-[0.8125rem]/6 text-white",
    arrow ? "pr-[calc(9/16*1rem)] pl-2.5" : "px-2.5",
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props}>
      {loading ? (
        <svg
          role="img"
          aria-label="Loading..."
          viewBox="0 0 24 24"
          className="size-6 animate-spin fill-white"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
        </svg>
      ) : (
        <ButtonInner arrow={arrow}>{children}</ButtonInner>
      )}
    </button>
  ) : (
    <Link className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </Link>
  );
}
