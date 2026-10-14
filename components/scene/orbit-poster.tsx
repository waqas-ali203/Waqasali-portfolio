export function OrbitPoster({
  layers = [true, true, true],
}: {
  layers?: boolean[];
}) {
  return (
    <svg viewBox="0 0 700 700" className="orbit-poster" aria-hidden="true">
      <defs>
        <radialGradient id="halo">
          <stop stopColor="#758664" stopOpacity=".2" />
          <stop offset="1" stopColor="#090b0a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f3f5eb" />
          <stop offset=".18" stopColor="#747e74" />
          <stop offset=".37" stopColor="#242b26" />
          <stop offset=".55" stopColor="#dce2da" />
          <stop offset=".72" stopColor="#505d50" />
          <stop offset="1" stopColor="#101712" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2=".4">
          <stop stopColor="#505a51" />
          <stop offset=".3" stopColor="#f2f0e8" />
          <stop offset=".6" stopColor="#364036" />
          <stop offset="1" stopColor="#a6b4a2" />
        </linearGradient>
        <radialGradient id="sphere" cx=".3" cy=".25">
          <stop stopColor="#e5e9dc" />
          <stop offset=".3" stopColor="#899184" />
          <stop offset=".65" stopColor="#333d35" />
          <stop offset="1" stopColor="#0b110d" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <circle cx="350" cy="350" r="340" fill="url(#halo)" />
      <g transform="translate(350 350) rotate(-28)">
        <g style={{ display: layers[0] ? "block" : "none" }}>
          <ellipse
            rx="268"
            ry="174"
            fill="none"
            stroke="#151e17"
            strokeWidth="25"
          />
          <ellipse
            rx="266"
            ry="170"
            fill="none"
            stroke="url(#metal)"
            strokeWidth="17"
            strokeDasharray="1170 220"
          />
          <ellipse
            rx="270"
            ry="174"
            fill="none"
            stroke="url(#edge)"
            strokeWidth="2"
            strokeDasharray="1170 220"
          />
        </g>
        <g
          transform="rotate(74)"
          style={{ display: layers[1] ? "block" : "none" }}
        >
          <ellipse
            rx="226"
            ry="134"
            fill="none"
            stroke="#0b100c"
            strokeWidth="24"
          />
          <ellipse
            rx="222"
            ry="131"
            fill="none"
            stroke="url(#metal)"
            strokeWidth="17"
            strokeDasharray="1000 140"
          />
          <ellipse
            rx="225"
            ry="134"
            fill="none"
            stroke="url(#edge)"
            strokeWidth="2"
            strokeDasharray="1000 140"
          />
        </g>
        <g
          transform="rotate(-56)"
          style={{ display: layers[2] ? "block" : "none" }}
        >
          <ellipse
            rx="201"
            ry="87"
            fill="none"
            stroke="url(#metal)"
            strokeWidth="13"
            strokeDasharray="830 180"
          />
          <ellipse
            rx="204"
            ry="90"
            fill="none"
            stroke="url(#edge)"
            strokeWidth="2"
            strokeDasharray="830 180"
          />
        </g>
        <circle r="94" fill="url(#sphere)" stroke="#879480" strokeWidth="1" />
        <g opacity=".75" fill="none" stroke="url(#edge)">
          {[-60, -40, -20, 0, 20, 40, 60].map((x, i) => (
            <ellipse
              key={i}
              cy={x}
              rx={Math.sqrt(94 * 94 - x * x)}
              ry="20"
              strokeWidth="3"
            />
          ))}
        </g>
        <ellipse
          rx="94"
          ry="25"
          fill="none"
          stroke="#c5ff67"
          strokeWidth="2"
          opacity=".8"
        />
        <ellipse
          rx="29"
          ry="94"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="1"
          opacity=".4"
        />
        <ellipse
          rx="64"
          ry="94"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="1"
          opacity=".4"
          transform="rotate(25)"
        />
        <circle cx="-245" cy="-69" r="7" fill="#c5ff67" />
        <circle cx="156" cy="-138" r="4" fill="#e9f0e3" />
        {layers[0] && (
          <path
            d="M-266 0a266 170 0 0 0 272 170"
            fill="none"
            stroke="url(#edge)"
            strokeWidth="18"
          />
        )}
      </g>
      <g fill="#c5ff67">
        <circle cx="480" cy="524" r="3" />
        <circle cx="179" cy="207" r="2" />
      </g>
    </svg>
  );
}
