# Top Notch Auto Spa V1 — Private Website Preview

Static, responsive website preview prepared by Zetyl for Top Notch Auto Spa in Chicopee, Massachusetts.

## Preview locally

Open `index.html` directly in a browser or serve the folder with any static web server.

## GitHub Pages deployment

Extract the supplied V1 ZIP and upload **all extracted contents** to the repository root. Keep the `assets` directory and its subfolders intact. Then enable GitHub Pages from the `main` branch and `/ (root)` directory.

See `GITHUB-UPLOAD.md` for the exact upload structure.

## Vercel deployment

The project has no build step or external JavaScript dependencies. Import this folder into GitHub and connect the repository to Vercel. The included `vercel.json` configures clean static delivery and security headers.

## Before going live

- Confirm the Square booking URL, business hours, email and displayed service information.
- Connect the contact form to the preferred form service if direct submission is required. It currently prepares an email in the visitor's email app.
- Replace the preview disclosure only after the business approves the website.

## Structure

- `index.html` — semantic homepage and metadata
- `assets/css/styles.css` — responsive styling and motion
- `assets/js/main.js` — menu, hero depth effect, reveal effects, FAQ and form behavior
- `assets/images/` — original supplied business assets
- `vercel.json` — static hosting configuration
