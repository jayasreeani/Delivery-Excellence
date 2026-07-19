# Jayasree Kuniyil — Portfolio

Executive AI delivery portfolio for **Jayasree Kuniyil**.

## Local preview

```bash
cd jayasree-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

### GitHub Pages (recommended)

The workflow `publish-portfolio-gh-pages.yml` already publishes this folder to the **`gh-pages`** branch.

Enable Pages once in the GitHub repo:

1. Open **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Branch: **`gh-pages`** / folder: **`/`** (root) → Save

Live URL after enabling:

`https://jayasreeani.github.io/Delivery-Excellence/`

(Alternative: Source = **GitHub Actions**, then re-run `deploy-portfolio-pages.yml`.)

### Vercel

```bash
export VERCEL_TOKEN=your_token
./jayasree-portfolio/deploy.sh production
```

Or import the `jayasree-portfolio` directory in the Vercel dashboard.
