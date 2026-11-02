// One tile style for the three feature cards: 1.5px line, the people's colours only where they mean someone.
const INK = "#191919";
const SOFT = "#c4c4c4";
const ALIA = "#e0623a";
const BEK = "#2a9d73";
const CLEO = "#3b6cf4";

export default function FeatureIcon({ kind }: { kind: "team" | "context" | "overlap" }) {
  return (
    <span className={`fi fi-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {kind === "team" && (
          <>
            <circle cx="8" cy="10.5" r="4.4" fill={ALIA} stroke="#fff" strokeWidth="1.6" />
            <circle cx="14" cy="10.5" r="4.4" fill={BEK} stroke="#fff" strokeWidth="1.6" />
            <circle cx="20" cy="10.5" r="4.4" fill={CLEO} stroke="#fff" strokeWidth="1.6" />
            <path d="M6 19.5h9" stroke={INK} strokeWidth="1.5" />
            <path d="M6 23h14" stroke={SOFT} strokeWidth="1.5" />
            <circle className="fi-live" cx="21.5" cy="19.5" r="1.6" fill={BEK} stroke="none" />
          </>
        )}
        {kind === "context" && (
          <>
            <rect x="3" y="7" width="9" height="14" rx="2.2" stroke={SOFT} strokeWidth="1.5" />
            <rect x="16" y="7" width="9" height="14" rx="2.2" stroke={SOFT} strokeWidth="1.5" />
            <g className="fi-arrow" stroke={INK} strokeWidth="1.6">
              <path d="M7.5 14h13" />
              <path d="M16.8 10.4 20.5 14l-3.7 3.6" />
            </g>
          </>
        )}
        {kind === "overlap" && (
          <>
            <rect x="5" y="4.5" width="12" height="16" rx="2.2" stroke={SOFT} strokeWidth="1.5" />
            <rect x="10" y="8.5" width="13" height="16" rx="2.2" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <path d="M13.5 13.5h6" stroke={INK} strokeWidth="1.5" />
            <path d="M13.5 17.5h6" stroke={ALIA} strokeWidth="1.8" />
            <circle cx="23" cy="8.5" r="2.5" fill={ALIA} stroke="#fff" strokeWidth="1.4" />
          </>
        )}
      </svg>
    </span>
  );
}
