import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export function GmailIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        d="M2.5 6.75v10.5A1.75 1.75 0 0 0 4.25 19h15.5a1.75 1.75 0 0 0 1.75-1.75V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3 7l7.7 5.4a2 2 0 0 0 2.3 0L20.7 7"
        stroke="#EA4335"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 7v10.5" stroke="#4285F4" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M21 7v10.5" stroke="#34A853" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.2 12.2 3 16.2" stroke="#FBBC05" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.8 12.2 21 16.2" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedInIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

export function GitHubIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...props}>
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

export function GovMateIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...props}>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.2 15.8V8.2h2.1c1.85 0 3 .95 3 2.55 0 1.55-1.1 2.5-2.95 2.5H8.55v2.55H7.2zm1.35-3.85h.7c.9 0 1.45-.45 1.45-1.2s-.55-1.2-1.45-1.2h-.7v2.4z"
        fill="currentColor"
      />
      <circle cx="16.4" cy="9.1" r="1.15" fill="#8ec4d6" />
      <path
        d="M14.9 15.8c.35-.95 1.2-1.55 2.25-1.55s1.9.6 2.25 1.55"
        stroke="#8ec4d6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
