/* ==========================================================================
   Project index for projects.swikrut.com
   To add a project, copy one entry and edit it. Fields:
     slug     unique id, used for share links: projects.swikrut.com/#slug
     name     display name
     pitch    one or two sentences ("" shows "// writeup pending")
     status   "live" | "shipped" | "wip" | "archived"
     year     number, used for sorting (newest first)
     tags     tech stack / keywords, used by the filter chips
     links    any of: demo, repo, video, writeup, download (full URLs)
     image    optional path to a screenshot, e.g. "assets/erdle.png"
     featured true if it is also on the main swikrut.com homepage
   ========================================================================== */

window.PROJECTS = [
  // ---------- new / side projects ----------
  {
    slug: "erdle",
    name: "ERDLE",
    pitch: "Elden Ring Damage Lookup Engine: an on-screen boss overlay that reads the boss name from the screen and shows what works, what doesn't, and the poise threshold. Also drives SteelSeries keyboard OLED screens.",
    status: "shipped",
    year: 2026,
    tags: ["Python", "OCR", "Windows", "Desktop"],
    links: {}
  },
  {
    slug: "lumenfall",
    name: "Lumenfall",
    pitch: "",
    status: "wip",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "rex-chase",
    name: "Rex-Chase",
    pitch: "",
    status: "shipped",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "reelwright",
    name: "Reelwright",
    pitch: "Short-form video generator.",
    status: "wip",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "yt-pauser",
    name: "YT-Pauser",
    pitch: "",
    status: "shipped",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "neckflow",
    name: "Neckflow",
    pitch: "",
    status: "shipped",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "endslate",
    name: "Endslate",
    pitch: "",
    status: "shipped",
    year: 2026,
    tags: [],
    links: {}
  },
  {
    slug: "battery-widget",
    name: "Battery Widget",
    pitch: "",
    status: "shipped",
    year: 2026,
    tags: [],
    links: {}
  },

  // ---------- featured on swikrut.com ----------
  {
    slug: "fraudshield",
    name: "FraudShield ML Platform",
    pitch: "End-to-end fraud detection on 590,000+ transactions: 88%+ fraud recall at a <10% false-positive rate, SHAP-explained, with a FastAPI/PostgreSQL production architecture.",
    status: "shipped",
    year: 2025,
    tags: ["Python", "XGBoost", "FastAPI", "PostgreSQL", "Docker"],
    links: { writeup: "https://swikrut.com/project_fraudshield.html" },
    image: "https://swikrut.com/assets/fraudshield_card.png",
    featured: true
  },
  {
    slug: "bingecheck",
    name: "BingeCheck",
    pitch: "Full-stack media tracker unifying TMDb and AniList into one data model, with season-level progress tracking and custom watchlists.",
    status: "live",
    year: 2025,
    tags: ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
    links: { writeup: "https://swikrut.com/project_bingecheck.html" },
    image: "https://swikrut.com/assets/bingecheck_card.png",
    featured: true
  },
  {
    slug: "clipsync",
    name: "ClipSync",
    pitch: "Self-hosted, end-to-end encrypted clipboard & file sync across devices. No accounts, no app store, AES-256-GCM client-side encryption.",
    status: "live",
    year: 2025,
    tags: ["Node.js", "Socket.io", "Web Crypto API", "PWA"],
    links: { writeup: "https://swikrut.com/project_clipsync.html" },
    image: "https://swikrut.com/assets/clipsync_card.png",
    featured: true
  },
  {
    slug: "wordle-duel",
    name: "Wordle-Duel",
    pitch: "Real-time PvP Wordle where you choose your opponent's word. Sub-100ms message latency.",
    status: "live",
    year: 2025,
    tags: ["Node.js", "Socket.io", "Docker", "TrueNAS"],
    links: { writeup: "https://swikrut.com/project_wordleduel.html" },
    image: "https://swikrut.com/assets/wordleduel_card.png",
    featured: true
  },
  {
    slug: "customer-churn",
    name: "Customer Churn Prediction",
    pitch: "XGBoost + logistic regression ensemble predicting churn at 85%+ accuracy, a 12% lift over baseline via feature engineering.",
    status: "shipped",
    year: 2024,
    tags: ["Python", "XGBoost", "Scikit-learn", "Pandas"],
    links: { writeup: "https://swikrut.com/project_customerchurn.html" },
    image: "https://swikrut.com/assets/customerchurn_card.png",
    featured: true
  },

  // ---------- older / coursework ----------
  {
    slug: "spendr",
    name: "Spendr Expense Tracker",
    pitch: "Flask/SQLite expense tracker with categorized spending visualization and budget tracking. Built in a collaborative software engineering course.",
    status: "archived",
    year: 2024,
    tags: ["Python", "Flask", "SQLite"],
    links: { writeup: "https://swikrut.com/project2.html" }
  },
  {
    slug: "4bit-cpu",
    name: "4-Bit CPU & Assembly Battleship",
    pitch: "A custom 4-bit RISC-style CPU designed and breadboarded from scratch, with a minimal ISA and an LED Battleship game written in custom assembly.",
    status: "archived",
    year: 2023,
    tags: ["Hardware", "Assembly", "Computer Architecture"],
    links: { writeup: "https://swikrut.com/project6.html" }
  },
  {
    slug: "needleman-wunsch",
    name: "Needleman-Wunsch DNA Alignment",
    pitch: "Python implementation of the Needleman-Wunsch global sequence-alignment algorithm for DNA and protein sequences, with custom scoring matrices and traceback.",
    status: "archived",
    year: 2023,
    tags: ["Python", "Algorithms", "Bioinformatics"],
    links: { writeup: "https://swikrut.com/project1.html" }
  }
];
