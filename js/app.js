/* Team D dashboard: page behaviour.
   Draws the tables and charts from js/data.js, runs the slide navigation, fits each slide to the
   screen and handles the light/dark switch. Words live in index.html, numbers in js/data.js. */
const HC = {H1:"var(--h1)",H2:"var(--h2)",H3:"var(--h3)"};
const $ = (s) => document.querySelector(s);
const el = (tag, attrs = {}, text) => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; };
const fmt = new Intl.NumberFormat("en");
const eur = (m) => "€" + fmt.format(m) + "m";

/* derived figures */
const total = DATA.portfolio.reduce((a, x) => a + x.eur, 0);
const byH = ["H1","H2","H3"].map((h) => { const r = DATA.portfolio.filter((x) => x.h === h); return {h, eur: r.reduce((a, x) => a + x.eur, 0), n: r.length}; });
const share = (total / DATA.peers.find((p) => p.us).rev * 100).toFixed(2) + "%";
const p27 = DATA.path[0];
const K = {total: eur(total), share, released: eur(p27.released), held: eur(p27.eur - p27.released), path: eur(DATA.path.reduce((a, x) => a + x.eur, 0)), subs: fmt.format(DATA.ns[0].v[0]), repeat: DATA.ns[1].v[0] + "%"};
document.querySelectorAll("[data-k]").forEach((n) => { if (K[n.dataset.k]) n.textContent = K[n.dataset.k]; });

/* 1 signals */
DATA.signals.forEach((s) => { const d = el("div", {class: "signal"}); d.append(el("b", {}, s.fig), el("p", {}, s.text), el("span", {class: "source"}, s.src)); $("#signals").appendChild(d); });

/* 3 budget and initiatives */
byH.forEach((x, i) => { const seg = el("span", {class: "b" + (i + 1)}, `${x.h} · ${eur(x.eur)}`); seg.style.flex = String(x.eur); $("#bar").appendChild(seg); });
$("#bar").setAttribute("aria-label", "Budget by horizon: " + byH.map((x) => `${x.h} ${HZ[x.h].name} ${eur(x.eur)}`).join(", "));
$("#check").textContent = byH.map((x) => eur(x.eur)).join(" + ") + " = " + eur(total);
byH.forEach((x) => {
  const hr = el("tr", {class: "hzrow " + x.h.toLowerCase()}), td = el("td", {colspan: 2});
  td.append(el("b", {}, `${x.h} · ${HZ[x.h].name}`), el("span", {}, HZ[x.h].why));
  hr.append(td, el("td", {class: "n"}, eur(x.eur)), el("td"));
  hr.lastChild.appendChild(el("b", {}, `${x.n} initiatives`));
  $("#initrows").appendChild(hr);
  DATA.portfolio.filter((p) => p.h === x.h).forEach((p) => {
    const tr = el("tr", {class: "irow"}), t1 = el("td"), btn = el("button", {type: "button", class: "ibtn", "aria-expanded": "false", "aria-controls": "d-" + p.id}, p.name);
    t1.appendChild(btn);
    if (p.role) t1.appendChild(el("span", {class: "tag"}, p.role));
    tr.append(t1, el("td", {class: "m1"}, p.m1), el("td", {class: "n"}, eur(p.eur)), el("td", {}, p.gate));
    const dr = el("tr", {class: "drow", id: "d-" + p.id, hidden: ""}), dc = el("td", {colspan: 4}), dl = el("dl");
    [["Customer problem", p.problem], ["What we fund", p.what], ["KPI", p.kpi], ["Innovation type", p.type], ["Run by", p.owner]].concat(p.hedge ? [["Why a hedge", p.hedge]] : [])
      .forEach(([k, v]) => { const d = el("div"); d.append(el("dt", {}, k), el("dd", {}, v)); dl.appendChild(d); });
    dc.appendChild(dl); dr.appendChild(dc);
    const toggle = () => { const open = dr.hidden;
      if (open) document.querySelectorAll("#initrows tr.drow:not([hidden])").forEach((o) => { o.hidden = true; const r = o.previousElementSibling; r.classList.remove("open"); r.querySelector(".ibtn").setAttribute("aria-expanded", "false"); });
      dr.hidden = !open; btn.setAttribute("aria-expanded", String(open)); tr.classList.toggle("open", open); fit(); };
    btn.addEventListener("click", toggle);
    tr.addEventListener("click", (e) => { if (e.target !== btn) toggle(); });
    $("#initrows").append(tr, dr);
  });
});

