# Jayasree Kuniyil — Portfolio

Executive AI delivery portfolio for **Jayasree Kuniyil**.

## Local preview

```bash
cd jayasree-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

### GitHub Pages

1. Merge this branch (or enable Pages on the branch).
2. In the repo: **Settings → Pages → Build and deployment → GitHub Actions**.
3. The workflow `.github/workflows/deploy-portfolio-pages.yml` publishes the `jayasree-portfolio/` folder.
4. Site URL: `https://jayasreeani.github.io/delivery-excellence/`

### Vercel

```bash
export VERCEL_TOKEN=your_token
./jayasree-portfolio/deploy.sh production
```

Or import the `jayasree-portfolio` directory in the Vercel dashboard.
