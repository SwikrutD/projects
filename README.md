# projects.swikrut.com

The full project index, linked from the "view all" card on [swikrut.com](https://swikrut.com).

Static site: no build step. Styles come from `https://swikrut.com/style.css` (shared design system) plus `archive.css`.

## Add a project

Add an entry to `projects.js`. Each project gets a share link at `https://projects.swikrut.com/#<slug>`.
Screenshots go in `assets/` and are referenced with the `image` field.

## Deploy (one-time setup)

1. Create a GitHub repo (e.g. `SwikrutD/projects`) and push this folder to `main`.
2. Repo **Settings → Pages**: source = `main` / root. The `CNAME` file sets the custom domain to `projects.swikrut.com`.
3. At your DNS provider for `swikrut.com`, add a record:
   `CNAME  projects  →  swikrutd.github.io`
4. Once the certificate is issued, tick **Enforce HTTPS** in Pages settings.
