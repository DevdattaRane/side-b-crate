# SIDE B — Find your next sound

A responsive, brutalist-inspired record crate for exploring genres. The square sleeves fan out in the crate; drag a vinyl disc (the sleeve stays in place) onto the turntable to load and play a 30-second preview. Tapping a sleeve is also supported.

## Run it

Install dependencies with `npm ci`, then run `npm run dev` for local development or `npm run build` to create the production site in `dist/`. Original album covers and song previews load from the Apple iTunes Search API, so they need an internet connection. The ambient jazz toggle generates a quiet chord loop in the browser and starts only after a click; this avoids unexpected autoplay.

Previews are streamed, not downloaded. Each loaded track links to its Apple Music/iTunes listing and the player credits iTunes. Apple's [Search API terms](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) govern use of preview audio and artwork.

## Deploy on GitHub Pages

The included workflow builds the Vite app and deploys it whenever changes reach `main`. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The first workflow run will publish the site at the Pages URL shown in the workflow summary.

## Customize the crate

Edit the `records` array in `src/main.jsx` to change the genre, track, artist, sleeve text, and sleeve color. The page looks up a matching 30-second preview when a record is selected or dropped on the player.
