# Genesis

The marketing and registration site for **Genesis**, a Hack Club-affiliated hackathon ("idea to startup in 48 hours") held October 15–17 in Toronto. It's a Next.js single-page marketing site with a retro/cyberpunk visual theme, a 3D trophy centerpiece, an application form backed by Firebase, and a companion "Summer" program waitlist page.

## Features

- **Landing page** (`app/page.js`) — hero section with a live countdown timer, event details (date/location), an interactive 3D trophy (`components/TrophyCube.js`, via `@react-three/fiber`/`@react-three/drei`/`three`), About, Prizes, and FAQ sections, all under a retro CRT/scanline visual theme
- **Application form** (`/application`) — collects applicant details (name, contact, school, T-shirt size, dietary needs, GitHub/LinkedIn, project idea), checks for a duplicate email before submitting, and shows loading/success screens
- **Firestore-backed submissions** — `POST /api/submit-application` writes applications to the `applications` Firestore collection; `GET /api/check-email` queries that collection to prevent duplicate signups
- **Summer program waitlist** (`/summer`) — a standalone email signup page; `POST /api/join-waitlist` writes entries to the `summerWaitlist` Firestore collection
- **Robot demo page** (`/robot`) — a standalone 3D scene (`components/Robot.js`) where a robot's head follows the cursor
- **Animated backgrounds** — several interchangeable background components (`AuroraBackground`, `BuildingsBackground`, `SmoothBackground`, `VideoBackground`, `AnimatedBackground`, `NoiseOverlay`) for different pages/sections

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Firebase](https://firebase.google.com/) (Firestore, client SDK) for application/waitlist storage
- [Three.js](https://threejs.org/) via `@react-three/fiber` and `@react-three/drei` for the 3D trophy and robot scenes
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Tailwind CSS 4](https://tailwindcss.com/)
- `react-slick` / `slick-carousel` for carousels
- `react-icons`

## Project Structure

```
app/
  page.js                        # Landing page (hero, about, prizes, FAQ)
  application/page.js             # Hackathon application form
  summer/page.js                  # Summer program waitlist signup
  robot/page.js                   # 3D robot cursor-follow demo
  api/
    submit-application/route.js   # POST — writes to Firestore "applications"
    check-email/route.js          # GET  — checks for a duplicate application email
    join-waitlist/route.js        # POST — writes to Firestore "summerWaitlist"
components/                       # Section, background, and 3D components
lib/
  firebase.js                     # Firebase app/Firestore client initialization
```

## Getting Started

### Prerequisites

- Node.js (a recent LTS version)
- A Firebase project with Firestore enabled

### Install

```bash
npm install
```

### Configure environment variables

Create `.env.local` with your Firebase web app config (Firebase Console → Project Settings → General → Your apps):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

These are read by `lib/firebase.js` to initialize the Firestore client used by the API routes.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## API

| Route | Method | Purpose |
|---|---|---|
| `/api/submit-application` | POST | Writes a hackathon application (with `submittedAt` timestamp and `status: 'submitted'`) to the `applications` Firestore collection |
| `/api/check-email` | GET (`?email=`) | Returns `{ exists: boolean }` — whether an application with that email already exists |
| `/api/join-waitlist` | POST (`{ email }`) | Writes an email to the `summerWaitlist` Firestore collection |
