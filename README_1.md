# darkwizlab.com

Landing page for **DarkWiz Lab** — the hub that points to each subject app on its own subdomain.

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

Everything lives in `index.html`.

- **Add or promote a subject app:** copy an `<article class="app">` block in the
  `#apps` section. A shipped app gets `class="app is-live"`, a `<span class="chip live">Live</span>`
  and a real link. Unshipped apps get `chip build` or `chip queue` and a
  `<span class="soon-note">` instead of a button.
- **Counts** (6 / 16 / 81 / 385) live in the `.stats` block in `#inside`.
- **Colours and fonts** are the CSS variables at the top, copied verbatim from the
  math app so the two stay in sync. Change them in one place.
- **Contact address** is `hello@darkwizlab.com`, used in three `mailto:` links.

The hero demo ("Bench 01") is plain SVG driven by the script at the bottom of the
file. It pauses when scrolled out of view or when the tab is hidden.
