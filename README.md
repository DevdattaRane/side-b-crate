# SIDE B™

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ CRATE OPEN / 24-7                VOL. 001       ┃
┃ 139 CUTS  //  33 GENRES  //  ONE VERY DEEP CRATE ┃
┃ PULL A SLEEVE. DROP A RECORD. FIND YOUR SIDE B.  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

<p align="center">
  <strong>A brutalist little record shop for curious ears.</strong><br />
  Flip through the sleeves. Find a new sound. Give it thirty seconds.
</p>

<p align="center">
  <a href="https://devdattarane.github.io/side-b-crate/"><strong>↗ OPEN THE CRATE</strong></a>
  &nbsp; / &nbsp;
  <a href="https://github.com/DevdattaRane/side-b-crate/actions/workflows/pages.yml"><img alt="GitHub Pages deployment" src="https://github.com/DevdattaRane/side-b-crate/actions/workflows/pages.yml/badge.svg" /></a>
</p>

**Hard edges. Loud covers. No algorithm deciding what you should like.** Side B is a responsive, hands-on music explorer built around the familiar ritual of pulling a record and putting it on the deck.

---

## 01 / DIG IN

| **139 tracks** | **33 genres** | **6 sleeves per box** | **30-second previews** |
|:--:|:--:|:--:|:--:|
| From deep cuts to classics | Jazz to drum & bass | Flip through the crate | Drop a disc on the deck |

Filter by genre, then browse box by box. Pull a sleeve to reveal its vinyl. Drag the disc onto the turntable and the preview starts; the record slides back into its sleeve while it plays. Pause, restart, or eject it from the player.

**On a phone?** Tap a sleeve to pull the record. Press and hold the exposed disc, then drag it to the player. Swipe the genre strip to explore more styles; the crate switches to a readable two-column layout.

Flip on **play soft jazz** for a quiet chord loop generated in your browser. It starts only when you ask it to.

> **THE RITUAL**  `FILTER → PULL → DROP → LISTEN`

---

## 02 / THE SOUND SYSTEM

- **React 19** — sleeves, filters, crate boxes, and the player.
- **Vite 8** — local development and production builds.
- **dnd-kit** — drag the vinyl to the turntable, with touch input on mobile.
- **Apple iTunes Search API** — album artwork, preview links, and store listings.
- **Web Audio API** — the optional ambient-jazz loop.
- **GitHub Pages + GitHub Actions** — build and publish on pushes to `main`.

Artwork is looked up as each box is browsed; previews stream from Apple’s returned preview URL and are not stored in this repository. An internet connection is required, and a preview or cover may not be available for every track. Loaded records link to their Apple Music or iTunes listing. Apple’s [iTunes Search API terms](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) apply to its artwork and preview audio.

---

## 03 / SPIN IT LOCALLY

**You need Node.js 22 or newer.** Then drop into the repo:

```sh
git clone https://github.com/DevdattaRane/side-b-crate.git
cd side-b-crate
npm ci
npm run dev
```

Vite prints the local address. To build and preview the production version:

```sh
npm run build
npm run preview
```

---

## 04 / CHANGE THE CRATE

The collection lives in [`src/main.jsx`](src/main.jsx):

- Edit `crateCuts` to add or change tracks. Each row is `[title, artist, genre]`.
- Add each new style to `genres` to give it a filter button.
- Tune the sleeve palette in `sleeveColors`.
- Change the six-sleeve box size with `recordsPerPage`.
- Restyle the wood, type, motion, and turntable in [`src/style.css`](src/style.css).

Keep genre names in `genres` and `crateCuts` identical so the filters know where every record belongs.

---

## 05 / PUT IT ON THE INTERNET

Push to `main`. The workflow in `.github/workflows/pages.yml` installs dependencies, builds `dist/`, and deploys it to GitHub Pages. For a fresh fork, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

---

<p align="center">
  <strong>SIDE B™</strong><br />
  Built for the love of the deep cut. &nbsp; / &nbsp; Handle with care ☺
</p>
