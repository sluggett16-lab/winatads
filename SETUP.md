# Win at Ads — Dev Setup

## Clone & install
```bash
git clone https://github.com/sluggett16-lab/winatads.git
cd winatads
npm install
```

## Add the Dokku deploy remote
```bash
git remote add dokku dokku@172.105.104.4:winatads
```

## Add your SSH key to the server (first time on a new machine)
1. Copy your public key: `cat ~/.ssh/id_ed25519.pub` (or `id_rsa.pub`)
2. SSH in and add it:
```bash
ssh root@172.105.104.4
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
exit
```

## Run locally
```bash
npm run dev
```
Site at http://localhost:3000

## Deploy to production
```bash
git push dokku main
```
Live site: http://172.105.104.4:8080

## Environment variables (for contact form)
Contact form uses Resend. Set the API key on the server:
```bash
ssh root@172.105.104.4
dokku config:set winatads RESEND_API_KEY=your_key_here
```

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4 — uses `@theme` in `globals.css`, NO `tailwind.config.ts`
- Framer Motion v12
- Resend (email)
- Deployed via Dokku on Linode VPS

## Key files
- `app/globals.css` — theme tokens, keyframes (Tailwind v4 config lives here)
- `app/page.tsx` — assembles all sections
- `components/` — one file per section
- `app/api/contact/route.ts` — Resend email handler
