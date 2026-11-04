(function () {
  const PROJECTS = (window.PROJECTS || []).slice().sort((a, b) => (b.year || 0) - (a.year || 0));
  const STATUS = { live: "Live", shipped: "Shipped", wip: "In progress", archived: "Archived" };
  const LINK_META = {
    demo: ["fa-solid fa-arrow-up-right-from-square", "demo"],
    download: ["fa-solid fa-download", "download"],
    repo: ["fa-brands fa-github", "code"],
    video: ["fa-solid fa-play", "video"],
    writeup: ["fa-solid fa-file-lines", "writeup"]
  };

  const $ = (id) => document.getElementById(id);
  const grid = $("grid"), search = $("search");
  const state = { q: "", status: "all", tag: null };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- stats ----------
  const count = (fn) => PROJECTS.filter(fn).length;
  const tags = new Set(PROJECTS.flatMap((p) => p.tags || []));
  $("stats").innerHTML = [
    [PROJECTS.length, "projects"],
    [count((p) => p.status === "live"), "live now"],
    [count((p) => p.status === "wip"), "in progress"],
    [tags.size, "technologies"]
  ].map(([n, l]) => `<div class="stat"><div class="num">${n}<em>.</em></div><div class="label">${l}</div></div>`).join("");

  // ---------- filter chips ----------
  function chip(label, pressed, data, n) {
    return `<button type="button" class="chip" aria-pressed="${pressed}" ${data}>${esc(label)}${n != null ? `<span class="n">${n}</span>` : ""}</button>`;
  }
  function renderChips() {
    const statuses = ["all", ...Object.keys(STATUS).filter((s) => count((p) => p.status === s))];
    $("status-chips").innerHTML = statuses.map((s) =>
      chip(s === "all" ? "all" : STATUS[s].toLowerCase(), state.status === s, `data-status="${s}"`,
        s === "all" ? PROJECTS.length : count((p) => p.status === s))
    ).join("");

    const tagCounts = {};
    PROJECTS.forEach((p) => (p.tags || []).forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
    $("tag-chips").innerHTML = Object.keys(tagCounts)
      .sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b))
      .map((t) => chip(t, state.tag === t, `data-tag="${esc(t)}"`))
      .join("");
  }

  // ---------- cards ----------
  function card(p) {
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([k, url]) => {
        const [icon, label] = LINK_META[k] || ["fa-solid fa-link", k];
        return `<a href="${esc(url)}" target="_blank" rel="noopener"><i class="${icon}"></i>${label}</a>`;
      }).join("");
    return `
      <article class="p-card dash-panel" id="${esc(p.slug)}" data-title="NODE: ${esc(p.slug)}">
        ${p.image ? `<div class="shot"><img src="${esc(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy"></div>` : ""}
        <div class="body">
          <span class="status ${esc(p.status)}">${STATUS[p.status] || esc(p.status)}${p.featured ? `<span class="feat">&middot; featured</span>` : ""}</span>
          <div class="top"><h3>${esc(p.name)}</h3>${p.year ? `<span class="year">${p.year}</span>` : ""}</div>
          ${p.pitch ? `<p>${esc(p.pitch)}</p>` : `<p class="pending">// writeup pending</p>`}
          ${(p.tags || []).length ? `<div class="tag-row">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
          <div class="p-links">${links}<button type="button" class="share" data-share="${esc(p.slug)}" aria-label="Copy link to ${esc(p.name)}"><i class="fa-solid fa-link"></i>share</button></div>
        </div>
      </article>`;
  }

  function matches(p) {
    if (state.status !== "all" && p.status !== state.status) return false;
    if (state.tag && !(p.tags || []).includes(state.tag)) return false;
    if (!state.q) return true;
    const hay = [p.name, p.pitch, p.slug, ...(p.tags || [])].join(" ").toLowerCase();
    return state.q.split(/\s+/).every((w) => hay.includes(w));
  }

  function render() {
    const list = PROJECTS.filter(matches);
    grid.innerHTML = list.map(card).join("");
    $("empty").hidden = list.length > 0;
    $("result-count").textContent = `${list.length} of ${PROJECTS.length} projects`;
    highlightTarget();
  }

  // ---------- deep links: projects.swikrut.com/#slug ----------
  function highlightTarget() {
    grid.querySelectorAll(".p-card.target").forEach((el) => el.classList.remove("target"));
    const slug = decodeURIComponent(location.hash.slice(1));
    if (!slug) return;
    const el = document.getElementById(slug);
    if (el && el.classList.contains("p-card")) el.classList.add("target");
  }
  function focusHash() {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (!slug) return;
    if (!document.getElementById(slug) && PROJECTS.some((p) => p.slug === slug)) {
      // the project is hidden by a filter, so clear filters first
      Object.assign(state, { q: "", status: "all", tag: null });
      search.value = "";
      renderChips(); render();
    }
    highlightTarget();
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  let toastTimer;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  // ---------- events ----------
  search.addEventListener("input", () => { state.q = search.value.trim().toLowerCase(); render(); });
  $("status-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-status]"); if (!b) return;
    state.status = b.dataset.status; renderChips(); render();
  });
  $("tag-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tag]"); if (!b) return;
    state.tag = state.tag === b.dataset.tag ? null : b.dataset.tag; renderChips(); render();
  });
  grid.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-share]"); if (!b) return;
    const url = `${location.origin}${location.pathname}#${b.dataset.share}`;
    history.replaceState(null, "", `#${b.dataset.share}`);
    highlightTarget();
    try { await navigator.clipboard.writeText(url); toast("link copied"); }
    catch { toast(url); }
  });
  window.addEventListener("hashchange", focusHash);

  $("year").textContent = new Date().getFullYear();
  renderChips(); render();
  if (location.hash) requestAnimationFrame(focusHash);
})();
