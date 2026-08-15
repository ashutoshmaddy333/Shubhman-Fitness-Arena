/**
 * Motion smoke test — samples scroll-linked transforms on homepage finale + footer.
 * Run: node scripts/motion-smoke.mjs  (dev server on :3000)
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

function parseTransform(el) {
  const t = getComputedStyle(el).transform;
  if (!t || t === "none") return { x: 0, y: 0, opacity: getComputedStyle(el).opacity };
  const m = new DOMMatrix(t);
  return { x: m.m41, y: m.m42, opacity: getComputedStyle(el).opacity };
}

async function sample(page, label) {
  return page.evaluate((lbl) => {
    const parse = (el) => {
      if (!el) return null;
      const t = getComputedStyle(el).transform;
      let x = 0,
        y = 0;
      if (t && t !== "none") {
        const m = new DOMMatrix(t);
        x = m.m41;
        y = m.m42;
      }
      return {
        opacity: parseFloat(getComputedStyle(el).opacity),
        x: Math.round(x),
        y: Math.round(y),
      };
    };

    const final = document.querySelector("#final");
    const footer = document.querySelector("#footer");
    const finalLeft = final?.querySelector("[data-motion='final-left']");
    const finalRight = final?.querySelector("[data-motion='final-right']");
    const footerCols = footer ? [...footer.querySelectorAll("[data-footer-col]")] : [];

    const docTop = (el) => {
      if (!el) return -1;
      const r = el.getBoundingClientRect();
      return Math.round(r.top + window.scrollY);
    };

    return {
      label: lbl,
      scrollY: Math.round(window.scrollY),
      finalLeft: parse(finalLeft),
      finalRight: parse(finalRight),
      footerCols: footerCols.map((c, i) => ({ i, ...parse(c) })),
      footerBottom: parse(footer?.querySelector("[data-footer-bottom]")),
      footerVisible: footer ? footer.getBoundingClientRect().top < window.innerHeight : false,
      errors: window.__motionErrors ?? [],
    };
  }, label);
}

async function scrollTo(page, y) {
  const currentY = await page.evaluate(() => window.scrollY);
  const delta = y - currentY;
  const steps = Math.min(40, Math.max(8, Math.ceil(Math.abs(delta) / 120)));
  const stepDelta = delta / steps;

  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepDelta);
    await page.waitForTimeout(60);
  }

  await page.evaluate(async (target) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const goal = Math.min(Math.max(0, target), max);
    document.documentElement.scrollTop = goal;
    window.scrollTo(0, goal);
    window.dispatchEvent(new Event("scroll"));
    if (window.ScrollTrigger?.update) window.ScrollTrigger.update();
    return window.scrollY;
  }, y);

  await page.waitForTimeout(900);
}

async function main() {
  const launchOpts = { headless: true };
  try {
    var browser = await chromium.launch({ ...launchOpts, channel: "chrome" });
  } catch {
    var browser = await chromium.launch(launchOpts);
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  await page.addInitScript(() => {
    window.__motionErrors = [];
  });

  const res = await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  if (!res?.ok()) {
    console.error("FAIL: HTTP", res?.status());
    process.exit(1);
  }

  await page.waitForTimeout(2000);

  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const finalTop = await page.evaluate(() => {
    const el = document.querySelector("#final");
    if (!el) return -1;
    const r = el.getBoundingClientRect();
    return Math.round(r.top + window.scrollY);
  });
  const footerTop = await page.evaluate(() => {
    const el = document.querySelector("#footer");
    if (!el) return -1;
    const r = el.getBoundingClientRect();
    return Math.round(r.top + window.scrollY);
  });

  const samples = [];

  await scrollTo(page, 0);
  samples.push(await sample(page, "top"));

  await scrollTo(page, Math.max(0, finalTop - 200));
  samples.push(await sample(page, "approach-final"));

  await scrollTo(page, finalTop + 80);
  await page.waitForTimeout(1200);
  samples.push(await sample(page, "final-pinned"));

  await scrollTo(page, finalTop + 700);
  samples.push(await sample(page, "final-mid"));

  await scrollTo(page, finalTop + 1400);
  samples.push(await sample(page, "final-late"));

  await page.locator("#footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  samples.push(await sample(page, "footer-in-view"));

  await scrollTo(page, docHeight - 500);
  await page.waitForTimeout(800);
  samples.push(await sample(page, "page-bottom"));

  const gsapCount = await page
    .evaluate(() => {
      const g = window.gsap ?? window.GSAP;
      const st = g?.ScrollTrigger ?? window.ScrollTrigger;
      return st?.getAll?.()?.length ?? 0;
    })
    .catch(() => -1);

  await browser.close();

  const issues = [];

  if (consoleErrors.length) {
    issues.push(`Console errors (${consoleErrors.length}): ${consoleErrors.slice(0, 3).join(" | ")}`);
  }

  const finalPinned = samples.find((s) => s.label === "final-pinned");
  const finalLate = samples.find((s) => s.label === "final-late");
  const footerInView = samples.find((s) => s.label === "footer-in-view");
  const pageBottom = samples.find((s) => s.label === "page-bottom");

  if (finalPinned?.finalLeft?.opacity < 0.85 || finalPinned?.finalRight?.opacity < 0.85) {
    issues.push(
      `Final slide-in incomplete when pinned (left=${finalPinned?.finalLeft?.opacity}, right=${finalPinned?.finalRight?.opacity})`,
    );
  }
  if (finalLate?.finalLeft?.opacity > 0.15 || finalLate?.finalRight?.opacity > 0.15) {
    issues.push("Final columns still visible late in scroll track (exit animation weak/missing)");
  }
  const footerCheck = footerInView ?? pageBottom;
  if (footerCheck?.footerCols?.some((c) => c.opacity < 0.85)) {
    issues.push("Footer columns not fully revealed when footer is in view");
  }
  if (footerCheck?.footerBottom?.opacity < 0.85) {
    issues.push("Footer bottom bar not fully revealed when footer is in view");
  }

  console.log("\n=== MOTION SMOKE TEST ===");
  console.log(`URL: ${BASE}`);
  console.log(`Doc height: ${docHeight}px | Final @ ${finalTop}px | Footer @ ${footerTop}px`);
  console.log(`ScrollTriggers: ${gsapCount >= 0 ? gsapCount : "N/A (ScrollTrigger not exposed)"}`);
  console.log("\n--- Samples ---");
  for (const s of samples) {
    console.log(JSON.stringify(s, null, 0));
  }
  console.log("\n--- Verdict ---");
  if (issues.length === 0) {
    console.log("PASS: Motion appears healthy (final in/out + footer reveal).");
  } else {
    console.log("ISSUES FOUND:");
    issues.forEach((i) => console.log(" •", i));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
