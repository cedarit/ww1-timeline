# The Great War — Interactive Timeline

Interactive React timeline for ICSE History Chapter 10. Twelve classroom stops from Europe in 1900 to the League of Nations in 1920. Designed to be projected and walked through by a teacher.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploy to Vercel (Git-connected)

```bash
# 1. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-username>/ww1-timeline.git
git push -u origin main
```

Then on Vercel:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo
3. Vercel auto-detects Vite → click **Deploy**
4. You get `<project>.vercel.app` in ~60 seconds

Every `git push` to `main` after this auto-redeploys. The URL stays the same.

## Stack

- Vite + React 18
- lucide-react (icons)
- Google Fonts: Playfair Display + Crimson Text
- No backend, no database — fully static build

## File structure

```
ww1-timeline/
├── index.html              Entry HTML, font preload
├── package.json            Deps + scripts
├── vite.config.js          Vite config
├── vercel.json             Vercel build hints
├── .gitignore
└── src/
    ├── main.jsx            React mount
    └── App.jsx             The full timeline component
```

## Editing content

All twelve stops live in `src/App.jsx`. The `stops` array near the top of the `App` function holds the title, subtitle, teacher script, and exam note for each. Each stop's stage component is defined further down in the same file (e.g. `StopSarajevo`, `StopCascade`).
