# Push full code to GitHub (vemuyash-debug/AtletaAI)

Your repo **vemuyash-debug/AtletaAI** on GitHub only has one file because the full project was never pushed to it. Run these commands in your terminal to push everything.

## 1. Add the GitHub repo as a remote

```bash
cd /Users/yashaswivemu/Downloads/WDM-Phase2/WDM-atheleta

git remote add github https://github.com/vemuyash-debug/AtletaAI.git
```

(If you get "remote github already exists", use:  
`git remote set-url github https://github.com/vemuyash-debug/AtletaAI.git`)

## 2. Push your full code to that repo

The repo on GitHub already has one commit (vite.config.ts). Your local repo has the full project. To replace the GitHub history with your full project, use:

```bash
git push -u github main --force
```

**What this does:** Sends your entire local `main` branch (all folders: ecommerce-website/, src/, api/, etc.) to **vemuyash-debug/AtletaAI**. The `--force` is needed because the two histories don’t match.

## 3. Refresh GitHub

Open https://github.com/vemuyash-debug/AtletaAI — you should see the full project: `ecommerce-website/`, `DEPLOY.md`, `netlify.toml`, etc.

---

**Optional:** Commit the Netlify config first so it’s included in the push:

```bash
git add netlify.toml
git commit -m "Add Netlify config"
git push -u github main --force
```
