This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Notemaster – Next.js Frontend

A minimalistic note-taking frontend app with:

- User registration/log in with JWT
- Create, edit, delete, and list notes
- Responsive, modern UI<br>
- REST API integration with the backend
 
## Getting Started

First, install dependencies and set the backend API URL:

**Environment variable:** Create a `.env.local` at the root with:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```
Replace the value to your backend deployment URL if needed.

Then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Project Structure

All code is under `src/` using Next.js App Router. Main files:
- `components/` React components (notes list, header, auth form)
- `context/AuthContext.tsx` Authentication state, hooks
- `utils/api.ts` Handles API calls & JWT
- `app/` Entry points/routes
 
## Customization

- Colors: see `tailwind.config.js` for primary/secondary/accent color overrides.
- Change backend API root via `NEXT_PUBLIC_BACKEND_URL`.


## Deploy

Deploy on Vercel or similar — set the environment variable for backend API root URL in production.
