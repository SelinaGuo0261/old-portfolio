# old-portfolio

Static mirror of my Webflow portfolio, [selinaguo.world](https://www.selinaguo.world).

All 19 pages, plus their images, fonts, CSS, JS and Lottie animations, are stored locally under `assets/`. Links are relative, so the site works when opened from disk, when served from any folder, and on GitHub Pages.

## View locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- A few third-party libraries still load from public CDNs: GSAP, Matter.js, SplitType, typer.js and Google Fonts.
- Webflow-only features (forms, CMS editing, site search, analytics) do not work in a static copy.
