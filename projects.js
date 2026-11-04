/* ==========================================================================
   Project catalogue for projects.swikrut.com
   Order = display order. To add a project, copy an entry and edit it.

   slug       unique id; the project page is projects.swikrut.com/#/slug
   name       display name
   tagline    one line, shown on the card
   about      2-3 sentences, shown on the page (and instead of the README for private repos)
   category   games | desktop | android | web | hardware | ml
   platform   short label, e.g. "Windows", "Browser", "Android"
   tech       stack chips
   repo       "owner/name" on GitHub, or null
   private    true if the repo is private (no README/GitHub button shown)
   demo       URL of a live version, if any (demoLabel overrides the button text)
   download   URL of an external download page (e.g. itch.io), used instead of GitHub Releases
   releases   true if downloads are published as GitHub Releases on `repo`
   badge      optional: "new" | "live" | "wip"
   icon       Font Awesome class for the generated cover
   accent     cover colour
   image      optional cover image (assets/covers/...)
   ========================================================================== */

window.CATEGORIES = {
  games:    { label: "Games",            icon: "fa-solid fa-gamepad" },
  desktop:  { label: "Desktop apps",     icon: "fa-solid fa-display" },
  android:  { label: "Android",          icon: "fa-brands fa-android" },
  web:      { label: "Web & self-hosted", icon: "fa-solid fa-globe" },
  hardware: { label: "Hardware",         icon: "fa-solid fa-microchip" },
  ml:       { label: "ML & data",        icon: "fa-solid fa-brain" }
};

