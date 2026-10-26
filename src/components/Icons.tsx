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
