import puppeteer from "puppeteer";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setCacheEnabled(false);
const checks = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("artifacts/screenshots", { recursive: true });
try {
  for (const width of [390, 1440]) {
    await page.setViewport({
      width,
      height: width === 390 ? 844 : 1000,
      deviceScaleFactor: 1,
    });
    for (const route of ["/", "/about", "/contact"]) {
      const res = await page.goto(base + route, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(res.status(), 200);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 2,
        ),
        false,
      );
      assert.equal(await page.evaluate(() => document.fonts.status), "loaded");
      const broken = await page.$$eval("img", async (imgs) => {
        await Promise.all(
          imgs.map(async (i) => {
            i.loading = "eager";
            try {
              await i.decode();
            } catch {}
          }),
        );
        return imgs.filter((i) => !i.naturalWidth).map((i) => i.src);
      });
      assert.deepEqual(broken, []);
      checks.push({ route, width, pass: true });
      if (route === "/") {
        await page.screenshot({
          path: `artifacts/screenshots/release-hero-${width}.png`,
        });
        await page.$eval(".about-teaser", (e) =>
          e.scrollIntoView({ block: "center" }),
        );
        await new Promise((r) => setTimeout(r, 700));
        await page.mouse.move(1, 1);
        await page.screenshot({
          path: `artifacts/screenshots/release-portrait-${width}.png`,
        });
      }
    }
  }
  assert.deepEqual(errors, []);
  await writeFile(
    "artifacts/release-report.json",
    JSON.stringify({ base, checks, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed: checks.length, errors }, null, 2));
} finally {
  await browser.close();
}
