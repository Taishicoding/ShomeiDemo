# Vercel setup

This is a static HTML/CSS/JavaScript site. It has no package install or build step. `vercel.json` enables clean URLs, so `hub.html` is served at `/hub`, `reveal.html` at `/reveal`, and `404.html` is the not-found page.

## Project settings

- **Root directory:** this folder (`startup-landing-page`)
- **Framework preset:** Other
- **Build command:** leave blank
- **Output directory:** `.` (the project root)
- **Install command:** leave blank

This folder is not currently a Git repository. For a Git-based deploy, initialize Git here, commit the site, push it to a Git provider, then import that repository into Vercel. Or use the Vercel CLI from this folder to deploy it directly.

## Before launch

1. Choose Git import or the Vercel CLI; sign in to Vercel.
2. Keep the root HTML/CSS/JS files and `assets/` in the deployed project root.
3. Open `/`, continue into `/hub`, open each feature, close it, and use the secret link from the hub and feature views.
4. Replace the illustrative manager-cost claim, pricing, sample records, and voting sequence with approved claims before presenting them as live product facts.

The site uses Google Fonts over the network. If that connection is unavailable, the CSS font fallbacks are used.

Vercel serves static HTML/CSS/JavaScript without a build step. See [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json) and [static builds](https://vercel.com/docs/builds).