DATA.reviews.forEach((r) => {
  const tr = el("tr"), d = el("td", {class: "when"});
  d.append(el("b", {}, "◆ "), document.createTextNode(`${r.when} · ${r.dec}`));
  tr.append(d, el("td", {}, r.pass), el("td", {class: "n"}, r.money));
  $("#rvrows").appendChild(tr);
});

/* 4 risk and reward */
const NS = "http://www.w3.org/2000/svg";
const svgEl = (t, a, txt) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (txt != null) e.textContent = txt; return e; };
const zoomOf = (n) => { const p = n.closest(".panel"); return p && p.style.zoom ? parseFloat(p.style.zoom) : 1; };
function drawMatrix() {
  const svg = $("#mx"), tip = $("#tip");
  if (!svg.getClientRects().length) return;
  svg.replaceChildren();
  const L = 40, T = 14, W = 660, H = 370, x = (v) => L + v * W, y = (v) => T + H - v * H;
  svg.append(svgEl("rect", {x: L, y: T, width: W, height: H, fill: "none", stroke: "var(--hairline)"}),
    svgEl("line", {x1: x(.5), x2: x(.5), y1: T, y2: T + H, stroke: "var(--hairline)", "stroke-dasharray": "4 4"}),
    svgEl("line", {x1: L, x2: L + W, y1: y(.5), y2: y(.5), stroke: "var(--hairline)", "stroke-dasharray": "4 4"}));
  [["Safe bets", L + 10, T + 24, "start"], ["Big bets", L + W - 10, T + 24, "end"], ["Quick wins", L + 10, T + H - 12, "start"], ["Rethink", L + W - 10, T + H - 12, "end"]]
    .forEach(([t, a, b, an]) => svg.appendChild(svgEl("text", {x: a, y: b, "text-anchor": an, fill: "var(--muted)", "font-family": "var(--serif)", "font-style": "italic", "font-size": 18}, t)));
  const ax = (t, a, b, an, rot) => svg.appendChild(svgEl("text", {x: a, y: b, "text-anchor": an, fill: "var(--muted)", "font-size": 12, "letter-spacing": "1.6", transform: rot ? `rotate(-90 ${a} ${b})` : ""}, t));
  ax("RISK →", x(.5), T + H + 32, "middle"); ax("LOW", L, T + H + 32, "start"); ax("HIGH", L + W, T + H + 32, "end"); ax("REWARD →", 16, y(.5), "middle", true);
  const labels = [];
  DATA.portfolio.slice().sort((a, b) => b.eur - a.eur).forEach((p) => {
    const cx = x(p.risk), cy = y(p.rew), r = 9 + Math.sqrt(p.eur) * 6;
    const g = svgEl("g", {tabindex: 0, role: "img", "aria-label": `${p.name}, ${p.h}, ${eur(p.eur)}`});
    const c = svgEl("circle", {cx, cy, r, fill: HC[p.h], "fill-opacity": .85, stroke: "var(--paper)", "stroke-width": 2});
    g.appendChild(c);
    const t = svgEl("text", {fill: "var(--ink)", "font-size": 15, "font-weight": 600}, `${p.short} · ${eur(p.eur)}`);
    t._spot = {cx, cy, r};
    g.appendChild(t); labels.push(t);
    const show = () => {
      c.setAttribute("stroke", "var(--ink)"); c.setAttribute("fill-opacity", 1);
      tip.replaceChildren(el("span", {class: "label"}, `${p.h} · ${HZ[p.h].name} · ${eur(p.eur)}`), el("b", {}, p.name), el("span", {}, "Link to M1: " + p.m1), el("span", {}, "Review target: " + p.gate));
      tip.hidden = false;
      const box = $("#mxbox"), sr = svg.getBoundingClientRect(), br = box.getBoundingClientRect(), k = sr.width / 720, z = zoomOf(box);
      const px = (cx * k + sr.left - br.left) / z + box.scrollLeft, py = (cy * k + sr.top - br.top) / z;
      tip.style.left = Math.max(4, Math.min(px + 14, box.scrollLeft + br.width / z - tip.offsetWidth - 4)) + "px";
      tip.style.top = Math.max(4, py - tip.offsetHeight - 12) + "px";
    };
    const hide = () => { c.setAttribute("stroke", "var(--paper)"); c.setAttribute("fill-opacity", .85); tip.hidden = true; };
    g.addEventListener("mouseenter", show); g.addEventListener("focus", show);
    g.addEventListener("mouseleave", hide); g.addEventListener("blur", hide);
    svg.appendChild(g);
  });
  const circles = labels.map((n) => n._spot);
  const hit = (b, o) => b.x < o.x + o.width && o.x < b.x + b.width && b.y < o.y + o.height && o.y < b.y + b.height;
  const placed = [];
  labels.forEach((n) => {
    const {cx, cy, r} = n._spot;
    const spots = [[cx + r + 5, cy + 5, "start"], [cx - r - 5, cy + 5, "end"], [cx, cy - r - 6, "middle"], [cx, cy + r + 16, "middle"], [cx + r + 5, cy - r, "start"], [cx - r - 5, cy - r, "end"], [cx + r + 5, cy + r + 10, "start"], [cx - r - 5, cy + r + 10, "end"]];
    // score each spot: outside the frame is worst, then overlaps with labels and bubbles; keep the lowest
    let best = null, bestScore = Infinity, bestSpot = spots[0];
    for (const sp of spots) {
      n.setAttribute("x", sp[0]); n.setAttribute("y", sp[1]); n.setAttribute("text-anchor", sp[2]);
      const b = n.getBBox();
      const inside = b.x >= L + 2 && b.x + b.width <= L + W - 2 && b.y >= T + 2 && b.y + b.height <= T + H - 2;
      const score = (inside ? 0 : 100) + placed.filter((o) => hit(b, o)).length * 10 + circles.filter((c) => hit(b, {x: c.cx - c.r, y: c.cy - c.r, width: 2 * c.r, height: 2 * c.r})).length;
      if (score < bestScore) { bestScore = score; best = b; bestSpot = sp; if (score === 0) break; }
    }
    n.setAttribute("x", bestSpot[0]); n.setAttribute("y", bestSpot[1]); n.setAttribute("text-anchor", bestSpot[2]);
    placed.push(best);
  });
}

