# darkwizlab.com

Landing page for **DarkWiz Lab**: the hub for a set of vibe-coded civil engineering, QS and site apps. The page is designed as a drawing set; each app is a sheet in the drawing register.

| File | What it is |
| --- | --- |
| `index.html` | The whole site. HTML, CSS and JS in one file, no build step, no dependencies except Google Fonts. |
| `404.html` | Branded not-found page (GitHub Pages serves this automatically). |
| `CNAME` | Tells GitHub Pages the custom domain is `darkwizlab.com`. Do not delete. |
| `robots.txt` | Allows crawling, points to the sitemap. |
| `sitemap.xml` | Lists the apex domain, the math app and the support/report pages. Never add private subdomains. |
| `VERSION`, `version.js`, `CHANGELOG.md` | Site version and revision history (see Versioning). |
| `scripts/version.mjs` | Bumps the version and checks everything agrees. |
| `.nojekyll` | Stops GitHub from running Jekyll over the files. |

---

## 1. Put it on GitHub

Create a **public** repository. Either name works:

- `gemz.github.io` (replace with your username) — serves at the root, simplest option, or
- any name, e.g. `darkwizlab-site`.

Upload all files to the **root** of the repo — not inside a folder.

## 2. Turn on Pages

Repo → **Settings** → **Pages**

- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)` → **Save**
- **Custom domain:** type `darkwizlab.com` → **Save**
- Wait for the DNS check to pass, then tick **Enforce HTTPS**

## 3. DNS records

At whichever provider holds `darkwizlab.com`, add these. **Leave the existing
`mathlearningapp` record alone** — subdomains are independent of the apex.

**Apex (`darkwizlab.com`) — four A records:**

```
@   A   185.199.108.153
@   A   185.199.109.153
@   A   185.199.110.153
@   A   185.199.111.153
```

**Optional IPv6 — four AAAA records:**

```
@   AAAA   2606:50c0:8000::153
@   AAAA   2606:50c0:8001::153
@   AAAA   2606:50c0:8002::153
@   AAAA   2606:50c0:8003::153
```

**`www` — one CNAME:**

```
www   CNAME   gemz.github.io.      (your GitHub Pages default domain)
```

If your provider offers `ALIAS` or `ANAME` at the apex, you can use a single
record pointing to `gemz.github.io` instead of the four A records.

Propagation is usually minutes, occasionally up to 24 hours. GitHub issues the
TLS certificate after the DNS check passes, so **Enforce HTTPS** may stay greyed
out for a while — that is normal.

---

## Confidentiality rule

The register lists private tools **by codename only**. Never put a private tool's URL,
subdomain, repository name or product name on any page, in `sitemap.xml` or in this README.
Codenames are deliberately unrelated to their addresses:

| Sheet | Codename | What it is |
| --- | --- | --- |
| QS-101 | Keystone | Estimating and cost control |
| QS-102 | Benchmark | Portfolio reporting |
| QS-103 | Cofferdam | Tender register and supplier quotations |
| QS-104 | Gantry | Project control and procurement |
| ST-201 | Plumbline | Structural test bench |
| RV-301 | Lintel | Licensure exam reviewer (under revision) |

Only the free apps (BM Translator, Math Learning App) carry links, in the "Free to use" section.

## Editing

Everything for the home page lives in `index.html`. `support.html` and `report.html`
share `shell.css`, which uses the same palette.

- **Add a free app:** copy an `<article class="open-card">` in `#open`.
- **Add a private app:** copy an `<article class="row">` in `#regList`, give it a codename,
  a sheet number by discipline (`QS-1xx`, `ST-2xx`, `RV-3xx`, `FD-4xx`) and `data-d`
  (`qs`, `st`, `rv`, `fd`). No link. Update the filter counts and the hero figures.
- **Status stamps:** `stamp use` (Open to all), `stamp priv` (Restricted), `stamp rev`
  (Under revision). A row with `class="row is-rev"` plus the `.cloud` and `.delta` SVGs gets
  the red revision cloud.
- **Colours and fonts** are the CSS variables at the top. `paper` is the light sheet view,
  `model` is the dark CAD model-space view. Fonts are Barlow and Barlow Condensed.
- **Ko-fi:** `https://ko-fi.com/darkwizlab`.
- **Contact address** is `hello@darkwizlab.com`.

## Versioning

`version.js` is the single source of truth. The footer's title block shows the current
revision, and clicking it opens the revision history built from the same file. Support and
report pages show the version in their footer bar.

```bash
node scripts/version.mjs bump 2.1.0     # VERSION, version.js and every ?v= tag
# add the new entry at the top of DWL_CHANGELOG in version.js
node scripts/version.mjs changelog      # regenerates CHANGELOG.md
node scripts/version.mjs check          # fails if anything disagrees
```

Patch (2.0.**1**) = fixes and wording. Minor (2.**1**.0) = a new app or section.
Major (**3**.0.0) = a redesign.

The hero figure is a simply supported beam drawn in plain SVG by the script at the bottom
of `index.html`: R_A = P·b/L, R_B = P·a/L, M_max = P·a·b/L. Drag the load or use the sliders.
