# Muhammad Usman / Orbital Engineering Studio

A complete Next.js App Router portfolio with a procedural titanium orbital sculpture and planet core, responsive editorial layouts, and three local engineering experiments. The visual direction incorporates the owner's interest in outer space without compromising readable content.

## Run locally

Requires Node.js 20.9 or later. npm is the package manager; `package-lock.json` pins dependencies.

```sh
npm ci
npm run dev
```

The production workflow is `npm run build`, then `npm run start`. Set a port with `npm run start -- --port 3000`.

## Checks

```sh
npm run typecheck
npm test
npm run build
npm run test:browser
npm run test:scenes
npm run test:cosmos
npm run test:theme
```

The browser suite expects the production server on localhost:3000 and uses an installed Google Chrome on macOS. Override `CHROME_PATH` and `TEST_BASE_URL` for another environment. It covers routes, responsive overflow, axe accessibility, filters/history, dialogs/focus, contact states, clipboard failure, preferences, and the Lab controls. It writes its report and desktop/mobile screenshots to ignored `artifacts/`. A failing assertion is reported honestly in the report. Lighthouse results are machine-specific, not field Core Web Vitals.

## Edit content

- `content/site.ts`: name, profile, studio email, social links, education, service scope, skills, budget/timeline options, experience, portrait, personal interests, feature flags, and canonical domain.
- `content/projects.ts`: typed projects, publication state, verified facts, covers, gallery captions, case-study decisions and outcomes. Cards, filters, palette, resume, and sitemap derive from published projects.
- `content/cosmos.ts`: the hero sky compositions, galaxy crops, angles, and scene labels for all routes.
- `content/cosmos-art.md`: built-in imagegen provenance, delivery assets, and the exact generation prompt.
- `content/OWNER-CHECKLIST.md`: private factual details and assets needed before publishing more projects.
- `public/projects/`: verified website and app-store screenshots, compressed WebP delivery assets, and source originals.
- `public/media/`: the selected professional studio portrait and the retained previous portfolio portrait.
- `public/covers/`: original SVG engineering diagrams, explicitly labeled as illustrations.
- `public/fonts/`: locally hosted Space Grotesk and Manrope, each with its SIL Open Font License.
- `app/globals.css`: design tokens, responsive compositions, motion rules, and resume print styles.

Six project profiles, the founder role, employment/mentoring history, and education dates are backed by the owner’s previous portfolio and Relnov. Sources are retained with the central content. Current brand differences are explained in screenshot captions. Client metrics and awards are not fabricated. Studio projects are identified as studio work.

## Routes and interactions

Home, Work, six case studies, About, Services, Lab, Contact, Resume, Privacy, and a custom 404 are complete. Case studies have thumbnail galleries, keyboard/touch lightboxes, contents navigation, and next-project links. Work filters are stored in URL parameters; Grid/List preference is local. The command palette is accessible by its button or Cmd/Ctrl+K outside form fields. The mobile navigation and palette use native modal dialogs for focus trapping and background isolation.

The Lab includes orbital band/speed/pause controls, an educational architecture request sequence, and a working component preview with color, density, motion, and selection controls.

## Contact behavior

There is **no contact delivery provider** or inquiry endpoint. Fields remain in the current page's memory. Validation prepares an encoded email draft; the visitor opens, reviews, and sends it through their email app. Copy inquiry has real clipboard success/failure handling and a manual fallback. The site never claims a message was sent.

To add actual submission later, implement a server-only endpoint with validation, rate limiting, request limits, and provider secrets in deployment environment variables. Update the UI and Privacy page to match the real behavior. Static hosting requires a separate endpoint or a server deployment for this integration.

## Motion and performance

