(function () {
  "use strict";

  const PROJECTS = window.PROJECTS || [];
  const CATS = window.CATEGORIES || {};
  const BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
  const BADGE = { new: "New", live: "Live", wip: "In progress" };

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const gh = (p) => (p.repo ? `https://github.com/${p.repo}` : null);
  const isPublic = (p) => p.repo && !p.private;
  const hasReleases = (p) => isPublic(p) && p.releases;
  const hasDownloads = (p) => hasReleases(p) || !!p.download;

  const state = { cat: "all", q: "" };

  // ------------------------------------------------------------ pieces
  function cover(p, big) {
    const badge = p.badge ? `<span class="badge ${p.badge}">${BADGE[p.badge]}</span>` : "";
    if (p.image) {
      return `<div class="cover">${badge}<img src="${esc(p.image)}" alt="" loading="${big ? "eager" : "lazy"}"></div>`;
    }
    return `<div class="cover gen" style="--a:${esc(p.accent || "#38bdf8")}">${badge}<i class="${esc(p.icon || "fa-solid fa-cube")}" aria-hidden="true"></i></div>`;
  }

  function card(p) {
    const icons = [
      hasDownloads(p) ? `<i class="fa-solid fa-download" title="Download available"></i>` : "",
      p.demo ? `<i class="fa-solid fa-globe" title="Live version"></i>` : "",
      isPublic(p) ? `<i class="fa-brands fa-github" title="Open source"></i>` : ""
    ].join("");
    return `
      <a class="card" href="#/${esc(p.slug)}">
        ${cover(p)}
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.tagline)}</p>
          <div class="card-foot"><span class="platform">${esc(p.platform)}</span><span class="card-icons">${icons}</span></div>
        </div>
      </a>`;
  }

  // ------------------------------------------------------------ list view
  function renderStats() {
    const n = (f) => PROJECTS.filter(f).length;
    $("#stats").innerHTML = [
      [PROJECTS.length, "projects"],
      [n(isPublic), "open source"],
      [n(hasDownloads), "downloadable"],
      [n((p) => p.demo), "live online"]
    ].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join("");
  }

  function renderCarousel() {
    const items = PROJECTS.filter((p) => p.featured);
    const root = $("#carousel"), track = $("#car-track"), dots = $("#car-dots");
    if (!items.length) { root.hidden = true; return; }
    track.innerHTML = items.map((p, i) => `
      <a class="slide" href="#/${esc(p.slug)}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}: ${esc(p.name)}">
        ${cover(p, i === 0)}
        <div class="slide-body">
          <span class="slide-cat"><i class="${esc(CATS[p.category]?.icon || "")}"></i>${esc(CATS[p.category]?.label || "")}</span>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.tagline)}</p>
        </div>
      </a>`).join("");
    dots.innerHTML = items.map((p, i) => `<button type="button" role="tab" aria-label="${esc(p.name)}" data-i="${i}"></button>`).join("");

    let idx = 0, timer = null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const go = (i, smooth = true) => {
      idx = (i + items.length) % items.length;
      track.scrollTo({ left: idx * track.clientWidth, behavior: smooth && !reduced ? "smooth" : "auto" });
      mark();
    };
    const mark = () => dots.querySelectorAll("button").forEach((d, i) => d.setAttribute("aria-selected", i === idx));
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!reduced && !timer) timer = setInterval(() => go(idx + 1), 5500); };

    $(".car-btn.prev", root).addEventListener("click", () => { stop(); go(idx - 1); });
    $(".car-btn.next", root).addEventListener("click", () => { stop(); go(idx + 1); });
    dots.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { stop(); go(+b.dataset.i); } });
    let raf;
    track.addEventListener("scroll", () => {   // keep dots in sync with swipes
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== idx) { idx = i; mark(); } });
    }, { passive: true });
    root.addEventListener("pointerenter", stop);
    root.addEventListener("pointerleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("resize", () => go(idx, false));
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    mark(); start();
  }

  function renderTabs() {
    const counts = {};
    PROJECTS.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
    const tabs = [["all", "All", "fa-solid fa-border-all", PROJECTS.length]]
      .concat(Object.entries(CATS).filter(([k]) => counts[k]).map(([k, c]) => [k, c.label, c.icon, counts[k]]));
    $("#tabs").innerHTML = tabs.map(([k, label, icon, n]) =>
      `<button class="tab" role="tab" data-cat="${k}" aria-selected="${state.cat === k}"><i class="${icon}"></i>${esc(label)}<span class="n">${n}</span></button>`
    ).join("");
  }

  function matches(p) {
    if (state.cat !== "all" && p.category !== state.cat) return false;
    if (!state.q) return true;
    const hay = [p.name, p.tagline, p.about, p.platform, ...(p.tech || []), CATS[p.category]?.label].join(" ").toLowerCase();
    return state.q.split(/\s+/).every((w) => hay.includes(w));
  }

  function renderList() {
    const list = PROJECTS.filter(matches);
    const groups = state.cat === "all" && !state.q
      ? Object.keys(CATS).map((k) => [k, list.filter((p) => p.category === k)]).filter(([, l]) => l.length)
      : [[state.cat === "all" ? null : state.cat, list]];
    $("#sections").innerHTML = groups.map(([k, l]) => `
      <section class="cat-section">
        ${k ? `<div class="cat-head"><i class="${CATS[k].icon}"></i><h2>${esc(CATS[k].label)}</h2><span>${l.length}</span></div>`
            : `<div class="cat-head"><h2>Results</h2><span>${l.length}</span></div>`}
        <div class="grid">${l.map(card).join("")}</div>
      </section>`).join("");
    $("#empty").hidden = list.length > 0;
  }

  // ------------------------------------------------------------ detail view
  const fmtSize = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
  const fileIcon = (n) => /\.apk$/i.test(n) ? "fa-brands fa-android" : /\.(exe|msi|scr)$/i.test(n) ? "fa-brands fa-windows" : /\.zip$/i.test(n) ? "fa-solid fa-file-zipper" : "fa-solid fa-file-arrow-down";

  async function cachedJSON(url) {
    const key = "gh:" + url;
    try { const c = sessionStorage.getItem(key); if (c) return JSON.parse(c); } catch (e) { /* storage blocked */ }
    const r = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) throw new Error(r.status);
    const data = await r.json();
    try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* ignore */ }
    return data;
  }

  async function loadRelease(p) {
    const box = $("#release-box");
    if (!box) return;
    const releasesUrl = `${gh(p)}/releases`;
    try {
      const rel = await cachedJSON(`https://api.github.com/repos/${p.repo}/releases/latest`);
      const assets = (rel.assets || []).filter((a) => !/\.(txt|md|sha256)$/i.test(a.name) && !/^(LICENSE|THIRD_PARTY)/i.test(a.name));
      const main = assets[0];
      box.innerHTML = `
        <h4>Download · ${esc(rel.tag_name || rel.name || "latest")}</h4>
        <div class="assets">${assets.map((a) =>
          `<a class="asset" href="${esc(a.browser_download_url)}"><i class="${fileIcon(a.name)}"></i><span class="nm">${esc(a.name)}</span><span class="sz">${fmtSize(a.size)}</span></a>`
        ).join("") || `<p class="muted-line">No files attached yet.</p>`}</div>
        <p class="muted-line" style="margin-top:10px"><a href="${esc(releasesUrl)}" target="_blank" rel="noopener" style="color:inherit">All releases &rarr;</a></p>`;
      const btn = $("#dl-btn");
      if (btn && main) {
        btn.href = main.browser_download_url;
        btn.innerHTML = `<i class="fa-solid fa-download"></i>Download <small>${esc(rel.tag_name || "")} · ${fmtSize(main.size)}</small>`;
      }
    } catch (e) {
      box.innerHTML = `<h4>Download</h4><a class="asset" href="${esc(releasesUrl)}" target="_blank" rel="noopener"><i class="fa-solid fa-box-archive"></i><span class="nm">Releases on GitHub</span></a>`;
    }
  }

  async function loadReadme(p) {
    const box = $("#readme-md");
    if (!box) return;
    const base = `https://github.com/${p.repo}/blob/HEAD/`;
    const rawBase = `https://raw.githubusercontent.com/${p.repo}/HEAD/`;
    try {
      const r = await fetch(rawBase + "README.md");
      if (!r.ok) throw new Error(r.status);
      const md = await r.text();
      const html = DOMPurify.sanitize(marked.parse(md, { gfm: true }));
      const tpl = document.createElement("template");
      tpl.innerHTML = html;
      // README links and images are relative to the repo; point them at GitHub
      tpl.content.querySelectorAll("img[src]").forEach((img) => {
        const src = img.getAttribute("src");
        if (!/^(https?:|data:)/i.test(src)) img.src = new URL(src, rawBase).href;
        img.loading = "lazy";
      });
      tpl.content.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (href.startsWith("#")) { a.removeAttribute("href"); return; }
        if (!/^(https?:|mailto:)/i.test(href)) a.href = new URL(href, base).href;
        a.target = "_blank"; a.rel = "noopener";
      });
      // drop a leading H1 that just repeats the project name
      const first = tpl.content.firstElementChild;
      if (first && first.tagName === "H1") first.remove();
      box.replaceChildren(tpl.content);
    } catch (e) {
      box.innerHTML = `<p>${esc(p.about)}</p><p class="muted-line">The README couldn't be loaded. <a href="${esc(gh(p))}" target="_blank" rel="noopener">View it on GitHub</a>.</p>`;
    }
  }

  function renderDetail(p) {
    const cat = CATS[p.category] || {};
    const actions = [];
    if (hasReleases(p)) actions.push(`<a class="btn primary" id="dl-btn" href="${esc(gh(p))}/releases/latest"><i class="fa-solid fa-download"></i>Download</a>`);
    if (p.demo) actions.push(`<a class="btn ${hasReleases(p) ? "live" : "primary"}" href="${esc(p.demo)}" target="_blank" rel="noopener"><i class="fa-solid fa-play"></i>${esc(p.demoLabel || "Open live")}</a>`);
    if (p.download && p.download !== p.demo) actions.push(`<a class="btn" href="${esc(p.download)}" target="_blank" rel="noopener"><i class="fa-solid fa-download"></i>Download</a>`);
    if (isPublic(p)) actions.push(`<a class="btn" href="${esc(gh(p))}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i>Source code</a>`);
    actions.push(`<button class="btn" type="button" id="share-btn"><i class="fa-solid fa-link"></i>Share</button>`);

    const links = [
      p.demo ? `<dt>${p.demoLabel ? "Play" : "Live"}</dt><dd><a href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(p.demo.replace(/^https?:\/\//, ""))}</a></dd>` : "",
      isPublic(p) ? `<dt>Repo</dt><dd><a href="${esc(gh(p))}" target="_blank" rel="noopener">${esc(p.repo)}</a></dd>` : "",
      `<dt>Platform</dt><dd>${esc(p.platform)}</dd>`,
      `<dt>Category</dt><dd>${esc(cat.label || "")}</dd>`
    ].join("");

    const related = PROJECTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

    $("#view-detail").innerHTML = `
      <div class="wrap detail">
        <a class="back" href="#/"><i class="fa-solid fa-arrow-left"></i>All projects</a>
        <div class="d-hero">
          ${cover(p, true)}
          <div>
            <div class="d-cat"><i class="${esc(cat.icon || "")}"></i>${esc(cat.label || "")} · ${esc(p.platform)}</div>
            <h1>${esc(p.name)}</h1>
            <p class="d-tagline">${esc(p.tagline)}</p>
            <div class="actions">${actions.join("")}</div>
            ${p.private ? `<p class="private-note"><i class="fa-solid fa-lock"></i>Source code for this one is private.</p>` : ""}
            ${!p.repo ? `<p class="private-note"><i class="fa-solid fa-lock"></i>Source code isn't published.</p>` : ""}
          </div>
        </div>

        <div class="d-body">
          <article class="panel readme">
            ${isPublic(p)
              ? `<div class="readme-head"><span><i class="fa-solid fa-book-open"></i> README.md</span><a href="${esc(gh(p))}#readme" target="_blank" rel="noopener">View on GitHub <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                 <div class="md" id="readme-md"><div class="skeleton" style="width:70%"></div><div class="skeleton"></div><div class="skeleton" style="width:85%"></div><div class="skeleton" style="width:60%"></div></div>`
              : `<div class="readme-head"><span><i class="fa-solid fa-circle-info"></i> About</span></div><div class="md"><p>${esc(p.about)}</p></div>`}
          </article>
          <aside class="side">
            ${hasReleases(p) ? `<div class="panel" id="release-box"><h4>Download</h4><div class="skeleton"></div><div class="skeleton" style="width:60%"></div></div>` : ""}
            ${isPublic(p) ? `<div class="panel"><h4>About</h4><p>${esc(p.about)}</p></div>` : ""}
            <div class="panel"><h4>Built with</h4><div class="chips">${(p.tech || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
            <div class="panel"><h4>Details</h4><dl class="kv">${links}</dl></div>
          </aside>
        </div>

        ${related.length ? `<div class="more"><h3>More ${esc((cat.label || "projects").toLowerCase())}</h3><div class="grid">${related.map(card).join("")}</div></div>` : ""}
      </div>`;

    $("#share-btn").addEventListener("click", async () => {
      const url = `${location.origin}${location.pathname}#/${p.slug}`;
      if (navigator.share && matchMedia("(pointer:coarse)").matches) {
        try { await navigator.share({ title: p.name, text: p.tagline, url }); return; } catch (e) { /* cancelled */ }
      }
      try { await navigator.clipboard.writeText(url); toast("Link copied"); } catch (e) { toast(url); }
    });

    if (isPublic(p)) loadReadme(p);
    if (hasReleases(p)) loadRelease(p);
  }

  // ------------------------------------------------------------ routing
  let listScroll = 0;
  function route() {
    let hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    if (BY_SLUG[hash] && !location.hash.startsWith("#/")) { history.replaceState(null, "", `#/${hash}`); } // old #slug links
    const p = BY_SLUG[hash];
    const list = $("#view-list"), detail = $("#view-detail");
    if (p) {
      if (!list.hidden) listScroll = scrollY;
      list.hidden = true; detail.hidden = false;
      renderDetail(p);
      document.title = `${p.name} - Swikrut Dhanorkar`;
      scrollTo(0, 0);
    } else {
      detail.hidden = true; list.hidden = false; detail.innerHTML = "";
      document.title = "Projects - Swikrut Dhanorkar";
      requestAnimationFrame(() => scrollTo(0, listScroll));
    }
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  }

  // ------------------------------------------------------------ events
  $("#tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    state.cat = b.dataset.cat; renderTabs(); renderList();
  });
  $("#search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderList(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName) && !$("#view-list").hidden) {
      e.preventDefault(); $("#search").focus();
    }
    if (e.key === "Escape" && !$("#view-detail").hidden) location.hash = "#/";
  });
  window.addEventListener("hashchange", route);

  $("#year").textContent = new Date().getFullYear();
  renderStats(); renderCarousel(); renderTabs(); renderList(); route();
})();
