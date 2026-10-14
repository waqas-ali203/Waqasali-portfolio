import puppeteer from "puppeteer";
import axe from "axe-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3077";
const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setCacheEnabled(false);
const results = [],
  scans = [],
  errors = [];
const routes = [
  "/",
  "/work",
  "/about",
  "/services",
  "/lab",
  "/contact",
  "/resume",
  "/privacy",
  ...[
    "yacine-shoot",
    "ypro-viewer",
    "barkopets",
    "nubambu",
    "beauty-crown-dubai",
    "six-link-solutions",
  ].map((slug) => `/work/${slug}`),
  "/outside-theme-map",
];
page.on("pageerror", (e) => errors.push(e.message));
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, pass: true });
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
    console.log(`FAIL: ${name}: ${e.message}`);
  }
}
async function waitTheme(theme) {
  await page.waitForFunction(
    (value) => document.documentElement.dataset.theme === value,
    {},
    theme,
  );
  await page.waitForFunction(
    (value) =>
      document.querySelector(".theme-toggle")?.getAttribute("aria-label") ===
      `Switch to ${value === "light" ? "dark" : "light"} theme`,
    {},
    theme,
  );
}
async function go(route) {
  const r = await page.goto(base + route, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector(".theme-toggle");
  return r;
}
await mkdir("artifacts/screenshots", { recursive: true });
try {
  const themeFixture = await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("mu-theme", "light");
    } catch {}
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        window.__themeAtDOMContentLoaded =
          document.documentElement.dataset.theme;
      },
      { once: true },
    );
  });
  for (const width of [390, 1440, 360, 768, 1024, 2560]) {
    await page.setViewport({
      width,
      height: width < 600 ? 844 : 1000,
      deviceScaleFactor: 1,
    });
    for (const route of width === 390 || width === 1440
      ? routes
      : ["/", "/lab", "/contact"]) {
      await check(`Light ${route} at ${width}px`, async () => {
        const response = await go(route);
        await waitTheme("light");
        assert.equal(response.status(), route.includes("outside-") ? 404 : 200);
        assert.equal(
          await page.evaluate(() => window.__themeAtDOMContentLoaded),
          "light",
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 2,
          ),
          false,
        );
        assert.equal(
          await page.$eval("body", (e) => getComputedStyle(e).backgroundColor),
          "rgb(245, 244, 238)",
        );
        assert.equal(
          await page.$eval("body", (e) => getComputedStyle(e).color),
          "rgb(25, 38, 27)",
        );
        const button = await page.$eval(".theme-toggle", (e) => {
          const r = e.getBoundingClientRect();
          return {
            width: r.width,
            height: r.height,
            clickable:
              document
                .elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
                ?.closest(".theme-toggle") === e,
          };
        });
        assert.ok(button.width >= 44 && button.height >= 44);
        assert.equal(button.clickable, true);
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
        if (width === 390 || width === 1440) {
          await page.addScriptTag({ content: axe.source });
          const violations = await page.evaluate(async () => {
            const r = await window.axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
              },
            });
            return r.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            }));
          });
          scans.push({ route, width, violations });
          assert.deepEqual(violations, []);
          if (["/", "/lab", "/contact", "/about"].includes(route))
            await page.screenshot({
              path: `artifacts/screenshots/light-${route === "/" ? "home" : route.slice(1)}-${width}.png`,
            });
        }
      });
    }
  }
  await page.setViewport({ width: 1440, height: 1000 });
  await go("/contact");
  await waitTheme("light");
  await check(
    "Theme toggle works with the keyboard and preserves inquiry values",
    async () => {
      await page.type("#name", "Theme test");
      await page.focus(".theme-toggle");
      await page.keyboard.press("Space");
      await waitTheme("dark");
      assert.equal(await page.$eval("#name", (e) => e.value), "Theme test");
      await page.keyboard.press("Space");
      await waitTheme("light");
    },
  );
  await check(
    "Theme switch preserves the live cosmic pause state",
    async () => {
      await go("/lab");
      await waitTheme("light");
      await page.click(".cosmos-control");
      await page.click(".theme-toggle");
      await waitTheme("dark");
      assert.equal(
        await page.$eval(".cosmos-control", (e) =>
          e.getAttribute("aria-pressed"),
        ),
        "true",
      );
      assert.equal(
        await page.$eval(".hero-cosmos", (e) => e.dataset.running),
        "false",
      );
    },
  );
  await check("Theme switching retains the paused live 3D canvas", async () => {
    await go("/");
    await waitTheme("light");
    await page.waitForSelector(".canvas-wrap canvas");
    const canvas = await page.$(".canvas-wrap canvas");
    await page.click(".orbit-controls button");
    await page.click(".theme-toggle");
    await waitTheme("dark");
    assert.equal(
      await canvas.evaluate(
        (node) => node === document.querySelector(".canvas-wrap canvas"),
      ),
      true,
    );
    assert.equal(
      await page.$eval(".orbital", (e) => e.dataset.running),
      "false",
    );
  });
  // Remove the fixture before verifying genuine persistence and OS behavior.
  await page.removeScriptToEvaluateOnNewDocument(themeFixture.identifier);
  await check(
    "Chosen theme persists across reload and interior navigation",
    async () => {
      await page.click(".theme-toggle");
      await waitTheme("light");
      await page.reload({ waitUntil: "domcontentloaded" });
      await waitTheme("light");
      assert.equal(
        await page.evaluate(() => localStorage.getItem("mu-theme")),
        "light",
      );
      await page.click('.desktop-nav a[href^="/about"]');
      await page.waitForSelector(".about-hero");
      await waitTheme("light");
    },
  );
  await check(
    "System mode follows OS changes while explicit choice takes priority",
    async () => {
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      await page.$eval(".footer", (e) => e.scrollIntoView());
      await page.click(".theme-picker button:last-child");
      await waitTheme("light");
      assert.equal(
        await page.evaluate(() => document.documentElement.dataset.themeChoice),
        "system",
      );
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      await waitTheme("dark");
      await page.click(".theme-picker button:nth-child(2)");
      await waitTheme("light");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      await waitTheme("light");
    },
  );
  await check(
    "Light modal navigation and image gallery keep usable controls",
    async () => {
      await page.setViewport({ width: 390, height: 844 });
      await go("/work/beauty-crown-dubai");
      await waitTheme("light");
      await page.click(".menu-trigger");
      await page.waitForSelector(".mobile-menu[open]");
      await page.addScriptTag({ content: axe.source });
      let v = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          })
        ).violations.map((v) => v.id),
      );
      assert.deepEqual(v, []);
      await page.keyboard.press("Escape");
      await page.click(".gallery-open");
      await page.waitForSelector(".lightbox[open]");
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(() =>
        document
          .querySelector("#lightbox-title")
          ?.textContent.includes("Image 2"),
      );
      assert.ok(
        (await page.$eval("#lightbox-title", (e) => e.textContent)).includes(
          "Image 2",
        ),
      );
      await page.keyboard.press("Escape");
    },
  );
  await check(
    "Light Lab palette choices retain readable labels and confirmation",
    async () => {
      await go("/lab");
      await waitTheme("light");
      await page.click('button[aria-label="Glacier blue"]');
      await page.click(".preview-submit");
      await page.addScriptTag({ content: axe.source });
      const v = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          })
        ).violations.map((v) => v.id),
      );
      assert.deepEqual(v, []);
      await page.click('button[aria-label="Solar amber"]');
      await page.click(".preview-submit");
      assert.equal(
        await page.$eval(".preview-status", (e) => getComputedStyle(e).color),
        "rgb(121, 72, 23)",
      );
    },
  );
  await check(
    "Storage denial keeps theme controls working without an error",
    async () => {
      const p = await browser.newPage();
      await p.evaluateOnNewDocument(() => {
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new DOMException("Storage denied", "SecurityError");
          },
        });
      });
      await p.goto(base + "/privacy", { waitUntil: "domcontentloaded" });
      await p.waitForSelector(".theme-toggle");
      await p.click(".theme-toggle");
      await p.waitForFunction(
        () => document.documentElement.dataset.theme === "light",
      );
      await p.close();
    },
  );
  await check(
    "Light contact validation remains readable and accessible",
    async () => {
      await go("/contact");
      await waitTheme("light");
      await page.click("button[type=submit]");
      assert.equal(
        await page.$eval("#name", (e) => e.getAttribute("aria-invalid")),
        "true",
      );
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          })
        ).violations.map((v) => v.id),
      );
      assert.deepEqual(violations, []);
    },
  );
  await check(
    "Resume prints cleanly in both themes without appearance controls",
    async () => {
      await go("/resume");
      await waitTheme("light");
      await page.emulateMediaType("print");
      assert.equal(
        await page.$eval(".theme-toggle", (e) => getComputedStyle(e).display),
        "none",
      );
      assert.equal(
        await page.$eval("body", (e) => getComputedStyle(e).backgroundColor),
        "rgb(255, 255, 255)",
      );
      await page.emulateMediaType("screen");
    },
  );
  assert.deepEqual(errors, []);
  await writeFile(
    "artifacts/theme-report.json",
    JSON.stringify({ base, results, scans, errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        passed: results.filter((r) => r.pass).length,
        failed: results.filter((r) => !r.pass),
        axeScans: scans.length,
        errors,
      },
      null,
      2,
    ),
  );
  if (results.some((r) => !r.pass)) process.exitCode = 1;
} finally {
  await browser.close();
}
