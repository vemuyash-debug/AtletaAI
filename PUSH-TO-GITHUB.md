# Push full code to GitHub (vemuyash-debug/AtletaAI)

Your repo on GitHub only has one file because the push failed: **Git couldn’t log in to GitHub** ("could not read Username"). Fix auth first, then push.

---

## Option A: Push from Terminal with login (recommended)

### 1. Open Terminal (outside Cursor) and run:

```bash
cd /Users/yashaswivemu/Downloads/WDM-Phase2/WDM-atheleta
git push -u github main --force
```

When Git asks for **Username**, enter your GitHub username (e.g. `vemuyash-debug`).  
When it asks for **Password**, use a **Personal Access Token**, not your GitHub password.

**Create a token:** GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**. Give it `repo` scope. Copy the token and paste it when Git asks for password.

### 2. Or use GitHub CLI (easier login):

```bash
brew install gh
gh auth login
# follow prompts, then:
cd /Users/yashaswivemu/Downloads/WDM-Phase2/WDM-atheleta
git push -u github main --force
```

---

## Option B: Use SSH instead of HTTPS

If you have SSH keys added to GitHub:

```bash
cd /Users/yashaswivemu/Downloads/WDM-Phase2/WDM-atheleta
git remote set-url github git@github.com:vemuyash-debug/AtletaAI.git
git push -u github main --force
```

---

## Option C: Upload code manually on GitHub

If push still fails:

1. On your Mac, zip the project **without** `node_modules` and `.git`:
   - In Finder, open `WDM-atheleta`, select all folders/files **except** `node_modules` and any folder named `.git`.
   - Right-click → **Compress** (or create a zip of `ecommerce-website`, `DEPLOY.md`, `netlify.toml`, `.gitignore`, etc.).

2. On GitHub: open **vemuyash-debug/AtletaAI** → **Add file** → **Upload files**.

3. Drag the zip or the main folders onto the page. Commit.

You won’t get git history, but all code will be on GitHub. For a clean repo later, you can delete everything on GitHub and push again from terminal after fixing auth.