/* 5 ranking */
const W = DEF.slice();
const score = (p, w) => { const tw = w.reduce((a, b) => a + b, 0) || 1; return Math.round(p.sc.reduce((a, v, i) => a + v * w[i], 0) / tw * 10); };
const ranked = (w) => DATA.portfolio.map((p) => ({p, s: score(p, w)})).sort((a, b) => b.s - a.s);
function drawWeights() {
  const box = $("#weights"); box.replaceChildren(el("span", {class: "label"}, "Weights, 0 to 5"));
  CRIT.forEach((n, i) => {
    const d = el("div", {class: "wt"}), lab = el("label", {for: "w" + i}, n), v = el("span", {}, String(W[i]));
    lab.appendChild(v);
    const inp = el("input", {type: "range", id: "w" + i, min: 0, max: 5, step: 1, value: W[i]});
    inp.oninput = () => { W[i] = +inp.value; v.textContent = inp.value; drawRank(); };
    d.append(lab, inp); box.appendChild(d);
  });
  const btns = el("div", {class: "btns"});
  const a = el("button", {class: "btn", type: "button"}, "Our weights"); a.onclick = () => { DEF.forEach((v, i) => W[i] = v); drawWeights(); drawRank(); };
  const b = el("button", {class: "btn", type: "button"}, "Scenario fit = 0"); b.onclick = () => { NOFIT.forEach((v, i) => W[i] = v); drawWeights(); drawRank(); };
  btns.append(a, b); box.appendChild(btns);
}
function drawRank() {
  const r = ranked(W), list = $("#rank"); list.replaceChildren();
  r.forEach((v, i) => {
    const li = el("li"), nm = el("span", {class: "nm"}), trk = el("span", {class: "trk"}), fl = el("span", {class: "fl"});
    fl.style.width = v.s + "%"; fl.style.background = HC[v.p.h]; trk.appendChild(fl);
    nm.append(el("span", {}, v.p.name), trk);
    li.append(el("span", {class: "pos"}, String(i + 1)), nm, el("span", {class: "sc"}, String(v.s))); list.appendChild(li);
  });
  const v = $("#verdict"); v.replaceChildren();
  if (r[0].p.id === "progo") v.append(el("span", {class: "ok"}, "PRO•GO ranks first"), document.createTextNode(` with these weights: ${r[0].s} against ${r[1].s} for ${r[1].p.name}.`));
  else v.textContent = `${r[0].p.name} ranks first with these weights: ${r[0].s} against ${r[1].s} for ${r[1].p.name}.`;
}
drawWeights(); drawRank();
const nf = ranked(NOFIT);
$("#robust").textContent = nf[0].p.id === "progo"
  ? `With fit to our scenario set to zero, PRO•GO still ranks first (${nf[0].s} against ${nf[1].s}). The ranking does not depend on our own scenario.`
  : `With fit to our scenario set to zero, ${nf[0].p.name} ranks first.`;

