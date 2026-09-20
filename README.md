# High Adams Tours — Homepage

Static homepage for a Egypt travel catalogue (HTML + CSS + vanilla JS, no build step).

## Structure

```
high-adams-tours/
├── index.html
├── css/style.css
├── js/main.js
└── images/          <- put your images here
```

## Images

The page expects these files inside `images/`. If a file is missing, a colour gradient is shown instead, so the layout never breaks.

| File | Used for |
|------|----------|
| `nile.webp` | Hero slide, Aswan card, statement banner |
| `hurghada-giftun.webp` | Hero slide, Hurghada card |
| `luxor-karnak.webp` | Hero slide, Luxor card |
| `pyramids.webp` | Giza card, Giza tour |
| `cairo-felucca-sunset.webp` | Cairo felucca tour |
| `nile-cruise.webp` | Nile cruise tour |
| `luxor-balloon-sunrise.webp` | Balloon tour |

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages

1. Create a new repository on GitHub and upload all files (keep the folder structure).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://<username>.github.io/<repo-name>/`.

## Editing content

- Tours: each `<article class="tour">` in `index.html`. Change `data-destination` / `data-experience` to control the filters.
- Colours and fonts: the variables at the top of `css/style.css`.
- Contact details: search for `201005000708` and `info@highadamstour.com`.
