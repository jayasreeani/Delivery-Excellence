# Jayasree Kuniyil — Portfolio

Executive AI delivery portfolio for **Jayasree Kuniyil**.

**Custom domain:** `https://jayasreekuniyil.com`

## Local preview

```bash
cd jayasree-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

### GitHub Pages + custom domain

1. Site publishes from the **`gh-pages`** branch (workflow: `publish-portfolio-gh-pages.yml`).
2. `CNAME` is set to **`jayasreekuniyil.com`**.
3. In GitHub: **Settings → Pages → Custom domain** → enter `jayasreekuniyil.com` → Save → wait for DNS check → enable **Enforce HTTPS**.

### DNS records (at your domain registrar)

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jayasreeani.github.io` |

### Temporary URL (until DNS propagates)

`https://jayasreeani.github.io/Delivery-Excellence/`

### Vercel

```bash
export VERCEL_TOKEN=your_token
./jayasree-portfolio/deploy.sh production
```

Or import the `jayasree-portfolio` directory in the Vercel dashboard.
