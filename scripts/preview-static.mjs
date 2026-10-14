import http from "node:http";
import path from "node:path";
import { stat, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".json": "application/json",
};
http
  .createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = path.resolve(root, "." + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(400);
        res.end();
        return;
      }
      let status = 200;
      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        file = path.join(file, "index.html");
        info = await stat(file).catch(() => null);
      }
      if (!info?.isFile()) {
        file = path.join(root, "404.html");
        status = 404;
      }
      const body = await readFile(file);
      const type =
        types[path.extname(file)] ||
        (pathname === "/opengraph-image"
          ? "image/png"
          : "application/octet-stream");
      const compress =
        /text|javascript|json|xml|svg/.test(type) &&
        req.headers["accept-encoding"]?.includes("gzip");
      res.writeHead(status, {
        "Content-Type": type,
        ...(compress
          ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
          : {}),
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Frame-Options": "DENY",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      });
      res.end(compress ? gzipSync(body) : body);
    } catch {
      res.writeHead(400);
      res.end("Invalid request");
    }
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`Static production preview: http://localhost:${port}`),
  );
