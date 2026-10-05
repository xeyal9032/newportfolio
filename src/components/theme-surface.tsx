import Image from "next/image";

export function ThemeSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-surface relative isolate overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/images/code-atmosphere.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-[center_30%] opacity-[0.16] dark:opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--background)_82%,transparent)]" />
      </div>
      {children}
    </div>
  );
}
