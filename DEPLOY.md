# Deploy Atheleta to a public URL

## 1. Make your GitHub repo public

- Open your repo: `https://github.com/YOUR_USERNAME/WDM-atheleta`
- Go to **Settings** → **General**
- Under **Danger Zone**, click **Change visibility** → **Public**

## 2. Deploy the website (free public link)

We use **Vercel** so the site gets a URL like `https://wdm-atheleta.vercel.app`.

### One-time setup

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. Click **Add New** → **Project**.
3. **Import** your repo `WDM-atheleta` (or your repo name).
4. Set **Root Directory** to `ecommerce-website`:
   - Click **Edit** next to the root path.
   - Enter: `ecommerce-website`
5. Click **Deploy**.  
   After the build, you’ll get a public link, e.g. `https://wdm-atheleta-xxx.vercel.app`.

### Enable order confirmation emails (optional)

1. In Vercel, open your project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `RESEND_API_KEY`  
   - **Value:** your key from [resend.com/api-keys](https://resend.com/api-keys)
3. Redeploy: **Deployments** → **⋯** on the latest → **Redeploy**.

Without `RESEND_API_KEY`, the site and checkout still work; only the confirmation email is skipped.

### If the build fails on Vercel

1. **Root Directory** must be `ecommerce-website` (no leading slash). If it’s wrong, set it and redeploy.
2. **Build logs**: In Vercel, open the failed deployment → **Building** tab and check the red error.
3. **Common fixes:**
   - **"Cannot find module"** → Make sure **Root Directory** is `ecommerce-website` so `package.json` and `node_modules` are used from there.
   - **"No output"** → The build should produce a `dist` folder; the project already has `vercel.json` with `outputDirectory: "dist"`.
   - **Node version** → The repo has an `.nvmrc` with `18`; Vercel should use Node 18. In **Settings → General**, you can set **Node.js Version** to 18.x.
4. **Redeploy**: After changing **Root Directory** or settings, go to **Deployments** → **⋯** on latest → **Redeploy**.

## 3. Public link + GitHub code

- **Public site:** use the Vercel URL (e.g. `https://wdm-atheleta.vercel.app`).
- **Public code:** your GitHub repo (after you make it public) is the “source code” link.

You can add the live URL to your repo: **About** (right side) → **Website** → paste the Vercel URL.
