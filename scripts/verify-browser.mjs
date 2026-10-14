import puppeteer from "puppeteer";
import axe from "axe-core";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
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
const errors = [];
const checks = [];
const screenshots = [];
const accessibility = [];
const requests = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (
    m.type() === "error" &&
    !m.text().includes("the server responded with a status of 404")
  )
    errors.push(m.text());
});
page.on("requestfailed", (r) => {
  if (
    !r.url().includes("favicon") &&
    r.failure()?.errorText !== "net::ERR_ABORTED"
  )
    requests.push({ url: r.url(), error: r.failure()?.errorText });
});
await mkdir("artifacts/screenshots", { recursive: true });
const routes = [
  "/",
  "/work",
  "/work/beauty-crown-dubai",
  "/work/yacine-shoot",
  "/work/ypro-viewer",
  "/work/barkopets",
  "/work/nubambu",
  "/work/six-link-solutions",
  "/about",
  "/services",
  "/lab",
  "/contact",
  "/resume",
  "/privacy",
  "/not-a-real-page",
];
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function go(path) {
  const res = await page.goto(base + path, { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");
  return res;
}
async function check(name, fn) {
  try {
    await fn();
    checks.push({ name, pass: true });
  } catch (e) {
    checks.push({ name, pass: false, error: e.message });
    console.log(`FAIL: ${name}: ${e.message}`);
  }
}
try {
  for (const width of [360, 390, 768, 1024, 1280, 1440, 1920, 2560]) {
    await page.setViewport({
      width,
      height: width < 600 ? 844 : 1000,
      deviceScaleFactor: 1,
    });
    for (const route of width === 390 || width === 1440
      ? routes
      : ["/", "/work", "/lab", "/contact"]) {
      const response = await go(route);
      await check(`Route ${route} at ${width}px`, async () => {
        assert.equal(
          response.status(),
          route === "/not-a-real-page" ? 404 : 200,
        );
        assert.equal(await page.$$eval("h1", (el) => el.length), 1);
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 2,
        );
        assert.equal(over, false);
        const brokenImages = await page.$$eval("img", async (images) => {
          await Promise.all(
            images.map(async (image) => {
              image.loading = "eager";
              try {
                await image.decode();
              } catch {}
            }),
          );
          return images
            .filter(
              (image) =>
                !image.complete ||
                image.naturalWidth === 0 ||
                !image.hasAttribute("alt"),
            )
            .map((image) => image.src);
        });
        assert.deepEqual(brokenImages, []);
      });
      if (width === 390 || width === 1440) {
        const file = `artifacts/screenshots/${route === "/" ? "home" : route.replaceAll("/", "-").slice(1)}-${width}.png`;
        await page.screenshot({ path: file, fullPage: true });
        screenshots.push(file);
        if (route === "/") {
          await page.screenshot({
            path: `artifacts/screenshots/hero-${width}.png`,
            fullPage: false,
          });
        }
        await page.addScriptTag({ content: axe.source });
        const result = await page.evaluate(async () =>
          window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          }),
        );
        accessibility.push({
          route,
          width,
          violations: result.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
      }
    }
  }
  await page.setViewport({ width: 1440, height: 1000 });
  await check("Unknown project returns HTTP 404", async () => {
    const r = await go("/work/not-a-project");
    assert.equal(r.status(), 404);
    assert.match(
      await page.$eval("h1", (e) => e.textContent),
      /Signal not found/,
    );
  });
  await check(
    "Filters persist in URL and browser history; empty reset works",
    async () => {
      await go("/work");
      await page.click("button.filter:nth-child(5)");
      await page.waitForFunction(() => location.search.includes("category=ai"));
      assert.match(
        await page.$eval(".work-empty", (e) => e.textContent),
        /No published/,
      );
      await page.click(".work-empty button");
      await page.waitForFunction(() => !location.search);
      assert.equal(await page.$$(".project-card").then((x) => x.length), 6);
      await page.goBack({ waitUntil: "networkidle0" });
      assert.match(page.url(), /category=ai/);
      await page.goForward({ waitUntil: "networkidle0" });
      await page.waitForFunction(() => !location.search);
      assert.equal(new URL(page.url()).search, "");
    },
  );
  await check(
    "Web, mobile, and WordPress filters show their real projects",
    async () => {
      for (const category of ["web", "mobile", "wordpress"]) {
        await go("/work?category=" + category);
        assert.equal(await page.$$(".project-card").then((x) => x.length), 2);
      }
    },
  );
  await check(
    "Pointer cursor, magnetic buttons and bounded parallax work",
    async () => {
      await go("/");
      const button = await page.$(".hero-actions .button");
      const b = await button.boundingBox();
      await page.mouse.move(b.x + b.width * 0.8, b.y + b.height * 0.6);
      await pause(150);
      assert.equal(await page.$eval("html", (e) => e.dataset.cursor), "ready");
      assert.equal(
        await page.$eval(".custom-cursor", (e) => e.dataset.mode),
        "action",
      );
      assert.ok(
        Math.abs(
          await button.evaluate((e) =>
            parseFloat(e.style.getPropertyValue("--mag-x")),
          ),
        ) <= 4,
      );
      const media = await page.$(".project-media");
      await media.evaluate((e) => e.scrollIntoView({ block: "center" }));
      const m = await media.boundingBox();
      await page.mouse.move(m.x + m.width * 0.7, m.y + m.height * 0.5);
      await pause(200);
      assert.equal(
        await page.$eval(".custom-cursor", (e) => e.dataset.mode),
        "view",
      );
      assert.ok(
        Math.abs(
          await media.evaluate((e) =>
            parseFloat(e.style.getPropertyValue("--tilt-y")),
          ),
        ) <= 2,
      );
      await page.$eval(".about-teaser", (e) =>
        e.scrollIntoView({ block: "center" }),
      );
      await pause(100);
      assert.ok(
        Math.abs(
          await page.$eval(".portrait-visual", (e) =>
            parseFloat(e.style.getPropertyValue("--scroll-shift")),
          ),
        ) <= 32,
      );
      await page.screenshot({
        path: "artifacts/screenshots/portrait-section-1440.png",
        fullPage: false,
      });
    },
  );
  await check("Invalid filters normalize safely", async () => {
    await go("/work?category=invalid");
    await page.waitForFunction(() => !location.search);
    assert.equal(await page.$$(".project-card").then((x) => x.length), 6);
  });
  await check("List preference survives reload", async () => {
    await go("/work");
    await page.click('button[aria-label="List view"]');
    assert.equal(await page.$$(".work-list article").then((x) => x.length), 6);
    await page.reload({ waitUntil: "networkidle0" });
    await page.waitForSelector(".work-list");
    await page.click('button[aria-label="Grid view"]');
  });
  await check(
    "Command search, arrow selection, empty state and focus restoration",
    async () => {
      await go("/about");
      await page.click(".command-trigger");
      await page.waitForSelector(".command-dialog[open]");
      await page.type(".command-input input", "unlikely-search");
      assert.match(
        await page.$eval(".empty-command", (e) => e.textContent),
        /No results/,
      );
      await page.focus(".command-input input");
      await page.keyboard.down("Meta");
      await page.keyboard.press("a");
      await page.keyboard.up("Meta");
      await page.keyboard.press("Backspace");
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() => document.activeElement.className),
        "command-trigger",
      );
      await page.click(".command-trigger");
      await page.waitForSelector(".command-dialog[open]");
      await page.waitForFunction(
        () => document.querySelector(".command-input input").value === "",
      );
      await page.type(".command-input input", "Beauty");
      await page.waitForFunction(() =>
        document
          .querySelector("#command-results")
          ?.textContent.includes("Beauty Crown Dubai"),
      );
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await page.waitForFunction(() =>
        location.pathname.includes("beauty-crown"),
      );
    },
  );
  await check(
    "Palette skips shortcut while entering a form field",
    async () => {
      await go("/contact");
      await page.focus("#name");
      await page.keyboard.down("Control");
      await page.keyboard.press("k");
      await page.keyboard.up("Control");
      assert.equal(await page.$(".command-dialog[open]"), null);
    },
  );
  await check("Engineering layer selection works by keyboard", async () => {
    await go("/");
    await page.focus("#layer-tab-0");
    await page.keyboard.press("ArrowRight");
    assert.equal(
      await page.$eval("#layer-tab-1", (e) => e.getAttribute("aria-selected")),
      "true",
    );
    assert.match(
      await page.$eval("#layer-panel-1", (e) => e.textContent),
      /Node.js/,
    );
  });
  await check(
    "Gallery selection and lightbox arrow/escape restore focus",
    async () => {
      await go("/work/beauty-crown-dubai");
      await page.click(".gallery-thumbnails button:nth-child(2)");
      assert.equal(
        await page.$eval(".gallery-thumbnails button:nth-child(2)", (e) =>
          e.getAttribute("aria-pressed"),
        ),
        "true",
      );
      await page.click(".gallery-open");
      await page.waitForSelector(".lightbox[open]");
      await page.keyboard.press("ArrowRight");
      assert.match(
        await page.$eval("#lightbox-title", (e) => e.textContent),
        /1 of 2/,
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() => document.activeElement.className),
        "gallery-open",
      );
    },
  );
  await check(
    "Service CTA preselects contact type and accordion updates",
    async () => {
      await go("/services");
      await page.click("#faq-button-1");
      assert.equal(
        await page.$eval("#faq-button-1", (e) =>
          e.getAttribute("aria-expanded"),
        ),
        "true",
      );
      await go("/contact?service=mobile");
      assert.equal(
        await page.$eval("#service", (e) => e.value),
        "Mobile Application",
      );
    },
  );
  await check(
    "Inquiry validates, preserves values and produces an encoded draft",
    async () => {
      await go("/contact");
      await page.type("#name", "Browser Test");
      await page.click("button[type=submit]");
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "email",
      );
      assert.equal(await page.$eval("#name", (e) => e.value), "Browser Test");
      await page.type("#email", "visitor@example.com");
      await page.type(
        "#details",
        "A responsive community web application with clear navigation.",
      );
      await page.click("button[type=submit]");
      const href = await page.$eval(
        'a[href^="mailto:"][href*="subject="]',
        (e) => e.href,
      );
      assert.match(href, /mailto:build@relnov.com/);
      assert.match(decodeURIComponent(href), /Browser Test/);
      assert.match(
        await page.$eval(".form-status", (e) => e.textContent),
        /review and send/,
      );
      assert.doesNotMatch(
        await page.$eval(".form-status", (e) => e.textContent),
        /Message sent/,
      );
    },
  );
  await check(
    "Clipboard denial gives a selectable inquiry fallback",
    async () => {
      await page.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: { writeText: () => Promise.reject(new Error("denied")) },
        }),
      );
      await page.click(".form-actions button[type=button]");
      await page.waitForSelector("#copy-inquiry-fallback");
      assert.match(
        await page.$eval("#copy-inquiry-fallback", (e) => e.value),
        /Browser Test/,
      );
    },
  );
  await check(
    "Clipboard success is reported only after resolution",
    async () => {
      await page.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: { writeText: () => Promise.resolve() },
        }),
      );
      await page.click(".form-actions button[type=button]");
      await page.waitForFunction(() =>
        document
          .querySelector(".form-status")
          ?.textContent.includes("Inquiry copied"),
      );
    },
  );
  await check(
    "Orbital controls toggle layers, speed, pause and reset",
    async () => {
      await go("/lab");
      await page.$eval("#orbit-speed", (e) => {
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        ).set;
        setter.call(e, "1.8");
        e.dispatchEvent(new Event("input", { bubbles: true }));
      });
      await page.click("#orbital input[type=checkbox]");
      assert.match(
        await page.$eval(
          "#orbital .experiment-text-status",
          (e) => e.textContent,
        ),
        /2 bands/,
      );
      await page.click("#orbital .control-buttons button:first-child");
      assert.equal(
        await page.$eval("#orbital .control-buttons button:first-child", (e) =>
          e.getAttribute("aria-pressed"),
        ),
        "true",
      );
      await page.click("#orbital .control-buttons button:last-child");
      assert.equal(await page.$eval("#orbit-speed", (e) => e.value), "1");
      assert.equal(
        await page.$$eval("#orbital input[type=checkbox]", (e) =>
          e.every((x) => x.checked),
        ),
        true,
      );
    },
  );
  await check(
    "Architecture playback completes and reset clears it",
    async () => {
      await page.select("#sample-architecture", "1");
      await page.click("#architecture .control-buttons button:first-child");
      await page.waitForFunction(
        () =>
          document
            .querySelector("#architecture .experiment-text-status")
            .textContent.includes("5 /"),
        { timeout: 8000 },
      );
      await page.click("#architecture .control-buttons button:last-child");
      assert.match(
        await page.$eval(
          "#architecture .experiment-text-status",
          (e) => e.textContent,
        ),
        /Educational example/,
      );
    },
  );
  await check(
    "Interface controls update a real component and reset",
    async () => {
      await page.click('button[aria-label="Glacier blue"]');
      await page.select("#interface-density", "compact");
      assert.equal(
        await page.$eval(".component-preview", (e) =>
          e.style.getPropertyValue("--preview-accent"),
        ),
        "#9cd9ee",
      );
      await page.click(".preview-options button:nth-child(2)");
      await page.click(".preview-submit");
      assert.match(
        await page.$eval(".preview-status", (e) => e.textContent),
        /Application selected/,
      );
      await page.click("#interface .control-buttons button");
      assert.equal(
        await page.$eval(".component-preview", (e) =>
          e.style.getPropertyValue("--preview-accent"),
        ),
        "#c5ff67",
      );
    },
  );
  await check(
    "Mobile menu traps focus, escapes and restores trigger",
    async () => {
      await page.setViewport({ width: 390, height: 844 });
      await go("/about");
      await page.click(".menu-trigger");
      await page.waitForSelector(".mobile-menu[open]");
      for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(
          () => document.activeElement.closest("dialog")?.className,
        ),
        "mobile-menu",
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() => document.activeElement.className),
        "menu-trigger",
      );
    },
  );
  await check(
    "Mobile begins with poster and reduced motion removes live canvas",
    async () => {
      await go("/");
      assert.equal(await page.$(".canvas-wrap canvas"), null);
      await page.click(".orbit-controls button:first-child");
      await page.waitForSelector(".canvas-wrap canvas");
      assert.equal(await page.$eval(".orbital", (e) => e.dataset.live), "true");
      await page.click(".orbit-controls button");
      await page.waitForFunction(
        () => document.querySelector(".orbital").dataset.running === "false",
      );
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);
      await page.setViewport({ width: 1440, height: 1000 });
      await go("/");
      assert.equal(await page.$(".canvas-wrap canvas"), null);
      assert.equal(
        await page.$eval(".custom-cursor", (e) => getComputedStyle(e).display),
        "none",
      );
      assert.equal(
        await page.$eval("html", (e) => e.dataset.motion),
        "reduced",
      );
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "no-preference" },
      ]);
    },
  );
  await check("Simplified visuals persist and disable 3D", async () => {
    await go("/");
    await page.click(".visual-preferences button:nth-child(2)");
    await page.reload({ waitUntil: "networkidle0" });
    assert.equal(await page.$(".canvas-wrap canvas"), null);
    await page.click(".visual-preferences button:nth-child(2)");
  });
  await check("Mobile portrait and contact actions stay usable", async () => {
    await page.setViewport({ width: 390, height: 844 });
    await go("/");
    await page.$eval(".about-teaser", (e) =>
      e.scrollIntoView({ block: "start" }),
    );
    await pause(700);
    await page.screenshot({
      path: "artifacts/screenshots/portrait-section-390.png",
      fullPage: false,
    });
    assert.equal(
      await page.$eval(".custom-cursor", (e) => getComputedStyle(e).display),
      "none",
    );
    await go("/contact");
    await page.$eval(".form-actions", (e) =>
      e.scrollIntoView({ block: "center" }),
    );
    const sizes = await page.$$eval(".form-actions .button", (buttons) =>
      buttons.map((e) => ({
        width: e.getBoundingClientRect().width,
        height: e.getBoundingClientRect().height,
        font: parseFloat(getComputedStyle(e).fontSize),
      })),
    );
    assert.ok(
      sizes.every((s) => s.width > 280 && s.height >= 56 && s.font >= 13),
    );
    await page.screenshot({
      path: "artifacts/screenshots/contact-actions-390.png",
      fullPage: false,
    });
  });
  await check("200% text zoom layout remains within viewport", async () => {
    await page.setViewport({ width: 768, height: 1000 });
    await go("/contact");
    await page.evaluate(() => {
      const sizes = Array.from(document.querySelectorAll("main *"))
        .filter((el) => el instanceof HTMLElement)
        .map((el) => [el, parseFloat(getComputedStyle(el).fontSize)]);
      for (const [el, size] of sizes) el.style.fontSize = `${size * 2}px`;
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 2,
      ),
      false,
    );
  });
  await check("Short landscape layout remains within viewport", async () => {
    await page.setViewport({ width: 844, height: 390 });
    await go("/");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 2,
      ),
      false,
    );
  });
  const violations = accessibility.filter((a) => a.violations.length);
  const report = {
    base,
    checks,
    accessibility,
    errors: [...new Set(errors)],
    failedRequests: requests,
    screenshots,
    passed: checks.filter((c) => c.pass).length,
    failed: checks.filter((c) => !c.pass).length,
    accessibilityPagesWithViolations: violations.length,
  };
  await writeFile(
    "artifacts/browser-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        passed: report.passed,
        failed: report.failed,
        accessibilityPagesWithViolations: violations.length,
        errors: report.errors,
        failedRequests: requests,
      },
      null,
      2,
    ),
  );
  if (
    report.failed ||
    violations.length ||
    report.errors.length ||
    requests.length
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}
