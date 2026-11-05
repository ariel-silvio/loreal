# Decisions log (prototype)

Defaults picked where the handoff was ambiguous or not possible in this environment. Locked baseline (handoff section 1) unchanged.

## Phase 0 — Scaffold (5 Nov 2026)

**Built:** Vite 6 + React 18 + TS + Tailwind 4, HashRouter, phone frame (390 x 844 from 1024 px up) with "What you are seeing" side panel, sticky "Prototype, simulated data" banner, disclaimer footer, feedback button ("Form link coming soon" until the URL is set), Reset demo menu, self-hosted Bodoni Moda + Jost, empty S1–S7 plus placeholder Colourist/Salon/CEO routes, CI build workflow.
**Skipped:** new standalone repo, separate Actions-based Pages deploy, branch-per-phase PRs (see P0-1 to P0-3). Lighthouse not run yet (no content to measure).
**Check:** after merge to `main`, open https://ariel-silvio.github.io/loreal/progo/ on a phone; confirm the M2 page at /loreal/ still works.

| # | Decision | Why |
|---|---|---|
| P0-1 | Prototype lives in `ariel-silvio/loreal` under `progo-prototype/` (source) and `progo/` (build), not a new repo `progo-colour-plan-prototype`. | This Claude Code session can only write to `ariel-silvio/loreal` and cannot create repos. Same owner (Ariel), no teammate repo touched. Can be moved to its own repo later with `git subtree split`. |
| P0-2 | Deploy by committing the build to `progo/` on `main`, served by the existing Pages setup (branch `main`, folder `/`), instead of `actions/deploy-pages`. | Switching Pages to "GitHub Actions" source would take down the M2 board page unless the workflow also deployed it. Folder deploy needs no settings change and keeps `/loreal/` intact. |
| P0-3 | Work on branch `claude/new-session-232h31` (session-assigned) instead of `phase-0-scaffold`. | Session rule. Merge to `main` via PR when Ariel approves. |
| P0-4 | Vite 6 / Tailwind 4 / React Router 6 pinned to exact versions. | Small, stable, React 18 compatible. |
| P0-5 | `--gold-text: #7A5F2E` added for gold text on ivory/white. | `#B8975A` on white fails AA contrast for small text; the brand gold stays for fills and focus rings. |
| P0-6 | Short URL for the forum: `ariel-silvio.github.io/loreal/progo/` (37 chars). | Fits the 1000-character forum limit. |
