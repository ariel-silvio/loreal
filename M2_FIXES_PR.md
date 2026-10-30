# M2 fixes: scenario wording, pilot tranches, budget note, sources, hedge, governance, AI disclosure

> **Update:** `index.html` in this repo has since been replaced by the slide dashboard (it was `dashboard.html`). The fixes below describe the original portfolio page, kept in this repo's history at commit `b9baea8`.

Base: `rebeccaf8/Loreal-Innovation-Portfolio-2035` @ `9480322` (`index.html`, still one file).

## Changes made
1. **Scenario text**: replaced "nobody “goes to the salon” anymore…" with "more and more care happens at home: partner salons send their certified professionals to the customer, and care now covers health as well as looks." The rest of the paragraph is unchanged.
2. **Pilot budget, Option A**: the €10m allocation stays. The 2027 funding-path stage and the PRO•GO detail now say €3m is released at the start and €7m only after the Q4 2027 gate. Totals, budget bar and bubble sizes are unchanged.
3. **Budget after 2027**: replaced the `.rdnote` 2028 line and added `<!-- TEAM: confirm 2028 total budget figure -->`. No 2028 total was invented.
4. **Unsourced claims**: see the table below. Removed the UK 58% stat and the £8.5bn stat from both ticker copies.
5. **Prioritisation check**: the check holds, so the sentence was added to the `#pr` intro (result below).
6. **Hedge label**: added `hedge:true` on `subtest`. The renderer shows "Hedge" in the `.star` style. "Lead initiative" stars are unchanged. Added the hedge line to `subtest.link`.
7. **Governance safeguard**: added a ring-fence and CEO sponsor sentence to the H2 unit card.
8. **AI disclosure**: added a footer line after the student-project disclaimer. Task 4 is done, so the line uses "All figures were checked by Team D against the sources listed."

## Claims: kept with source, updated, or removed
| Claim | Result | Source |
|---|---|---|
| 64,744 branded residence units in Dubai | Kept. Label now says "H1 2026" | Morgan International Realty, *Dubai Branded Residences Report H1 2026*, as reported by Reuters on 28 Oct 2026. Only secondary coverage was found, not the report itself |
| 183 branded residence developments (b2b card) | Kept. "(H1 2026)" added | Same report. Knight Frank 2026/27 counts 175 schemes with a different method, so don't mix the two counts |
| 1.2m+ Beauty Genius conversations in the US | Kept | L'Oréal Paris USA Beauty Genius page. Company figure, page undated, accessed Oct 2026 |
| +12.6% Professional Products, H1 2026 | Kept. Label now says "like-for-like" | L'Oréal 2026 half-year results, 29 Jul 2026. Note: +12.6% is the **unadjusted** like-for-like figure. The adjusted figure is +11.6% |
| +10.9% SAPMENA–SSA, 2025 | Kept. Label now says "like-for-like" | L'Oréal 2025 URD (+6.5% reported) |
| £8.5bn beauty subscription market by 2030 | **Removed, no source found** | Closest found: GIA US$12.0bn global by 2030. Different scope and currency |
| 58% of UK hair & beauty workers self-employed | **Removed** (not relevant to Dubai) | n/a |

Every number still in the ticker now has a footer source. €1.38bn R&I was already covered by the CFO presentation.

## Task 5 check (re-run in JS on the live page)
Weights: fit 0, value 2, revenue 2, feasibility 1, speed 1. Results: PRO•GO **78**, then Beauty Genius 73, One-tap reorder 73, Salon subscription test 73, Longevity 70, B2B 67, Salon toolkit 63, Passport 60, Scanner 53. PRO•GO stays first.

## Verify-only items (not edited)
- **L'Oréal 2025 sales €44.05bn**: confirmed (2025 annual results, 12 Feb 2026).
- **R&I €1.38bn**: the 2025 URD reports €1,380m for research, innovation and technology, described as "3% of sales". The page's 3.1% is our own calculation (1.38 / 44.05). Elsewhere the URD and loreal.com round it to "€1.3bn+". Suggest labelling 3.1% as calculated, or using "about 3%".
- **Nicolas Hieronimus, CEO**: confirmed in 2026 materials (Feb 2026 CEO presentation, spring/summer 2026 shareholder letter).
- **Jean-Paul Agon, Chairman**: the latest source found is the 2025 annual report message. No 2026 source confirms or contradicts it. Check the loreal-finance.com governance page.
- **Unilever €50.5bn / €836m**: both confirmed (FY2025 results; Innovation & R&D page). Both exclude Ice Cream after the demerger.
- **Estée Lauder $14.3bn / $316m**: confirmed (FY2025 10-K and results: $14,326m sales, $316m R&D).
- **Beiersdorf €9.85bn / €365m**: confirmed (Annual Report 2025: €9,852m sales, €365m R&D, including tesa).

## Acceptance checks run (headless Chromium)
- No console or page errors in light or dark mode.
- At 375px width: `scrollWidth` = 375, so no horizontal scroll.
- Cards, H2 filter, detail panel, 9 matrix bubbles, 9-row ranking, weight slider, 6-node PRO•GO cycle and roadmap all render.
- Budget bar reads €25m / €15m / €10m.
- Search of the file: no "goes to the salon", "58% of UK" or "£8.5bn". No em dashes in added lines.
