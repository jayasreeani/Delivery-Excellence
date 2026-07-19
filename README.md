# Jayasree Kuniyil — Portfolio

Executive AI delivery portfolio for **Jayasree Kuniyil**.

## Live site

**https://jayasreeani.github.io/Delivery-Excellence/**

## Local preview

```bash
cd jayasree-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

### GitHub Pages

The workflow `publish-portfolio-gh-pages.yml` publishes this folder to the **`gh-pages`** branch.

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / **`/`** → Save

### Vercel

```bash
export VERCEL_TOKEN=your_token
./jayasree-portfolio/deploy.sh production
```
