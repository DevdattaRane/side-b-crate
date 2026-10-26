# Side B

**Find your next sound.** Side B is a brutalist-inspired, interactive record shop: browse a crate of 39 songs across 13 genres, pull a vinyl from its sleeve, and drop it on the turntable for a 30-second preview.

**Live site:** [devdattarane.github.io/side-b-crate](https://devdattarane.github.io/side-b-crate/)

## Explore the crate

- Filter the collection by genre or browse it six records at a time with the box controls.
- Click a sleeve to pull its record out. The sleeve stays in the crate.
- Drag the exposed record to the turntable to load and play its preview. Use the player controls to pause or restart it.
- Turn on the ambient jazz toggle for a quiet, browser-generated chord loop.
- The layout adapts to smaller screens and supports reduced-motion preferences.

## Run locally

Requires Node.js 22 or later.

```sh
git clone https://github.com/DevdattaRane/side-b-crate.git
cd side-b-crate
npm ci
npm run dev
```

Vite prints a local URL in the terminal. To make and preview a production build:

```sh
npm run build
npm run preview
```

## Music and artwork

Side B looks up album artwork and 30-second song previews through the Apple iTunes Search API. Artwork loads as you browse each box; preview audio is streamed from the returned preview link and is not downloaded into the repository. The catalog requires an internet connection, and some tracks may not have a matching preview or artwork available.

Apple’s [iTunes Search API terms](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) apply to its preview audio and artwork. Each loaded track links to its Apple Music or iTunes listing.

## Customize the collection

In `src/main.jsx`:

- Add, remove, or edit songs in `crateCuts`. Each row is `[title, artist, genre]`.
- Add any new genre to the `genres` list so it appears as a filter.
- Change the rotating sleeve colors in `sleeveColors`.

The crate shows six records per box. Adjust `recordsPerPage` to change that amount. Update the layout, animation, and player styling in `src/style.css`.

## Deploy

GitHub Actions builds and deploys the site to GitHub Pages on every push to `main`. In the repository’s **Settings → Pages**, set the source to **GitHub Actions**. After the workflow succeeds, GitHub Pages serves the live site linked above.

## Built with

React · Vite · dnd-kit · Web Audio API