window.PROJECTS = [
  // ------------------------------------------------------------------ desktop
  {
    slug: "yt-game-pauser", name: "YT Game Pauser",
    tagline: "Pauses YouTube when your game starts talking, and resumes when the dialogue stops.",
    about: "Listens only to the game's own audio, so the video never triggers itself. Spotify can be paused or ducked too. No injection or memory reading, just the Windows audio and media APIs, so it's safe with anti-cheat.",
    category: "desktop", platform: "Windows", tech: ["Python", "PySide6", "ONNX Runtime", "WinRT Media APIs"],
    repo: "SwikrutD/yt-game-pauser", releases: true, badge: "new",
    icon: "fa-solid fa-circle-pause", accent: "#ef4444"
  },
  {
    slug: "erdle", name: "ERDLE",
    tagline: "Elden Ring boss overlay: what works, what doesn't, and the poise threshold.",
    about: "Reads the boss name from the screen when a fight starts and shows a compact state sheet. Can also drive the OLED screen on SteelSeries keyboards. No install, no Python needed.",
    category: "desktop", platform: "Windows", tech: ["Python", "OCR", "Tesseract", "SteelSeries GG"],
    repo: "SwikrutD/erdle", releases: true,
    icon: "fa-solid fa-dragon", accent: "#d4a017", image: "assets/covers/erdle.webp"
  },
  {
    slug: "paperforge", name: "PaperForge",
    tagline: "An offline-first PDF workspace for Windows.",
    about: "Read, annotate, organize, edit, OCR, convert, protect and redact PDFs on your own machine, with no account, no telemetry and no cloud services.",
    category: "desktop", platform: "Windows", tech: ["Electron", "React", "TypeScript", "PDF.js"],
    repo: "SwikrutD/PaperForge", releases: true,
    icon: "fa-solid fa-file-pdf", accent: "#f97316"
  },
  {
    slug: "reelwright", name: "Reelwright",
    tagline: "Turns text stories into narrated, captioned 9:16 Shorts.",
    about: "Story text goes in; out comes a narrated, word-timed captioned vertical video cut over a background clip, split into parts when it runs long. Optional YouTube upload and scheduling.",
    category: "desktop", platform: "Windows", tech: ["Python", "Tkinter", "faster-whisper", "ffmpeg", "YouTube API"],
    repo: "SwikrutD/Reelwright", releases: true,
    icon: "fa-solid fa-film", accent: "#a855f7"
  },
  {
    slug: "endslate", name: "Endslate",
    tagline: "Renames a movie and TV library into a layout Jellyfin reads without guessing.",
    about: "Scan, review every proposed change, approve, apply. Every run is journalled and can be reversed.",
    category: "desktop", platform: "Windows", tech: ["Python", "TMDb", "TVDB", "PyInstaller"],
    repo: "SwikrutD/Endslate", releases: true,
    icon: "fa-solid fa-clapperboard", accent: "#eab308"
  },
  {
    slug: "ffmpeg-forge", name: "FFMPEG-Forge",
    tagline: "ffmpeg through a window instead of a command line.",
    about: "Drop files in, pick a task, press Render. Convert, compress to a size target with real two-pass encodes, extract audio, and batch photo tasks, all from one queue.",
    category: "desktop", platform: "Windows", tech: ["Python", "PySide6", "ffmpeg"],
    repo: "SwikrutD/FFMPEG-Forge", releases: true,
    icon: "fa-solid fa-wand-magic-sparkles", accent: "#22c55e"
  },
  {
    slug: "neckflow", name: "NeckFlow",
    tagline: "Gentle neck and shoulder break reminders with a 3D mannequin.",
    about: "An offline tray utility that pops up a small bottom-right window with a native WPF 3D mannequin, instructions and a live countdown.",
    category: "desktop", platform: "Windows", tech: ["C#", ".NET 8", "WPF 3D"],
    repo: "SwikrutD/NeckFlow", releases: true,
    icon: "fa-solid fa-person-walking", accent: "#14b8a6"
  },
  {
    slug: "battery-widget", name: "Battery Widget",
    tagline: "Battery levels for every wireless peripheral in one desktop widget.",
    about: "Reads mice, headsets, keyboards and controllers from the apps that already manage them (Logi Bolt over HID++, G HUB, SteelSeries GG, DualSense) and shows them as rings on the desktop and in a tray flyout.",
    category: "desktop", platform: "Windows", tech: ["Electron", "Node.js", "HID++", "WebSockets"],
    repo: "SwikrutD/BatteryWidget",
    icon: "fa-solid fa-battery-three-quarters", accent: "#4ade80"
  },
  {
    slug: "clickthis", name: "ClickThis CT-808",
    tagline: "A click automator dressed up as a drum machine.",
    about: "Each click is a step on a TR-808-style sequencer, the wait before each step is the rhythm, and a green phosphor scope shows where each click lands. Record takes, swing the timing, add human jitter.",
    category: "desktop", platform: "Windows", tech: ["Python", "pywebview", "JavaScript"],
    repo: "SwikrutD/ClickThis", releases: true,
    icon: "fa-solid fa-computer-mouse", accent: "#fb923c"
  },
  {
    slug: "murmur", name: "Murmur",
    tagline: "Hold a key, talk, release: local dictation into any window.",
    about: "Transcribes with whisper.cpp, cleans the text up with an LLM and types it into whatever has focus. No account, no telemetry, no network calls unless you configure them.",
    category: "desktop", platform: "Windows", tech: ["Python", "whisper.cpp", "Local LLM"],
    repo: "SwikrutD/Murmur",
    icon: "fa-solid fa-microphone-lines", accent: "#38bdf8"
  },
  {
    slug: "strata", name: "Strata",
    tagline: "A local observatory for your Claude Code history.",
    about: "Indexes every Claude Code conversation on your machine into SQLite and shows usage limits, burn rate, projects, tools and edits, with a tray companion.",
    category: "desktop", platform: "Windows", tech: ["Python", "SQLite", "C#"],
    repo: "SwikrutD/Strata",
    icon: "fa-solid fa-layer-group", accent: "#c084fc"
  },
  {
    slug: "fuzzyclock", name: "FuzzyClock",
    tagline: "Fuzzy monster clock widgets for the Windows desktop.",
    about: "Three procedurally drawn monsters (Pinky, Mossy and Frosty) hold a clock and blink every few seconds. Mossy's eye follows the second hand.",
    category: "desktop", platform: "Windows", tech: ["C#", ".NET 8", "WPF"],
    repo: "SwikrutD/FuzzyClock", releases: true,
    icon: "fa-solid fa-clock", accent: "#f472b6"
  },
  {
    slug: "screensavers", name: "Borealis & Nocturne",
    tagline: "Two quiet, dark screensavers that tell the time in words.",
    about: "Borealis ripples northern lights over a mountain lake; Nocturne shows the moon in its real current phase. Both stay dim and drift slowly to avoid burn-in.",
    category: "desktop", platform: "Windows", tech: ["C#", "WinForms", "GDI+"],
    repo: "SwikrutD/Screensavers", releases: true,
    icon: "fa-solid fa-moon", accent: "#6366f1"
  },
  {
    slug: "streamdock-plugins", name: "Stream Dock plugins",
    tagline: "Custom keys for the VSD / Mirabox / Ajazz Stream Dock.",
    about: "Keyboard battery, Claude usage, display resolution switching and VPN status keys, plus a small SDK and CLI for scaffolding, syncing and packing new plugins.",
    category: "desktop", platform: "Windows", tech: ["Node.js", "WebSockets", "SVG"],
    repo: "SwikrutD/StreamDock-Plugins",
    icon: "fa-solid fa-table-cells", accent: "#94a3b8"
  },

  // -------------------------------------------------------------------- games
  {
    slug: "lumenfall", name: "Lumenfall",
    tagline: "A lantern, fifteen minutes, and everything coming for you.",
    about: "A survivors-style action game: weapons fire on their own, you move and pick upgrades, and try to reach sunrise. Everything is drawn and synthesized at runtime, with full controller support.",
    category: "games", platform: "Browser, Windows, Linux", tech: ["JavaScript", "Canvas", "Web Audio", "Electron"],
    repo: "SwikrutD/lumenfall", private: true, demo: "https://floodedrocket.itch.io/lumenfall", download: "https://floodedrocket.itch.io/lumenfall", demoLabel: "Play or download on itch.io",
    icon: "fa-solid fa-fire-flame-curved", accent: "#f59e0b", image: "assets/covers/lumenfall.webp"
  },
  {
    slug: "rex-chase", name: "Rex Chase",
    tagline: "A 3D dinosaur runner with trophies and a global leaderboard.",
    about: "Pick a T-rex, a velociraptor or a triceratops, outrun cacti and pterodactyls, chase a caveman who throws things back, and survive meteor showers. 19 trophies, 10 of them secret. Every model and sound is generated in code.",
    category: "games", platform: "Browser", tech: ["Three.js", "Vite", "Node.js"],
    repo: "SwikrutD/rex-chase", demo: "https://rex.swikrut.com", badge: "live",
    icon: "fa-solid fa-person-running", accent: "#84cc16"
  },
  {
    slug: "spaghettify", name: "Spaghettify",
    tagline: "Multiplayer arcade: you're a baby black hole. Eat everything.",
    about: "Start pea-sized in a shared arena and swallow dust, asteroids, moons, planets and other players. Drop in, grow, get spaghettified.",
    category: "games", platform: "Browser", tech: ["TypeScript", "Canvas", "WebSockets", "Docker"],
    repo: "SwikrutD/spaghettify", demo: "https://spaghettify.swikrut.com", badge: "live",
    icon: "fa-solid fa-circle-half-stroke", accent: "#8b5cf6"
  },
  {
    slug: "tenant-of-bones", name: "Tenant of Bones",
    tagline: "A turn-based roguelike where you wear the dead, and the dead rot.",
    about: "Every body you wear is your class, your resource and your clock at once. There is no HP: damage is rot. When a body gives out you have three turns to find another.",
    category: "games", platform: "Browser", tech: ["TypeScript", "Vite", "Vitest"],
    repo: "SwikrutD/TenantOfBones", badge: "wip",
    icon: "fa-solid fa-skull", accent: "#e76f51", image: "assets/covers/tenantofbones.webp"
  },
  {
    slug: "asterion", name: "ASTERION",
    tagline: "A cinematic space observatory and physics playground.",
    about: "Explore a procedural universe, play with orbits, and build your own worlds. Original procedural graphics and synthesized audio, with no installs, accounts or downloaded textures.",
    category: "games", platform: "Browser", tech: ["JavaScript", "WebGL", "Web Audio"],
    repo: "SwikrutD/Asterion", releases: true,
    icon: "fa-solid fa-meteor", accent: "#0ea5e9"
  },
  {
    slug: "wordle-duel", name: "Wordle-Duel",
    tagline: "Real-time PvP Wordle where you pick your opponent's word.",
    about: "Head-to-head Wordle over WebSockets with sub-100ms message latency, self-hosted on a home server.",
    category: "games", platform: "Browser", tech: ["Node.js", "Socket.io", "Docker"],
    repo: "SwikrutD/wordle-duel", demo: "https://wordlevs.swikrut.com", badge: "live",
    icon: "fa-solid fa-spell-check", accent: "#22c55e", image: "assets/covers/wordleduel.webp"
  },

  // ------------------------------------------------------------------ android
  {
    slug: "swidscanner", name: "SwidScanner",
    tagline: "A document scanner with no account, no ads and no cloud.",
    about: "Live page detection, auto-capture, batch and book modes, OCR, smart naming from the page text, PDF import, signing and stamping. Everything runs on the phone.",
    category: "android", platform: "Android", tech: ["Kotlin", "CameraX", "ML Kit", "OpenCV"],
    repo: "SwikrutD/SwidScanner", releases: true,
    icon: "fa-solid fa-file-image", accent: "#3b82f6", image: "assets/covers/swidscanner.webp"
  },
  {
    slug: "swid-gps-camera", name: "SWID GPS Camera",
    tagline: "A camera that stamps every photo with its address and coordinates.",
    about: "Draws a clean location card (address, coordinates, optional date and notes) onto each photo and writes GPS into the EXIF. No account, no ads, no API keys.",
    category: "android", platform: "Android", tech: ["Kotlin", "CameraX", "Fused Location"],
    repo: "SwikrutD/SWID-GPSCamera", releases: true,
    icon: "fa-solid fa-location-dot", accent: "#0f766e"
  },

  // ---------------------------------------------------------------------- web
  {
    slug: "clipsync", name: "ClipSync",
    tagline: "End-to-end encrypted clipboard and file sync between your devices.",
    about: "Self-hosted, no accounts, no app store. AES-256-GCM encryption happens on the device before anything leaves it.",
    category: "web", platform: "Browser / PWA", tech: ["Node.js", "Socket.io", "Web Crypto API", "PWA"],
    repo: "SwikrutD/clipsync", demo: "https://clipsync.swikrut.com", badge: "live",
    icon: "fa-solid fa-clipboard", accent: "#38bdf8", image: "assets/covers/clipsync.webp"
  },
  {
    slug: "bingecheck", name: "BingeCheck",
    tagline: "One tracker for movies, TV and anime.",
    about: "Unifies TMDb and AniList into one data model, with season-level progress tracking and custom watchlists.",
    category: "web", platform: "Browser", tech: ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
    repo: null, demo: "https://tv.fintu.uk", badge: "live",
    icon: "fa-solid fa-tv", accent: "#ef4444", image: "assets/covers/bingecheck.webp"
  },
  {
    slug: "eatplanner", name: "EatPlanner",
    tagline: "A self-hosted meal planner, shopping list and household hub.",
    about: "Save recipes, drag them onto a meal calendar, generate a shopping list, and share or print the plan. Also covers chores, events, pantry inventory and photos. Runs on your own machine and works offline.",
    category: "web", platform: "Self-hosted", tech: ["Next.js", "TypeScript", "SQLite", "Drizzle", "Docker"],
    repo: "SwikrutD/meal-planner",
    icon: "fa-solid fa-utensils", accent: "#f97316"
  },
  {
    slug: "hiresight", name: "Hiresight",
    tagline: "A job-search pipeline tracker that builds itself from your inbox.",
    about: "A weighted rule engine classifies application mail (acknowledgements, rejections, interviews, expiring assessments) and folds it into a stage machine. No LLM, no API cost, works offline.",
    category: "web", platform: "Local web app", tech: ["Python", "SQLite", "Gmail API"],
    repo: "SwikrutD/Hiresight",
    icon: "fa-solid fa-binoculars", accent: "#06b6d4"
  },
  {
    slug: "dojo", name: "Dojo",
    tagline: "An offline interview training studio.",
    about: "Practise coding problems against real judges in Python, JavaScript and Java, see how your solution scales, keep it fresh with spaced repetition, and rehearse mock interviews, system design and behavioral stories.",
    category: "web", platform: "Local web app", tech: ["Python", "JavaScript", "Spaced repetition"],
    repo: "SwikrutD/Dojo",
    icon: "fa-solid fa-torii-gate", accent: "#dc2626"
  },
  {
    slug: "focus-garden", name: "Focus Garden",
    tagline: "A focus timer that grows a garden of what you got done.",
    about: "Each finished session plants a flower labelled with your task. Rain and soft music are synthesized in the browser. One HTML file, no dependencies.",
    category: "web", platform: "Browser", tech: ["HTML", "Canvas", "Web Audio"],
    repo: "SwikrutD/focus-garden",
    icon: "fa-solid fa-seedling", accent: "#65a30d"
  },

  // ----------------------------------------------------------------- hardware
  {
    slug: "esp32-remote", name: "ESP32 Remote",
    tagline: "Control your PC from your phone through an ESP32 Bluetooth keyboard.",
    about: "The PC pairs with the ESP32 as a BLE keyboard; your phone connects to the same board from a web page and sends commands, which become keystrokes. Touch a pin to lock the PC, press BOOT to play/pause.",
    category: "hardware", platform: "ESP32", tech: ["C++", "Arduino", "NimBLE", "Web Bluetooth"],
    repo: "SwikrutD/esp32-remote",
    icon: "fa-brands fa-bluetooth-b", accent: "#2563eb"
  },

  // ----------------------------------------------------------------------- ml
  {
    slug: "fraudshield", name: "FraudShield ML",
    tagline: "Fraud detection on 590,000+ transactions, explained with SHAP.",
    about: "88%+ fraud recall at under a 10% false-positive rate, with a FastAPI and PostgreSQL production architecture.",
    category: "ml", platform: "API", tech: ["Python", "XGBoost", "FastAPI", "PostgreSQL", "Docker"],
    repo: "SwikrutD/fraudshield-ml-platform",
    icon: "fa-solid fa-shield-halved", accent: "#38bdf8", image: "assets/covers/fraudshield.webp"
  }
];
