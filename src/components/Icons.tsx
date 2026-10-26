import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement> & { name?: string };
const paths: Record<string, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M7.3 3H4.8A1.8 1.8 0 003 5c.7 8.4 7.6 15.3 16 16a1.8 1.8 0 002-1.8v-2.5l-4.4-2-1.8 2a15 15 0 01-7.5-7.5l2-1.8L7.3 3z" />
  ),
  tooth: (
    <path d="M12 4c-3-2-7-1-7 3 0 2 1 4 1.5 6 .5 3 1 7 3 7 1.5 0 1-6 2.5-6s1 6 2.5 6c2 0 2.5-4 3-7C18 11 19 9 19 7c0-4-4-5-7-3zm0 0 3 2" />
  ),
  physio: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M5 10l7-2 7 2M12 8v7m0 0-5 6m5-6 5 6" />
    </>
  ),
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />,
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 10v2a7 7 0 0014 0v-2m-7 9v3m-4 0h8" />
    </>
  ),
  muted: (
    <>
      <path d="m3 3 18 18M9 9v3a3 3 0 005 2M9 5a3 3 0 016 0v6M5 10v2a7 7 0 0012 5m2-5v-2M12 19v3m-4 0h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4m10-4v4M3 11h18m-13 5 2 2 5-5" />
    </>
  ),
  website: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01m-2 7 2 2-2 2m5 0h3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6m0-10h.01" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3M3 12a22 22 0 0018 0m-9 1v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  message: (
    <path d="M21 11.5a9 9 0 01-9 9 10 10 0 01-4-.9L3 21l1.4-4.7A9 9 0 1121 11.5zM8 11h.01M12 11h.01M16 11h.01" />
  ),
  settings: (
    <>
      <path d="M4 6h5m4 0h7M4 12h9m4 0h3M4 18h2m4 0h10" />
      <circle cx="11" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};
export function Icon({ name = "arrow", ...props }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
