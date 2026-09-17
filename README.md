# Genesis

The marketing and registration site for Genesis, a Hack Club-affiliated hackathon I'm running — "idea to startup in 48 hours," October 15-17 in Toronto. It's a single-page Next.js site with a retro/cyberpunk look, a 3D trophy sitting front and center, and an application form backed by Firebase.

## What's on it

The landing page has a hero with a live countdown, event details, the 3D trophy (built with `@react-three/fiber`/`drei`/three.js), and the usual About/Prizes/FAQ sections — all wrapped in a CRT/scanline retro theme I wanted for the vibe. There's also a `/robot` page just for fun, a standalone 3D scene where a robot's head tracks your cursor.

The application form at `/application` collects the basics (name, contact, school, shirt size, dietary needs, GitHub/LinkedIn, project idea), checks for a duplicate email before letting you submit, and writes to a Firestore `applications` collection. There's also a `/summer` waitlist page for a companion program — same idea, just an email signup writing to a separate `summerWaitlist` collection.

Stack is Next.js 15, React 19, Firebase (Firestore) for storage, Three.js for the 3D stuff, Framer Motion for animation, and Tailwind. A handful of interchangeable animated background components exist for different sections (aurora, buildings, video, noise overlay, etc.) — I was experimenting with which one looked best where.

## Running it

```bash
npm install
```

You'll need a Firebase project with Firestore turned on. Grab the web app config from Firebase Console → Project Settings → Your apps, and put it in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

`lib/firebase.js` picks these up to init the Firestore client the API routes use. Then:

```bash
npm run dev
```

and open `http://localhost:3000`. `npm run build && npm run start` for production.

## API routes

- `POST /api/submit-application` — writes a hackathon application (with a timestamp and `status: 'submitted'`) to the `applications` collection
- `GET /api/check-email?email=` — returns `{ exists: boolean }` for duplicate-email checking
- `POST /api/join-waitlist` — writes an email to the `summerWaitlist` collection
