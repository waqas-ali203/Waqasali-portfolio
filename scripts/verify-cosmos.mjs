import puppeteer from "puppeteer";
import axe from "axe-core";
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
const results = [],
  errors = [],
  accessibility = [];
const routes = [
  ["/", "home"],
  ["/work", "work"],
  ["/about", "about"],
  ["/services", "services"],
  ["/lab", "lab"],
  ["/contact", "contact"],
  ["/resume", "resume"],
  ["/privacy", "privacy"],
  ...[
    "yacine-shoot",
    "ypro-viewer",
    "barkopets",
    "nubambu",
    "beauty-crown-dubai",
    "six-link-solutions",
  ].map((slug) => [`/work/${slug}`, "case"]),
  ["/unmapped-sky", "lost"],
];
page.on("pageerror", (error) => errors.push(error.message));
page.on("requestfailed", (request) => {
  if (request.failure()?.errorText !== "net::ERR_ABORTED")
    errors.push(`${request.url()}: ${request.failure()?.errorText}`);
});
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function check(name, test) {
  try {
    await test();
    results.push({ name, pass: true });
  } catch (error) {
    results.push({ name, pass: false, error: error.message });
    console.log(`FAIL: ${name}: ${error.message}`);
  }
}
async function go(route) {
  const response = await page.goto(base + route, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  return response;
}
await mkdir("artifacts/screenshots", { recursive: true });
try {
  for (const width of [390, 1440, 360, 768, 1024, 2560]) {
    await page.setViewport({
      width,
      height: width < 600 ? 844 : 1000,
      deviceScaleFactor: 1,
    });
    for (const [route, scene] of width === 390 || width === 1440
      ? routes
      : routes.filter(([r]) => ["/", "/lab", "/services"].includes(r))) {
      await check(`Cosmic hero ${route} at ${width}px`, async () => {
        const response = await go(route);
        assert.equal(response.status(), scene === "lost" ? 404 : 200);
        assert.equal(await page.$$eval(".hero-cosmos", (els) => els.length), 1);
        assert.equal(
          await page.$eval(".hero-cosmos", (e) => e.dataset.scene),
          scene,
        );
        assert.equal(await page.$$eval("h1", (els) => els.length), 1);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 2,
          ),
          false,
        );
        const decoded = await page.$eval(".cosmos-galaxy", async (element) => {
          const url = getComputedStyle(element).backgroundImage.slice(5, -2);
          const image = new Image();
          image.src = url;
          await image.decode();
          return { width: image.naturalWidth, url };
        });
        assert.ok(decoded.width > 800);
        assert.ok(
          decoded.url.includes(
            width <= 800 ? "milky-way-mobile.webp" : "milky-way.webp",
          ),
        );
        const action = await page.$eval(".cosmos-control", (button) => {
          const box = button.getBoundingClientRect();
          return {
            height: box.height,
            width: box.width,
            clickable:
              document
                .elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
                ?.closest(".cosmos-control") === button,
          };
        });
        assert.ok(action.height >= 44 && action.width >= 44);
        assert.equal(
          action.clickable,
          true,
          "The pause button must stay reachable below navigation",
        );
        if (!["home", "lab"].includes(scene))
          assert.equal(await page.$(".canvas-wrap canvas"), null);
        if (width === 390 || width === 1440) {
          await page.addScriptTag({ content: axe.source });
          const a = await page.evaluate(async () => {
            const result = await window.axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
              },
            });
            return result.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            }));
          });
          accessibility.push({ route, width, violations: a });
          assert.deepEqual(a, []);
          if (
            [
              "home",
              "lab",
              "about",
              "contact",
              "work",
              "services",
              "resume",
            ].includes(scene)
          )
            await page.screenshot({
              path: `artifacts/screenshots/cosmic-${scene}-${width}.png`,
            });
        }
      });
    }
  }
  await page.setViewport({ width: 1440, height: 1000 });
  await go("/lab");
  await page.waitForFunction(
    () => document.querySelector(".hero-cosmos")?.dataset.running === "true",
  );
  await check(
    "Local sky pause and resume freeze every decorative animation",
    async () => {
      await page.click(".cosmos-control");
      await page.waitForFunction(
        () =>
          document.querySelector(".hero-cosmos").dataset.running === "false",
      );
      assert.equal(
        await page.$eval(".cosmos-control", (b) =>
          b.getAttribute("aria-pressed"),
        ),
        "true",
      );
      assert.equal(
        await page.$eval(
          ".cosmos-galaxy",
          (e) => getComputedStyle(e).animationPlayState,
        ),
        "paused",
      );
      const before = await page.$eval(
        ".cosmos-galaxy",
        (e) => getComputedStyle(e).transform,
      );
      await delay(250);
      assert.equal(
        await page.$eval(
          ".cosmos-galaxy",
          (e) => getComputedStyle(e).transform,
        ),
        before,
      );
      await page.focus(".cosmos-control");
      await page.keyboard.press("Space");
      await page.waitForFunction(
        () => document.querySelector(".hero-cosmos").dataset.running === "true",
      );
    },
  );
  await check("A real falling star traverses the hero", async () => {
    // Seek the native animation timeline to two points inside its visible passage.
    const movement = await page.$eval(".cosmos-comet", async (element) => {
      const a = element.getAnimations()[0];
      a.pause();
      a.currentTime = 0;
      await new Promise(requestAnimationFrame);
      const first = getComputedStyle(element).transform;
      a.currentTime = 350;
      await new Promise(requestAnimationFrame);
      const second = getComputedStyle(element).transform,
        opacity = getComputedStyle(element).opacity;
      a.play();
      return { first, second, opacity };
    });
    assert.notEqual(movement.first, movement.second);
    assert.ok(Number(movement.opacity) > 0);
  });
  await check("Sky pauses offscreen and resumes in view", async () => {
    await page.$eval(".footer", (e) => e.scrollIntoView());
    await page.waitForFunction(
      () => document.querySelector(".hero-cosmos").dataset.running === "false",
    );
    await page.$eval("h1", (e) => e.scrollIntoView({ block: "center" }));
    await page.waitForFunction(
      () => document.querySelector(".hero-cosmos").dataset.running === "true",
    );
  });
  await check("Hidden tabs stop sky animation", async () => {
    const other = await browser.newPage();
    await other.goto(base + "/privacy", { waitUntil: "networkidle0" });
    await other.bringToFront();
    await page.waitForFunction(
      () =>
        document.hidden &&
        document.querySelector(".hero-cosmos").dataset.running === "false",
    );
    await other.close();
    await page.bringToFront();
    await page.waitForFunction(
      () => document.querySelector(".hero-cosmos").dataset.running === "true",
    );
  });
  await check(
    "Pointer parallax remains bounded and returns to rest",
    async () => {
      await page.mouse.move(1435, 170);
      await delay(800);
      const shift = await page.$eval(".hero-cosmos", (e) => ({
        x: parseFloat(e.style.getPropertyValue("--sky-x")),
        y: parseFloat(e.style.getPropertyValue("--sky-y")),
      }));
      assert.ok(shift.x > 0 && shift.x <= 12);
      assert.ok(Math.abs(shift.y) <= 8);
      await page.mouse.move(100, 950);
      await delay(1000);
      const rest = await page.$eval(".hero-cosmos", (e) => ({
        x: parseFloat(e.style.getPropertyValue("--sky-x")),
        y: parseFloat(e.style.getPropertyValue("--sky-y")),
      }));
      assert.ok(Math.abs(rest.x) < 0.2 && Math.abs(rest.y) < 0.2);
    },
  );
  await check(
    "OS reduced motion removes meteors and keeps a static sky",
    async () => {
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);
      await page.waitForFunction(
        () => document.querySelector(".hero-cosmos").dataset.reduced === "true",
      );
      assert.equal(
        await page.$eval(".cosmos-meteors", (e) => getComputedStyle(e).display),
        "none",
      );
      assert.equal(
        await page.$eval(
          ".cosmos-galaxy",
          (e) => getComputedStyle(e).animationName,
        ),
        "none",
      );
      assert.equal(
        await page.$eval(".cosmos-control", (e) => e.disabled),
        true,
      );
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "no-preference" },
      ]);
    },
  );
  await check(
    "Simplified visuals persist across pages without moving sky layers",
    async () => {
      await page.$eval(".footer", (e) => e.scrollIntoView());
      await page.click(".visual-preferences button:nth-child(2)");
      await go("/contact");
      await page.waitForFunction(
        () => document.querySelector(".hero-cosmos").dataset.simple === "true",
      );
      assert.equal(
        await page.$eval(".cosmos-meteors", (e) => getComputedStyle(e).display),
        "none",
      );
      assert.equal(
        await page.$eval(".hero-cosmos", (e) => e.dataset.running),
        "false",
      );
      await page.$eval(".footer", (e) => e.scrollIntoView());
      await page.click(".visual-preferences button:nth-child(2)");
    },
  );
  await check(
    "Resume print output excludes all cosmic layers and controls",
    async () => {
      await go("/resume");
      await page.emulateMediaType("print");
      assert.equal(
        await page.$eval(".hero-cosmos", (e) => getComputedStyle(e).display),
        "none",
      );
      assert.equal(
        await page.$eval(".cosmos-control", (e) => getComputedStyle(e).display),
        "none",
      );
      await page.emulateMediaType("screen");
    },
  );
  await check(
    "Content stays readable when JavaScript is unavailable",
    async () => {
      const noJS = await browser.newPage();
      await noJS.setJavaScriptEnabled(false);
      await noJS.goto(base + "/work", { waitUntil: "networkidle0" });
      assert.equal(await noJS.$$eval("h1", (els) => els.length), 1);
      assert.ok(
        await noJS.$eval(".cosmos-galaxy", (e) =>
          getComputedStyle(e).backgroundImage.includes("milky-way"),
        ),
      );
      assert.equal(
        await noJS.$eval(".hero-cosmos", (e) => e.dataset.running),
        "false",
      );
      await noJS.close();
    },
  );
  assert.deepEqual(errors, []);
  await writeFile(
    "artifacts/cosmic-report.json",
    JSON.stringify({ base, results, accessibility, errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        passed: results.filter((r) => r.pass).length,
        failed: results.filter((r) => !r.pass),
        axeScans: accessibility.length,
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
