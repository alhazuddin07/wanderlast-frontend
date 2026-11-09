# wanderlust

Next.js 16.4.3 App Router + React 19 travel site. Destination CRUD is backed by a separate Express/Mongo service; auth uses Better Auth with MongoDB. There are no tests and no CI.

## Setup and commands

- `npm run dev` / `npm run build` / `npm run lint`; run `npx tsc --noEmit` for typechecking. The lint script is plain `eslint` with no args.
- `.env` needs `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `MONGODB_URI`. Better Auth stores users in MongoDB database `wanderlust` via `src/lib/auth.ts`.
- Destination pages and forms hardcode the API at `http://localhost:5000`; start it separately from `../../backend/wanderlust-server` with `node index.js` (that package has no dev script).
- Known pre-existing lint failure: `npm run lint` fails on the `setState`-in-effect in `EditDestinationDialog.tsx`.

## Data and auth flow

- Server pages fetch `/destinations` and `/destination/:id` with `force-dynamic` + `cache: "no-store"`; client add/edit/delete components call `POST /add-destination` and `PATCH`/`DELETE /destination/:id` directly.
- Destination records are loosely typed: IDs may be `_id` or `id`, titles may be `destination` or `name`. Keep optional fields and fallbacks (`src/types/destination.ts`, page-level interfaces).
- Auth entrypoint: `src/lib/auth.ts` → `src/app/api/auth/[...all]/route.ts`; browser helpers are in `src/lib/auth-client.ts`. `BETTER_AUTH_URL` lacks a `NEXT_PUBLIC_` prefix, so browser code falls back to same-origin.
- README is stock `create-next-app` boilerplate and points at `app/page.tsx`; the real app directory is `src/app`.

## Next.js / toolchain quirks

- `cacheComponents` and `partialPrefetching` are **off** in `next.config.ts`. Don't assume cache-components/Suspense requirements from newer Next docs unless you enable them.
- `params`/`searchParams` are Promises. Prefer generated `PageProps<'/route'>` / `LayoutProps<'/route'>` types (`.next/types/routes.d.ts`); run `npm run dev` or `npm run build` after adding a route so they exist.
- React Compiler is enabled (`reactCompiler: true`). Don't add `useMemo`/`useCallback` for pure memoization.
- Tailwind v4 is configured CSS-only in `src/app/globals.css`; there is no `tailwind.config`. It imports `shadcn/tailwind.css` from the runtime `shadcn` package, and `next.config.ts` adds the `@tailwindcss/turbopack` CSS loader.
- Headings use Prata through `font-display`; `--font-display` comes from `next/font` in `layout.tsx`. Don't add a self-referential `--font-display` to `@theme` — Tailwind drops it and headings fall back to the body font.
- shadcn (`components.json`, style `base-nova`) uses **Base UI** primitives, not Radix. Copy patterns from `src/components/ui/*`; Base UI uses a `render` prop (e.g. `<Button render={<Link ... />}>`) instead of `asChild`, and Select values can be nullable.
- Prefer installing components with `npx shadcn add <component>` and compose from `src/components/ui/*`.
- `cn` is imported from the `"cn"` package (re-exported by `@/lib/utils`). Path alias: `@/*` → `src/*`.
- App routes live in `src/app`, feature components in `src/components/{home,destination,booking}`, and shared code in `src/lib`, `src/hooks`, `src/types`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