CSS owns simple transitions; React Three Fiber owns the sculpture. The Three.js/Fiber bundle is dynamically loaded only when a live scene is appropriate. There is one live canvas on Home or Lab, and none on content routes. Offscreen and hidden-tab rendering pauses; returning to the hero resumes its retained canvas. Context-loss listeners are removed on intentional unmount. The scene caps DPR at 1.5 and uses no real-time shadows or postprocessing. The environment is generated locally. WebGL failure or context loss uses the original SVG fallback. Mobile starts with a gently floating poster, a Pause motion control, and an explicit Activate 3D action. Desktop adds a damped cursor, bounded magnetic buttons, media tilt, and bounded parallax. Coarse pointers and reduced motion omit those effects. Scroll entrances never hide server-rendered content.

Reduced motion respects the operating system and the user's saved choice. Simplified visuals disables live 3D. Preference values and the Work view are the only local-storage data. No analytics is installed.

The header's sun/moon button switches between Dark and Light. The footer adds Dark, Light, and System choices. Dark remains the default; System follows the OS and explicit choices take priority. `mu-theme` saves the choice locally. A small head script applies it before the first paint, and storage denial leaves the toggle functional for the current page. `app/themes.css` contains the daylight palette and themed surfaces, typography, controls, dialogs, forms, image frames, and pale celestial hero art. Theme changes preserve inquiry values, paused motion, and the existing live canvas. Print output excludes theme controls. The Privacy page describes the saved preference.

`npm run test:theme` checks every light-theme route at mobile/desktop sizes, six responsive widths, contrast, keyboard controls, real preference persistence and System behavior, retained inquiry/3D state, storage denial, modal galleries/navigation, Lab colors, validation, and printing. Reports and screenshots are in ignored `artifacts/theme-report.json` and `artifacts/screenshots/light-*.png`.

Every route's hero now has a cinematic galaxy backdrop with local variations: constellations for Work and Services, an eclipse for About and Resume, an event horizon for Lab, and signal waves for Contact and Privacy. Shooting stars, slow galactic drift, foreground star shimmer, and bounded desktop pointer depth use composited CSS/SVG layers. They do not create another canvas or load Three.js on content routes. Each hero has a keyboard-accessible Pause sky control. Offscreen and hidden-tab skies pause; reduced motion and simplified visuals produce static skies. Cosmic layers are excluded from resume printing. The mobile background is about 48 KB; the larger version is about 155 KB.

`npm run test:cosmos` checks every route, image decoding, six responsive widths, accessible pause targets, 30 axe scans, native shooting-star movement, pause/resume, pointer bounds, hidden/offscreen behavior, visual preferences, printing, and content without JavaScript. Set `TEST_BASE_URL` to the preview you are testing. If port 3000 is already used, run `PORT=3077 npm run preview:static` and use `TEST_BASE_URL=http://127.0.0.1:3077`.

## Resume and assets

The resume is accessible HTML with a print stylesheet and a working Print resume control. Set `site.resumePdf` only after adding a valid, approved PDF to `public/`. The professional studio portrait is used compactly at its real available resolution. Actual project screenshots and their provenance are centrally configured; illustrative diagrams are labeled separately.

## Deploy

For a Node or compatible Next.js host, use the normal production build/start scripts. For static hosting:

```sh
npm run build:static
```

Deploy the generated `out/` folder with directory-index routing and `404.html` handling. `public/_headers` provides security header declarations for compatible static hosts. The normal Next.js server also sends these headers. Set `NEXT_PUBLIC_SITE_URL` before building to override the editable production domain. Metadata, sitemap, robots, favicon, and an original social-share PNG are included. `app/social-card.png/route.ts` generates the share image with an extension-bearing route for static-host MIME compatibility; `lib/social-card.tsx` defines its ImageResponse design and reads the central profile.

`.openai/hosting.json` retains the registered Sites project identity. Publishing uses the Sites source helper to commit/push the exact source, package the matching output, and deploy a saved version. The unrelated original GitHub remote is not overwritten. Do not store repository credentials in files.

The old application was removed as requested. A pre-rebuild backup was saved at `/private/tmp/portfolio-before-orbital-rebuild.tar.gz`; Git history was preserved.

See `VERIFICATION.md` for the actual measured results and any limits.
