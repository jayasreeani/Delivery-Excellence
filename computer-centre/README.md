# E+++ Solutions Website

Marketing website for **E+++ Solutions** — a computer training institute and digital services centre.

## Pages

- **Home** — hero, highlights, featured services & courses
- **Services** — internet café, training, printing, repairs, exam help, kids programs
- **Courses** — course catalog with enroll CTA
- **Pricing** — hourly, student, and professional plans
- **Contact** — inquiry form, location, hours

## Run locally

```bash
cd computer-centre
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Vercel

From the `computer-centre` folder:

```bash
export VERCEL_TOKEN="your-token"
# Use the parent deploy script scoped to this folder, or:
npx vercel --prod
```

Or deploy via Vercel dashboard by pointing to the `computer-centre` directory.

## Customize

Edit contact details, course list, and pricing in `assets/js/app.js`.
