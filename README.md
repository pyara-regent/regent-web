# Regent Technologies Website

Production website and small admin CMS for Regent Technologies, an industrial blade sharpening and tooling support company in Moratuwa, Sri Lanka.

The public site covers services, products, industries, FAQ, contact, legal pages, and an About page. The private admin area lives only under `/hidden-admin` and manages products, FAQ, and the admin profile. Public pages can render without a database by using seeded fallback content; write actions and admin pages require production services.

## Stack

- Next.js App Router with Server Components and Metadata API
- Better Auth for admin email/password authentication
- Drizzle ORM with Neon Postgres
- Cloudflare R2 presigned uploads for product images
- Resend for password reset and contact emails
- Cloudflare Turnstile for contact form protection
- Google Analytics 4 through `@next/third-parties/google`
- Dynamic sitemap, robots rules, canonical metadata, Open Graph/Twitter metadata, and JSON-LD structured data

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` and fill only the services you are testing locally. Public pages can build without a database, but admin actions require `DATABASE_URL`.

For local admin testing, point `DATABASE_URL` to a local Postgres database, run migrations, then seed the admin account. For production, replace the same `DATABASE_URL` value with Neon.

## Required Environment

Core production:

```bash
NEXT_PUBLIC_SITE_URL="https://www.regenttech.lk"
NEXT_PUBLIC_GA_MEASUREMENT_ID="optional-public-ga4-measurement-id"
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="https://www.regenttech.lk"
BETTER_AUTH_SECRET="generate-a-32-byte-or-longer-secret"
```

Local Postgres example:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/regent"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="use-a-local-32-byte-or-longer-secret"
```

Email:

```bash
RESEND_API_KEY="..."
RESEND_FROM_EMAIL="Regent Technologies <noreply@your-domain.com>"
```

Turnstile:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY="..."
TURNSTILE_SECRET_KEY="..."
```

Use both keys from the same Cloudflare Turnstile widget and add the production domain in Cloudflare. For local development, leave both Turnstile values empty to bypass the challenge. Do not set only `TURNSTILE_SECRET_KEY`; the server will reject submissions because the browser cannot produce a token without `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

Cloudflare R2:

```bash
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET="..."
R2_PUBLIC_BASE_URL="https://cdn.example.com"
```

First admin seed only:

```bash
ADMIN_EMAIL="..."
ADMIN_INITIAL_PASSWORD="..."
```

Do not commit real admin credentials or filled env files.

## SEO Coverage

- Page titles use the pattern `Page Title - Regent Technologies`.
- Public pages have canonical URLs, descriptions, Open Graph, and Twitter card metadata.
- Search and paginated product result URLs are noindexed while canonicalizing to `/products`.
- Product detail pages include Product JSON-LD and breadcrumb JSON-LD; the FAQ page includes FAQPage and breadcrumb JSON-LD; the root layout includes LocalBusiness and WebSite JSON-LD.
- Product and industry listing pages include ItemList JSON-LD that matches the visible page content.
- `/sitemap.xml` includes public static pages, industry detail pages, published product detail pages, and crawlable image sitemap entries for key page/product images.
- `/robots.txt` allows public content and blocks `/hidden-admin/` and `/api/`.
- Google Analytics loads only on public routes. `/hidden-admin`, password reset, and dashboard routes do not load the Google tag.
- Legal pages are noindexed because they are required trust content, not search landing pages, and they are intentionally left out of the sitemap.

## Database

Generate a migration after schema changes:

```bash
npm run db:generate
```

Apply migrations:

```bash
npm run db:migrate
```

Seed the initial admin, products, and FAQ:

```bash
npm run db:seed
```

The seed script is idempotent and reads the admin email/password from env. Sign-up is disabled during normal runtime.

## Admin

- Login: `/hidden-admin`
- Dashboard: `/hidden-admin/dashboard`
- Products: `/hidden-admin/dashboard/products`
- FAQ: `/hidden-admin/dashboard/faqs`
- Profile: `/hidden-admin/dashboard/profile`

Product fields:

- `name` and `description` are required.
- `slug`, `metaTitle`, and `metaDescription` auto-fill when left blank.
- Up to 3 images are supported.
- R2 uploads are available when R2 env vars are configured.

## Deployment Order

1. Add all production env vars in Vercel.
2. Run `npm run db:migrate` against Neon.
3. Run `npm run db:seed` once with admin seed env vars present.
4. Remove seed-only env vars from Vercel after the admin account exists.
5. Deploy and verify `/`, `/products`, `/industries`, `/contact`, `/faq`, and `/hidden-admin`.
6. Submit both the contact form and a product inquiry once with production Turnstile keys enabled.

## Production Review

Before release, check these routes on desktop and mobile widths:

- `/`
- `/about`
- `/services`
- `/products`
- `/products/precision-blade-sharpening`
- `/industries`
- `/industries/woodworking-industry`
- `/contact`
- `/faq`
- `/hidden-admin`
- `/hidden-admin/dashboard`

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

Do not run `npm audit fix --force` without reviewing the resulting dependency graph. This project uses narrow package overrides for vulnerable transitive packages when the direct dependencies are already on their latest compatible versions.

## END
