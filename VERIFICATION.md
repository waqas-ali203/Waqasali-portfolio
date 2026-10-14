# Portfolio verification — 12 October 2026

The portfolio was rebuilt from the supplied implementation specification, with the owner's later requests taking priority: outer-space visual direction, professional studio portrait, real project screenshots and expanded personal/studio history, a dark Curiosity section, stronger pointer effects, corrected contact actions, and public hosting.

## Actual results

- Production Next.js build: passed.
- Production static export: passed; 20 generated pages/assets, including all six case-study routes.
- TypeScript: passed (`npm run typecheck`).
- Contact unit checks: 3 passed. Required fields, length boundaries, and Unicode/punctuation-safe email draft encoding are covered.
- Browser suite: **77 passed, 0 failed**. No captured JavaScript errors, failed requests, or broken rendered images.
- Light-theme revision: **52 checks passed, 0 failed**, including all 15 public routes at 390/1440 px and representative Home/Lab/Contact layouts at 360/768/1024/2560 px. All rendered images decoded. **30 light-theme route/viewport axe scans reported no violations**; mobile navigation, the Lab's palette/confirmation states, and contact validation were also scanned. Keyboard switching, persistence across reload/navigation, System mode and explicit preference priority, saved-theme application before DOMContentLoaded, storage denial, retained inquiry values, retained paused 3D canvas and sky state, gallery keyboard controls, and print behavior were verified. The existing 77-check browser suite also passed after the controls were added.
- Cosmic hero revision: **51 checks passed** across every public page, all six case studies, the 404, and six viewport widths. Backgrounds decoded successfully, motion controls remained reachable at 44 × 44 px or larger, and 30 additional axe scans reported no violations. Keyboard pause/resume, native falling-star movement, offscreen/hidden-tab pauses, bounded pointer depth, OS motion preferences, persisted simplified visuals, print exclusion, and content without JavaScript were checked.
- Accessibility: **0 axe violations across 30 route/viewport scans**, using WCAG 2 A/AA, 2.1 AA, and 2.2 AA rules. This automated result does not replace a complete assistive-technology audit.
- WebGL checks: **5 passed**. Unsupported WebGL, hidden-tab pause, offscreen pause/resume, real context-loss fallback, and exclusion of the heavy scene bundle from content routes were verified.
- Asset verification: **19 public raster/SVG files** decoded or parsed successfully. Actual screenshots, their compressed delivery versions, and both portrait sources were inspected. A malformed ampersand in an illustrative SVG was repaired.
- After font and grain optimization, **6 focused release checks passed** on Home, About, and Contact at mobile and desktop sizes, covering font completion, overflow, image decoding, and final screenshots.

Screen widths tested: **360, 390, 768, 1024, 1280, 1440, 1920, and 2560 px**. A short 844 × 390 landscape viewport and doubled main-content text were also checked without horizontal overflow. The only scene clipping is local to decorative orbital artwork.

Functional checks cover positive and empty project filters, URL history and invalid filters, persisted Grid/List, command search/keyboard/focus restoration, engineering tabs, gallery selection and lightbox keyboard behavior, FAQ and service selection, inquiry validation, real mailto draft generation, clipboard success and denial, all three Lab experiments and resets, mobile navigation focus trapping, motion preferences, mobile 3D activation, desktop cursor modes, bounded magnetic/tilt/parallax, and mobile contact button dimensions.

## Local Lighthouse measurements

These are Lighthouse 13.5 measurements of the cosmic revision's static production preview in Chrome on this machine, before theme support was added. They were not rerun for the Light theme. They are laboratory results, not field Core Web Vitals or an uptime guarantee.

| Metric                   | Mobile (latest) | Desktop (latest) |
| ------------------------ | --------------: | ---------------: |
| Performance              |              86 |               99 |
| Accessibility            |             100 |              100 |
| Best practices           |             100 |              100 |
| SEO                      |             100 |              100 |
| Largest Contentful Paint |           3.5 s |            0.8 s |
| Total Blocking Time      |          190 ms |            70 ms |
| Cumulative Layout Shift  |               0 |                0 |

