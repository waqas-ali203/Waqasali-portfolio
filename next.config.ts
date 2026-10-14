import type { NextConfig } from "next";
const config: NextConfig = {
  ...(process.env.ORBITAL_STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  poweredByHeader: false,
  images: { unoptimized: process.env.ORBITAL_STATIC_EXPORT === "1" },
};
if (process.env.ORBITAL_STATIC_EXPORT !== "1") {
  config.headers = async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  };
}
export default config;
