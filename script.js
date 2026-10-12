/* TechFix behaviour: nav, search, guides, wizard, checklist. Data lives in data.js */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);

  // Build an element safely (textContent only, so user input never becomes HTML)
  function el(tag, text, cls) {
    const e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }
  function list(tag, items) {
    const l = el(tag);
    items.forEach(i => l.appendChild(el("li", i)));
    return l;
  }
  function guideUrl(g) { return PAGE_OF[g.cat] + "#" + g.id; }

  // ---- Mobile navigation ----
  function initNav() {
    const btn = $("#menu-btn"), ul = $("#nav-list");
    if (!btn || !ul) return;
    btn.addEventListener("click", () => {
      const open = ul.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    const page = document.body.dataset.page;
    document.querySelectorAll("#nav-list a").forEach(a => {
      if (a.dataset.page === page) a.setAttribute("aria-current", "page");
    });
  }

  // ---- Search ----
  // Normalize: lowercase, drop punctuation, collapse spaces, trim plural "s"
  function normalize(t) {
    return t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim()
      .split(" ").filter(Boolean).map(w => w.length > 3 ? w.replace(/s$/, "") : w);
  }
  function scoreGuide(tokens, g) {
    const hay = normalize(g.title + " " + g.k + " " + g.d).join(" ");
    return tokens.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
  }
  function runSearch(raw) {
    const box = $("#results");
    if (!box) return;
    box.replaceChildren();
    const tokens = normalize(raw);
    if (!tokens.length) {
      box.appendChild(el("p", "Please type a problem first, for example “no display” or “slow”.", "msg warn"));
      return;
    }
    const hits = GUIDES.map(g => ({ g, s: scoreGuide(tokens, g) }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    if (!hits.length) {
      const m = el("p", "No guides matched your search. Try different words, or ", "msg");
      const a = el("a", "use the diagnostic wizard"); a.href = "diagnostics.html";
      m.append(a, ".");
      box.appendChild(m);
      return;
    }
    const grid = el("div", undefined, "grid two");
    hits.forEach(({ g }) => {
      const a = el("a", undefined, "card"); a.href = guideUrl(g);
      a.append(el("h3", g.title), el("span", g.d, "muted"));
      grid.appendChild(a);
    });
    box.appendChild(grid);
  }
  function initSearch() {
    const form = $("#search-form");
    if (!form) return;
    form.addEventListener("submit", e => {   // submit also handles Enter key
      e.preventDefault();
      runSearch($("#q").value);
    });
  }

  // ---- Guide pages ----
  function buildGuide(g) {
    const d = el("details"); d.id = g.id;
    d.appendChild(el("summary", g.title));
    const b = el("div", undefined, "body");
    b.append(el("p", g.d),
      el("h4", "Possible causes"), list("ul", g.c),
      el("h4", "Troubleshooting steps"), list("ol", g.s),
      el("h4", "What to observe / if the problem persists"), el("p", g.n));
    const w = el("div", undefined, "safety"); w.append(el("strong", "Safety: "), document.createTextNode(g.w));
    b.appendChild(w);
    const back = el("a", "Back to home", "btn alt"); back.href = "index.html"; back.style.marginTop = "12px";
    b.appendChild(back);
    d.appendChild(b);
    return d;
  }
  function initGuides() {
    const box = $("#guides");
    if (!box) return;
    GUIDES.filter(g => g.cat === box.dataset.cat).forEach(g => box.appendChild(buildGuide(g)));
    // Expand all / Collapse all controls
    const tools = el("div"); tools.style.cssText = "display:flex;gap:8px;margin-bottom:12px";
    [["Expand all", true], ["Collapse all", false]].forEach(([label, open]) => {
      const b = el("button", label, "btn alt"); b.type = "button";
      b.addEventListener("click", () => box.querySelectorAll("details").forEach(d => d.open = open));
      tools.appendChild(b);
    });
    box.before(tools);
    const open = id => { const d = id && document.getElementById(id); if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView(); } };
    open(location.hash.slice(1));
    window.addEventListener("hashchange", () => open(location.hash.slice(1)));
  }

  // ---- Home cards ----
  function initCards() {
    const box = $("#problem-cards");
    if (!box) return;
    PROBLEM_CARDS.forEach(([icon, title, id]) => {
      const g = GUIDES.find(x => x.id === id);
      if (!g) { console.error("Missing guide for card:", id); return; }
      const a = el("a", undefined, "card"); a.href = guideUrl(g);
      a.append(el("div", icon, "icon"), el("h3", title));
      a.firstChild.setAttribute("aria-hidden", "true");
      box.appendChild(a);
    });
  }

  // ---- Diagnostic wizard ----
  function initWizard() {
    const box = $("#wizard");
    if (!box) return;
    let path = ["start"], answers = [];   // answers = labels the user chose, shown as a trail
    function render() {
      box.replaceChildren();
      const id = path[path.length - 1], node = TREE[id];
      if (!node) {   // unexpected state: never show an undefined step
        box.appendChild(el("p", "Something went wrong with the diagnostic. Please restart.", "msg warn"));
        path = ["start"]; answers = []; box.appendChild(button("Restart Diagnosis", () => render(), "btn"));
        return;
      }
      const bar = el("div", undefined, "progress"), fill = el("div");
      fill.style.width = Math.min(100, path.length * 25) + "%"; bar.appendChild(fill);
      box.append(bar, el("p", "Step " + path.length, "muted"));
      if (answers.length) box.appendChild(el("p", "Your answers: " + answers.join(" → "), "muted"));
      const status = el("p", undefined, "msg warn"); status.hidden = true; status.setAttribute("role", "alert");
      if (node.result) {
        box.append(el("h2", node.t), el("p", node.why),
          el("p", "These are possible causes only. This tool cannot inspect your computer.", "msg"));
        const g = GUIDES.find(x => x.id === node.go);
        if (g) { const a = el("a", "Open the detailed guide", "btn"); a.href = guideUrl(g); box.appendChild(a); }
      } else {
        box.appendChild(el("h2", node.q));
        const opts = el("div", undefined, "opts");
        node.o.forEach(([label, next]) => opts.appendChild(button(label, () => choose(next, label, status))));
        box.append(opts, status);
      }
      const nav = el("div"); nav.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-top:12px";
      const back = button("Back", () => { path.pop(); answers.pop(); render(); }, "btn alt");
      back.disabled = path.length < 2;
      nav.append(back, button("Restart Diagnosis", () => { path = ["start"]; answers = []; render(); }, "btn alt"));
      box.appendChild(nav);
    }
    function choose(next, label, status) {
      if (!TREE[next]) { status.textContent = "That choice is not available. Please pick another."; status.hidden = false; return; }
      path.push(next); answers.push(label); render();
    }
    function button(label, fn, cls) { const b = el("button", label, cls || "btn"); b.type = "button"; b.addEventListener("click", fn); return b; }
    render();
  }

  // ---- Maintenance ----
  function initMaintenance() {
    const topics = $("#topics");
    if (topics) TOPICS.forEach(([t, d]) => { const c = el("div", undefined, "card"); c.append(el("h3", t), el("p", d)); topics.appendChild(c); });
    const box = $("#checklist");
    if (!box) return;
    const KEY = "techfix-checklist";
    let saved = [], storageOk = true;
    try { saved = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { storageOk = false; }
    if (!storageOk) $("#storage-note").hidden = false;
    CHECKLIST.forEach((text, i) => {
      const row = el("label", undefined, "check"), cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = saved.includes(i);
      cb.addEventListener("change", save);
      row.append(cb, el("span", text)); box.appendChild(row);
    });
    function updateCount() {
      const boxes = [...box.querySelectorAll("input")];
      $("#count").textContent = boxes.filter(c => c.checked).length + " of " + boxes.length + " done";
    }
    function save() {
      updateCount();
      if (!storageOk) return;
      const done = [...box.querySelectorAll("input")].map((c, i) => c.checked ? i : -1).filter(i => i >= 0);
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) { storageOk = false; $("#storage-note").hidden = false; }
    }
    updateCount();
    $("#reset").addEventListener("click", () => { box.querySelectorAll("input").forEach(c => c.checked = false); save(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav(); initSearch(); initGuides(); initCards(); initWizard(); initMaintenance();
  });
})();
