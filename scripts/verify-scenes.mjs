import puppeteer from "puppeteer";
import assert from "node:assert/strict";
import { readFile, readdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--no-sandbox"],
});
const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, pass: true });
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
  }
}
try {
  const disabled = await browser.newPage();
  await disabled.setViewport({ width: 1440, height: 1000 });
  await disabled.evaluateOnNewDocument(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return /webgl/i.test(type) ? null : original.call(this, type, ...args);
    };
  });
  await check("Unavailable WebGL shows the designed fallback", async () => {
    await disabled.goto(base, { waitUntil: "networkidle0" });
    await disabled.waitForFunction(() =>
      document
        .querySelector(".orbit-controls")
        ?.textContent.includes("WebGL unavailable"),
    );
    assert.equal(await disabled.$("canvas"), null);
    assert.equal(
      await disabled.$eval(
        ".orbit-poster",
        (el) => getComputedStyle(el).opacity,
      ),
      "1",
    );
  });
  await disabled.close();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.waitForSelector(".canvas-wrap canvas");
  await check("The live canvas stops when its tab is hidden", async () => {
    const other = await browser.newPage();
    await other.goto(base + "/about", { waitUntil: "networkidle0" });
    await other.bringToFront();
    await page.waitForFunction(
      () =>
        document.hidden &&
        document.querySelector(".orbital")?.dataset.running === "false",
    );
    await other.close();
    await page.bringToFront();
  });
  await check(
    "Offscreen canvas pauses and resumes without false context failure",
    async () => {
      await page.$eval(".closing-contact", (e) =>
        e.scrollIntoView({ block: "center" }),
      );
      await page.waitForFunction(
        () => document.querySelector(".orbital").dataset.running === "false",
      );
      assert.ok(await page.$(".canvas-wrap canvas"));
      await page.$eval(".hero", (e) => e.scrollIntoView({ block: "start" }));
      await page.waitForFunction(
        () => document.querySelector(".orbital").dataset.running === "true",
      );
      assert.equal(await page.$eval(".orbital", (e) => e.dataset.live), "true");
    },
  );
  await check("Context loss returns to the original poster", async () => {
    await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
    });
    await page.waitForFunction(() =>
      document
        .querySelector(".orbit-controls")
        ?.textContent.includes("WebGL unavailable"),
    );
    assert.equal(await page.$(".canvas-wrap canvas"), null);
  });
  const chunks = await readdir(".next/static/chunks");
  const heavy = [];
  for (const file of chunks.filter((x) => x.endsWith(".js"))) {
    const text = await readFile(".next/static/chunks/" + file, "utf8");
    if (text.includes("PMREMGenerator") || text.includes("WebGLRenderer"))
      heavy.push(file);
  }
  await check(
    "Content routes do not download the heavy 3D bundle",
    async () => {
      assert.ok(heavy.length);
      for (const path of [
        "/about",
        "/work",
        "/services",
        "/contact",
        "/resume",
        "/privacy",
      ]) {
        const p = await browser.newPage();
        const loaded = [];
        p.on("request", (r) => loaded.push(r.url()));
        await p.goto(base + path, { waitUntil: "networkidle0" });
        assert.equal(
          loaded.some((url) => heavy.some((file) => url.includes(file))),
          false,
          path,
        );
        assert.equal(await p.$("canvas"), null);
        await p.close();
      }
    },
  );
  await writeFile(
    "artifacts/scene-report.json",
    JSON.stringify({ results, heavyChunks: heavy }, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
  if (results.some((r) => !r.pass)) process.exitCode = 1;
} finally {
  await browser.close();
}