/* 6 timeline and funding: a simple Gantt chart */
(function drawGantt() {
  const svg = $("#gantt"), G = DATA.gantt;
  const LX = 130, RX = 992, TOP = 44, LANE = 54, U = (RX - LX) / 20;
  // 2027-2030 by quarter (16 units), 2031-2035 compressed into 4 units
  const t = ([yr, q]) => yr <= 2030 ? (yr - 2027) * 4 + (q - 1) : 16 + ((yr - 2031) * 4 + (q - 1)) / 20 * 4;
  const X = (u) => LX + u * U;
  const bottom = TOP + G.lanes.length * LANE;
  // header: years, quarters for 2027-2030, shaded alternate years
  [2027, 2028, 2029, 2030].forEach((yr, i) => {
    if (i % 2 === 0) svg.appendChild(svgEl("rect", {x: X(i * 4), y: TOP - 4, width: 4 * U, height: bottom - TOP + 8, fill: "var(--ivory)"}));
    svg.appendChild(svgEl("text", {x: X(i * 4 + 2), y: 16, "text-anchor": "middle", fill: "var(--ink)", "font-size": 14, "font-weight": 600}, String(yr)));
    for (let q = 0; q < 4; q++) svg.appendChild(svgEl("text", {x: X(i * 4 + q + .5), y: 34, "text-anchor": "middle", fill: "var(--muted)", "font-size": 10}, "Q" + (q + 1)));
  });
  svg.appendChild(svgEl("text", {x: X(18), y: 16, "text-anchor": "middle", fill: "var(--ink)", "font-size": 14, "font-weight": 600}, "2031–2035"));
  svg.appendChild(svgEl("line", {x1: X(16), x2: X(16), y1: 4, y2: bottom + 4, stroke: "var(--hairline)"}));
  // lanes and bars
  const onBar = {H1: "var(--on-h1)", H2: "#111111", H3: "var(--on-h3)"};
  G.lanes.forEach((ln, i) => {
    const y = TOP + i * LANE;
    svg.appendChild(svgEl("line", {x1: 0, x2: RX, y1: y + LANE, y2: y + LANE, stroke: "var(--hairline)"}));
    svg.appendChild(svgEl("text", {x: 0, y: y + LANE / 2 + 5, fill: "var(--ink)", "font-size": 14, "font-weight": 600}, ln.label));
    ln.bars.forEach((b) => {
      const x1 = X(t(b.from)), x2 = X(t(b.to) + 1), bh = b.money ? 40 : 30, by = y + (LANE - bh) / 2;
      svg.appendChild(svgEl("rect", {x: x1 + 1.5, y: by, width: x2 - x1 - 3, height: bh, fill: HC[ln.h], "fill-opacity": b.faded ? .25 : 1}));
      const clip = "c" + Math.round(x1) + i; const cp = svgEl("clipPath", {id: clip}); cp.appendChild(svgEl("rect", {x: x1 + 4, y: by, width: x2 - x1 - 8, height: bh})); svg.appendChild(cp);
      const col = b.faded ? "var(--ink)" : onBar[ln.h];
      svg.appendChild(svgEl("text", {x: x1 + 8, y: by + (b.money ? 16 : 19), fill: col, "font-size": 12, "font-weight": 600, "clip-path": `url(#${clip})`}, b.text));
      if (b.money) svg.appendChild(svgEl("text", {x: x1 + 8, y: by + 32, fill: col, "font-size": 11, "clip-path": `url(#${clip})`}, b.money));
    });
  });
  // decisions: a diamond and a dashed line through every lane
  const dy = bottom + 22;
  svg.appendChild(svgEl("text", {x: 0, y: dy + 5, fill: "var(--gold-text)", "font-size": 12, "font-weight": 600, "letter-spacing": "1.2"}, "DECISIONS"));
  G.decisions.forEach((d, i) => {
    const x = X(t([d.at[0], Math.floor(d.at[1])]) + (d.at[1] % 1));
    svg.appendChild(svgEl("line", {x1: x, x2: x, y1: TOP - 4, y2: dy - 8, stroke: "var(--gold-text)", "stroke-dasharray": "3 4", "stroke-width": 1.2}));
    svg.appendChild(svgEl("rect", {x: x - 6, y: dy - 6, width: 12, height: 12, fill: "var(--gold-text)", transform: `rotate(45 ${x} ${dy})`}));
    svg.appendChild(svgEl("text", {x, y: dy + 24 + (i % 2) * 16, "text-anchor": "middle", fill: "var(--ink)", "font-size": 12, "font-weight": 500}, d.text));
  });
  svg.setAttribute("viewBox", `0 0 1000 ${dy + 48}`);
})();