The latest measurements include the cinematic cosmic hero revision. Its initial mobile score was 77 with 450 ms TBT. Replacing animated SVG points with a small number of composited HTML star glints and reducing mobile haze animation improved the measured mobile score to 86 with 190 ms TBT. The mobile LCP still exceeds the brief's approximate 2.5 s target under Lighthouse's simulated conditions. Field INP has not been measured; TBT is not a substitute for INP. Desktop's grain rendering cost was reduced by explicitly sizing its small texture tile. Both variable fonts were reduced to the characters used by this English-language portfolio while retaining their license files and font variations.

Every hero has a generated galaxy background with a local composition: constellations, eclipses, orbital forms, or signal waves. Desktop and mobile WebP plates are 154,650 and 48,116 bytes respectively. The images were decoded and inspected in the browser. The code adds no extra WebGL canvas or video. All sky motion freezes offscreen or in hidden tabs; reduced-motion and simplified-visuals settings yield static skies. Each hero has its own pause control, and decorative layers are omitted when printing the resume. This is imagined astronomical art; its provenance and exact built-in imagegen prompt are in `content/cosmos-art.md`.

## Content and delivery boundaries

Six project profiles and the experience/education records come from the previous portfolio and Relnov. Source URLs are retained in central content. Current product brands are accurately described in alt text and captions. Beauty Crown and Six Link Solutions are studio work; sole individual authorship and measured client outcomes are not fabricated.

Contact prepares a draft or copies inquiry text. **There is no automatic email delivery provider**. The visitor reviews and sends from their email app. No inquiry is stored by this static site. The resume is printable HTML; no downloadable PDF is advertised without a supplied PDF.

The registered Sites audience is public. The intended canonical URL is `https://muhammad-usman-orbital-studio.woodsylark256.chatgpt.site`. Publication uses a fresh source checkout and the Sites helper to commit/push, build matching static output, save the archive as a version, and deploy that version. The unrelated original GitHub repository and its history are retained. The first public deployment passed 21 HTTP checks, including all case-study deep links, unknown-route 404s, and key assets. Its static hosting service does not apply the optional `_headers` file; the normal Next.js server and local preview do send those headers. The social-share asset was moved to a `.png` route so its content type is correct without header-file support. Anonymous browser rendering is rechecked after the final deployment.

## Reproduce and inspect

```sh
npm run typecheck
npm test
npm run build:static
npm run preview:static
npm run test:browser
npm run test:scenes
npm run test:cosmos
npm run test:theme
node scripts/verify-release.mjs
```

The browser scripts use installed Google Chrome; `CHROME_PATH` and `TEST_BASE_URL` are editable environment overrides. Reports and desktop/mobile screenshots are saved under ignored `artifacts/`, including `browser-report.json`, `scene-report.json`, `release-report.json`, the Lighthouse JSON files, and `screenshots/release-portrait-*.png`.

For the cosmic revision, port 3000 was found to have a separate application's IPv6 listener. The owned preview was moved to port 3077 and the checks used `TEST_BASE_URL=http://127.0.0.1:3077`. The other project was left running. Cosmic results and screenshots are stored in `artifacts/cosmic-report.json` and `artifacts/screenshots/cosmic-*.png`; current Lighthouse reports are `lighthouse-cosmic-mobile-final.json` and `lighthouse-cosmic-desktop-final.json`.

The Light-theme revision used the same isolated preview. It adds an ivory/forest-green palette, a pale celestial atlas, themed image frames/forms/dialogs/Lab surfaces, a header toggle, and Dark/Light/System choices in the footer. Default appearance remains Dark. `mu-theme` stores the choice locally, and a head script applies it before paint. No project photography is inverted; the light art treatment is scoped to the decorative galaxy. Mobile-menu entrances now animate position while keeping text fully opaque, avoiding temporary low contrast. Light screenshots and complete results are in `artifacts/screenshots/light-*.png` and `artifacts/theme-report.json`.
