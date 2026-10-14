# Cosmic hero artwork

Created with the built-in imagegen tool for this portfolio. This is imagined astronomical artwork, not an observational image or a labeled scientific representation.

Delivery assets:

- `/Users/macbookpro/projects/portfolio/public/media/cosmos/milky-way.webp`
- `/Users/macbookpro/projects/portfolio/public/media/cosmos/milky-way-mobile.webp`

The mobile version is smaller, and both use WebP. Hero composition, variation names, angles, and image positions are centrally editable in `content/cosmos.ts`. The stars, comets, eclipse, orbit, and signal waves are code-generated layers in `components/hero-cosmos.tsx`. Motion pauses offscreen and in hidden tabs, follows reduced-motion and simplified-visuals preferences, and has a local pause control. No new WebGL context or video is used.

## Final generation prompt

> Use case: stylized-concept
> Asset type: panoramic background plate for the heroes of a premium software engineer portfolio named Orbital Engineering Studio. The established brand is near-black, warm silver, desaturated forest green and a very restrained pale chartreuse glow.
> Primary request: an exquisite cinematic Milky Way seen in deep outer space, intricate fine stars and luminous dusty filaments, with extraordinary realistic astronomical depth. Wide panoramic horizontal composition. The main galactic river rises diagonally from the lower center towards the upper right and bends gently into a luminous warm-silver core near 75 percent across and 40 percent down. Leave the left 40 percent and bottom edges predominantly black and spacious for website typography. Dense detail on the right, very fine pinprick stars. Very dark near-black void, muted sage haze, icy silver starlight and a touch of pale gold. Museum quality long-exposure space photography meets restrained cinematic concept art. Rich texture, deep shadow, delicate luminous cloud structure, premium and believable. Make the galaxy itself the entire subject.
> Constraints: no planets, no people, no spacecraft, no bright neon, no purple or saturated blue, no circles or HUD interface graphics, no text, no symbols, no logo, no watermark. Only the galactic star field and nebular dust. Background opaque. Landscape 16:9.