/* 9 peers */
const rmax = Math.max(...DATA.peers.map((p) => p.rd / p.rev));
DATA.peers.slice().sort((a, b) => b.rd / b.rev - a.rd / a.rev).forEach((p) => {
  const tr = el("tr", p.us ? {class: "us"} : {});
  const ib = el("span", {class: "ib"}), bar = el("i"); bar.style.width = (p.rd / p.rev / rmax * 64) + "px"; ib.append(bar, el("span", {}, (p.rd / p.rev * 100).toFixed(1) + "%"));
  [[p.company], [p.period], [p.cur + fmt.format(p.rev) + "m", "n"], [p.cur + fmt.format(p.rd) + "m", "n"], [ib, "n"], [p.where]].forEach(([v, cls]) => {
    const td = el("td", cls ? {class: cls} : {}); if (v instanceof Node) td.appendChild(v); else td.textContent = v; tr.appendChild(td);
  });
  $("#peerrows").appendChild(tr);
});

/* fit: on screens 768px and wider, scale the open page down (to 75% at most) so it fits above the pager */
const MINZ = .75;
function fit() {
  const p = panels[cur]; if (!p) return;
  p.style.zoom = ""; p.style.width = ""; p.style.maxWidth = "";
  if (innerWidth < 768) return;
  const nav = innerWidth < 1024 ? document.querySelector(".nav").offsetHeight : 0;
  const avail = innerHeight - document.querySelector(".pager").offsetHeight - nav - 4;
  if (p.getBoundingClientRect().height <= avail) return;
  const apply = (z) => { p.style.zoom = z.toFixed(3); p.style.maxWidth = (1060 / z) + "px"; return p.getBoundingClientRect().height <= avail; };
  let lo = MINZ, hi = 1;
  if (apply(lo)) { for (let k = 0; k < 7; k++) { const mid = (lo + hi) / 2; if (apply(mid)) lo = mid; else hi = mid; } }
  apply(lo);
  if (ids[cur] === "risk") drawMatrix();
}

/* light / dark switch: follows the device until the reader chooses; the choice is remembered on this browser */
const darkOS = matchMedia("(prefers-color-scheme: dark)");
const theme = () => document.documentElement.dataset.theme || (darkOS.matches ? "dark" : "light");
function syncTheme() {
  const next = theme() === "dark" ? "light" : "dark", label = next === "dark" ? "Dark mode" : "Light mode";
  document.querySelectorAll(".themebtn").forEach((b) => {
    b.setAttribute("aria-label", "Switch to " + label.toLowerCase());
    const t = b.querySelector("span"); if (t) t.textContent = label;
  });
}
document.querySelectorAll(".themebtn").forEach((b) => b.addEventListener("click", () => {
  const t = theme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("td-theme", t); } catch (e) {}
  syncTheme();
}));
darkOS.addEventListener("change", syncTheme);
syncTheme();

