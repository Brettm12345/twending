import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "relative rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      href="https://github.com/brettm12345/twending"
      rel="noopener noreferrer"
      target="_blank"
    >
      <svg
        viewBox="0 0 100 100"
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Twending"
      >
        <g>
          <path
            d="M86.6667 78.0417H95.9167V85.7917"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M95.9167 78.0417L82.8125 89.0208L75.1042 82.5625L65.0833 90.9583"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.5 79.1667C17.5833 85 17.5833 68.75 10.5 66.6667M60.5 87.5V72.9167C60.5 68.75 60.9167 67.0833 58.4167 64.5833C70.0833 63.3333 81.3333 58.75 81.3333 39.5833C81.3283 34.604 79.3856 29.8221 75.9167 26.25C77.5436 21.9249 77.3938 17.1318 75.5 12.9167C75.5 12.9167 70.9167 11.6667 60.9167 18.3333C52.4468 16.1274 43.5532 16.1274 35.0833 18.3333C25.0833 11.6667 20.5 12.9167 20.5 12.9167C18.6062 17.1318 18.4564 21.9249 20.0833 26.25C16.6144 29.8221 14.6717 34.604 14.6667 39.5833C14.6667 58.75 25.9167 63.3333 37.5833 64.5833C35.0833 67.0833 35.0833 69.5833 35.5 72.9167V87.5"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </a>
  );
}
