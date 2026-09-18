# Genesis

> "Idea to startup in 48 hours." October 15-17, Toronto.

That's the pitch for Genesis, a Hack Club-affiliated hackathon, and this repo is its marketing and registration site — a single-page Next.js app with a retro/cyberpunk look, a 3D trophy front and center, and an application form backed by Firebase.

- Hero with live countdown, event details, a 3D trophy (`@react-three/fiber`/`drei`/three.js), About/Prizes/FAQ, all in a CRT/scanline theme
- `/robot` — a standalone 3D scene where a robot's head tracks your cursor, just for fun
- `/application` — collects the basics, blocks duplicate emails, writes to Firestore `applications`
- `/summer` — a waitlist signup for a companion program, writes to `summerWaitlist`
- A handful of interchangeable animated backgrounds (aurora, buildings, video, noise) — still figuring out which looks best where

Stack: Next.js 15, React 19, Firebase (Firestore), Three.js, Framer Motion, Tailwind.

## Run it

```bash
npm install
```

Need a Firebase project with Firestore. Grab the web app config (Console → Project Settings → Your apps) into `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

```bash
npm run dev
```

Open `http://localhost:3000`.

## API routes

- `POST /api/submit-application` — writes a hackathon application to `applications`
- `GET /api/check-email?email=` — `{ exists: boolean }` for duplicate-email checking
- `POST /api/join-waitlist` — writes an email to `summerWaitlist`
