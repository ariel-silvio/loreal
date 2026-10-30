# L'Oréal Innovation Budget 2027 · Team D

Team D's M2 deliverable for Corporate Entrepreneurship (IE Executive MBA, Prof. Daniel Medina). We act as L'Oréal Groupe's innovation team and ask the CEO to approve a €50m innovation budget for 2027.

- **Live page:** https://ariel-silvio.github.io/loreal/ (GitHub Pages, branch `main`, folder `/`)
- **Files:**

| File | What's in it | Who edits it |
|---|---|---|
| `index.html` | All the words on the slides, and the sidebar | Anyone |
| `js/data.js` | All numbers and initiative details | Anyone |
| `css/styles.css` | Brand kit colours, fonts and layout | Rarely |
| `js/app.js` | Charts, tables, slide navigation, fit to screen, light/dark switch | Only to change how the page works |
| `images/` | Scenario image and team photos | Replace a file, keeping the same name |

## The page in one minute

Eleven slides, one at a time. Readers move with the sidebar, the Previous/Next buttons, the arrow keys, or a swipe on a phone. Each slide has its own link, for example `…/loreal/#timeline`.

| # | Slide | `id` |
|---|---|---|
| 0 | The request | `start` |
| 1 | Why now | `why` |
| 2 | The concept | `concept` |
| 3 | Budget and initiatives | `budget` |
| 4 | Risk and reward | `risk` |
| 5 | Ranking | `ranking` |
| 6 | Timeline and funding | `timeline` |
| 7 | Governance and risks | `governance` |
| 8 | Reference companies | `peers` |
| 9 | Decisions | `decide` |
| 10 | Sources | `sources` |

## How to edit

Open the folder in a code editor (VS Code works well). To see the result, open `index.html` in a browser and reload after each change.

**To change words,** search for the sentence and edit it in place. Each slide is a `<section class="panel" id="…">` block, in the order of the table above.

**To change a number,** edit `js/data.js`. Don't type numbers into `index.html`. These are calculated from `DATA` and update everywhere on their own:

- the €50m total, the €25m / €15m / €10m split and the "check" line
- the 0.11% of sales and the R&D percentages
- the ranking scores and the "scenario fit = 0" result
- €3m now and €7m held

`js/data.js` holds:

- `portfolio`: the nine initiatives, with amount, horizon, M1 link, review target, risk/reward position, the five scores and the details shown when a row is clicked
- `path` and `gantt`: PRO•GO funding stages and the timeline bars and decision points
- `reviews`: the table under the timeline
- `peers`: reference companies
- `signals`: the three numbers on "Why now"
- `ns`: the two headline measures (300 subscribers, 40% repeat visits)

**To change a photo,** replace the file in `images/` with a JPG of the same name. Team photos look best square.

**To add a slide,** copy a `<section class="panel">` block, give it a new `id`, and add a matching link in the sidebar (`<div class="chapters">`). The Previous/Next buttons pick it up on their own.

**Save as PDF:** the small link at the bottom of the sidebar prints every slide on its own A4 landscape page in light colours, scaled to fit. Use "Save as PDF" in the print dialog. After changing a slide, check it still prints on one page.

**Colours, fonts and dark mode** come from the Team D Brand Kit. They're set once as variables at the top of `css/styles.css` (`--ink`, `--gold`, `--h1`…). Change a variable there, never a colour inside a rule. The light/dark button and the screen-height fitting work on their own.

## Rules for the content

These keep the page consistent with M1, the Miro board and the brand kit.

1. **Keep word for word:** the M1 challenge statement on the Concept slide.
2. **Salons are partners.** Never suggest we replace them. Say "partner salons send their professionals", never "nobody goes to the salon".
3. **Same names everywhere:** PRO•GO, Beauty Genius, Beauty Passport, Professional Products, Innovation Board, partner salons, BOLD.
4. **Every number needs a source and a year,** or a label saying it is Team D's proposal. Add new sources to the Sources slide.
5. **Boardroom language:** short sentences, decision first, no em dashes, spell out abbreviations the first time.
6. **Check the fit:** after a change, open the page on a laptop-sized window and check the slide still fits above the Previous/Next bar. If it doesn't, shorten the text.

## Working together

- **Before editing:** pull the latest version. In GitHub Desktop, use "Fetch origin" then "Pull".
- **Keep commits small,** with a clear message ("Timeline: move pilot start to Q3").
- **Tell the team in the group chat** before a big change, so two people don't rewrite the same slide at once. Two people editing the same slide or the same lines of `js/data.js` at once will conflict.
- **Check it before pushing:** open `index.html` in a browser (keep it in the folder, since it needs `css/`, `js/` and `images/`), page through all slides, try dark mode, and make the window narrow like a phone.
- `main` is what the live page shows. A push to `main` is live within a minute or two.

## Open items

- **2028 total budget:** placeholder `<!-- TEAM: confirm 2028 total budget figure -->` on the Budget slide.
- **Timeline dates:** "Q1 2027: unit and Board set up" and "Q3 2027: first results" are Team D's proposal. Confirm, or change if the team expects approval in December 2026.
- **M1 link labels:** two are not M1's top three drivers. Salon digital toolkit says "Salons as hubs in the scenario", and Branded residence partners says "Service-led living".
- **To verify:** Jean-Paul Agon's current role as Chairman. The latest source found is the 2025 annual report.
- **AI disclosure (Sources slide):** says "Figures are being checked against the sources listed". Change to "All figures were checked by Team D against the sources listed" once someone has clicked through every source.
- **Miro board:** M2 step 2 still has the old 2028 sentence and "chaired by the CEO". M1 step 4 still has "nobody goes to the salon" and the £8.5bn figure, which has no source.

## History

- The page started from Rebecca's portfolio page (`rebeccaf8/Loreal-Innovation-Portfolio-2035`). `M2_FIXES_PR.md` lists the fixes made to it and the facts checked.
- The original layout is in this repo's history at commit `b9baea8`.
- Built with the help of generative AI (Claude).
