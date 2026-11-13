# darkwizlab.com

Landing page for **DarkWiz Lab**: the hub for Gemz's vibe-coded civil engineering, QS and site apps. The page is designed as a drawing set; each app is a sheet in the drawing register.

| File | What it is |
| --- | --- |
| `index.html` | The whole site. HTML, CSS and JS in one file, no build step, no dependencies except Google Fonts. |
| `404.html` | Branded not-found page (GitHub Pages serves this automatically). |
| `CNAME` | Tells GitHub Pages the custom domain is `darkwizlab.com`. Do not delete. |
| `robots.txt` | Allows crawling, points to the sitemap. |
| `sitemap.xml` | Lists the apex domain and the math app. |
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

## Editing

Everything for the home page lives in `index.html`. `support.html` and `report.html`
share `shell.css`, which uses the same palette.

- **Add an app:** copy an `<article class="row">` block in `#regList`. Give it a sheet
  number by discipline (`QS-1xx` quantity surveying, `ST-2xx` structural, `RV-3xx` review,
  `FD-4xx` field), set `data-d` to `qs`, `st`, `rv` or `fd`, then update the count in the
  matching filter button and the "8 apps" figure in the hero.
- **Status stamps:** `stamp use` (In use), `stamp rev` (Under revision), `stamp priv`
  (Private build). A row with `class="row is-rev"` plus the `.cloud` and `.delta` SVGs gets
  the red revision cloud.
- **Colours and fonts** are the CSS variables at the top. `paper` is the light sheet view,
  `model` is the dark CAD model-space view. Fonts are Barlow and Barlow Condensed.
- **Ko-fi:** `https://ko-fi.com/darkwizlab`, used in the header, hero, support panel and footer.
- **Contact address** is `hello@darkwizlab.com`.

The hero figure is a simply supported beam drawn in plain SVG by the script at the bottom
of `index.html`: R_A = P·b/L, R_B = P·a/L, M_max = P·a·b/L. Drag the load or use the sliders.
