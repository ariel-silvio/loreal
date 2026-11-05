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
| P0-5 | ~~`--gold-text: #7A5F2E`~~ superseded by P0-7. | |
| P0-6 | Short URL for the forum: `ariel-silvio.github.io/loreal/progo/` (37 chars). | Fits the 1000-character forum limit. |
| P0-7 | Team D Brand Kit v2.1 applied (claude.ai/artifact/6ceiBuZuAa5FN2s9BNm43U); it overrides the handoff's placeholder tokens (handoff §9). Colours, Bodoni Moda 500 / Jost 400–600, kit type styles (`t-label`, `t-headline`, …), square corners, no shadows, hairline borders, gold rule under headlines, `source-note` fill for the honesty note. | Ariel's instruction; handoff §9 says the kit wins. |
| P0-8 | Light theme only. Kit dark values not wired yet. | Handoff: dark mode "only if time allows". Values are in the kit when needed. |
| P0-9 | Kit items **not** used in the prototype: the "L'ORÉAL GROUPE · TEAM D" slate label and the L'Oréal logo. | Handoff §8 and §12 forbid L'Oréal marks inside the UI; the prototype is a customer-facing mock. Kit is for board/video. |
| P0-10 | Avatars stay round (`radius-pill`); the phone bezel stays rounded. | Kit allows pill for photo frames; the bezel is device chrome, not UI. |
| P0-11 | `--warn` amber added (not in kit) for "LOW confidence" chips. | Kit has positive/negative only; a third state is needed for assumption chips. Always paired with text. |