/* panels: one at a time, routed by the address hash */
const panels = [...document.querySelectorAll(".panel")];
const ids = panels.map((p) => p.id);
const titles = Object.fromEntries([...document.querySelectorAll("#chapters a")].map((a) => [a.getAttribute("href").slice(1), a.lastChild.textContent.trim()]));
let cur = -1;
function show(id, focus) {
  const i = Math.max(0, ids.indexOf(id));
  if (i === cur) return;
  cur = i;
  panels.forEach((p, j) => p.hidden = j !== i);
  document.querySelectorAll("#chapters a").forEach((a) => {
    const on = a.getAttribute("href") === "#" + ids[i];
    a.classList.toggle("on", on);
    if (on) { a.setAttribute("aria-current", "page"); const ch = $("#chapters"); if (ch.scrollWidth > ch.clientWidth) ch.scrollLeft = a.offsetLeft - ch.offsetLeft - ch.clientWidth / 2 + a.offsetWidth / 2; }
    else a.removeAttribute("aria-current");
  });
  $("#prev").disabled = i === 0; $("#next").disabled = i === ids.length - 1;
  $("#prevt").textContent = i > 0 ? titles[ids[i - 1]] : "";
  $("#nextt").textContent = i < ids.length - 1 ? titles[ids[i + 1]] : "";
  $("#count").textContent = `${i + 1} / ${ids.length}`;
  $("#prog").style.width = (i / (ids.length - 1) * 100) + "%";
  window.scrollTo(0, 0);
  if (ids[i] === "risk") drawMatrix();
  fit();
  panels[i].querySelectorAll("img").forEach((im) => { if (!im.complete) im.addEventListener("load", fit, {once: true}); else if (im.decode) im.decode().then(fit, () => {}); });
  if (focus) panels[i].focus({preventScroll: true});
}
const go = (d) => { const n = cur + d; if (n >= 0 && n < ids.length) location.hash = ids[n]; };
addEventListener("hashchange", () => show(location.hash.slice(1), true));
$("#prev").onclick = () => go(-1);
$("#next").onclick = () => go(1);
addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, select, textarea")) return;
  if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(1); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
});
let tx = null, ty = 0;
addEventListener("touchstart", (e) => { if (e.target.closest("input, .tw, .mx, .chapters")) { tx = null; return; } tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, {passive: true});
addEventListener("touchend", (e) => {
  if (tx == null) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
  if (Math.abs(dx) > 70 && Math.abs(dx) > 2 * Math.abs(dy)) go(dx < 0 ? 1 : -1);
}, {passive: true});
/* save as PDF: show every slide in light colours while the print dialog is open */
let printTheme = null;
const PAGE_H = 700; // A4 landscape page height at 96 dpi, less 10 mm margins and a little room
function beforePrint() {
  if (printTheme !== null) return;
  const root = document.documentElement;
  printTheme = root.dataset.theme || "";
  root.dataset.theme = "light";
  root.classList.add("printing");
  panels.forEach((p) => { p.hidden = false; p.style.zoom = ""; p.style.maxWidth = ""; });
  drawMatrix();
  // scale each slide so it fits one page (never below 60%)
  panels.forEach((p) => {
    if (p.getBoundingClientRect().height <= PAGE_H) return;
    const ok = (z) => { p.style.zoom = z.toFixed(3); return p.getBoundingClientRect().height <= PAGE_H; };
    let lo = .6, hi = 1;
    if (ok(lo)) { for (let k = 0; k < 7; k++) { const mid = (lo + hi) / 2; if (ok(mid)) lo = mid; else hi = mid; } }
    ok(lo);
  });
}
function afterPrint() {
  if (printTheme === null) return;
  if (printTheme) document.documentElement.dataset.theme = printTheme; else delete document.documentElement.dataset.theme;
  printTheme = null;
  document.documentElement.classList.remove("printing");
  panels.forEach((p, j) => { p.hidden = j !== cur; p.style.zoom = ""; });
  if (ids[cur] === "risk") drawMatrix();
  fit();
}
addEventListener("beforeprint", beforePrint);
addEventListener("afterprint", afterPrint);
document.querySelectorAll("#printbtn").forEach((b) => b.addEventListener("click", () => window.print()));

let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(fit, 120); });
/* refit if the open page grows later (an image or font arriving) */
if ("ResizeObserver" in window) {
  let rt; const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => {
    const p = panels[cur]; if (!p || innerWidth < 768) return;
    const nav = innerWidth < 1024 ? document.querySelector(".nav").offsetHeight : 0;
    if (p.getBoundingClientRect().height > innerHeight - document.querySelector(".pager").offsetHeight - nav) fit();
  }, 80); });
  panels.forEach((p) => ro.observe(p));
}
if (document.fonts) document.fonts.ready.then(fit);
addEventListener("load", fit);
show(location.hash.slice(1) || "start", false);
