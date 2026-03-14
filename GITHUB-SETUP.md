# Get all website files on GitHub (vemuyash-debug/AtletaAI)

Your repo is already connected. All files are committed. You only need to **push** using a GitHub token.

---

## 1. Create a token (one-time)

1. Open: **https://github.com/settings/tokens/new**
2. **Note:** `AtletaAI`
3. **Expiration:** 90 days (or your choice)
4. Check **repo**
5. Click **Generate token** → **Copy** the token (`ghp_...`)

---

## 2. Clear old password (if you had failed login before)

In **Terminal**, run this and press **Enter twice**:

```bash
git credential-osxkeychain erase
host=github.com
protocol=https
```

---

## 3. Push everything to GitHub

```bash
cd /Users/yashaswivemu/Downloads/WDM-Phase2/WDM-atheleta
git push -u github main --force
```

When prompted:
- **Username:** `vemuyash-debug`
- **Password:** paste your **token** (the `ghp_...` string)

---

## 4. Check GitHub

Open **https://github.com/vemuyash-debug/AtletaAI** — you should see:

- `ecommerce-website/` (src, api, public, server, etc.)
- `DEPLOY.md`
- `netlify.toml`
- `.gitignore`
- and all other project files
