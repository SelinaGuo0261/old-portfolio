# old-portfolio

My portfolio ([selinaguo.world](https://www.selinaguo.world)), rebuilt from Webflow as a
static site with **Astro + TypeScript**. Every interaction is animated with **GSAP**.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build to dist/
npm run preview   # serve the built site
```

## Where things live

```
src/
├── content/projects/<slug>/   ← one folder per project
│   ├── index.mdx              ←   its text, layout and settings
│   └── images/                ←   only that project's images
├── content.config.ts          ← the fields every project can use
├── components/mdx/            ← building blocks used inside index.mdx
├── pages/                     ← home, work, projects, experiment, about + project routes
├── data/                      ← home page and About page copy (TypeScript)
├── scripts/interactions/      ← GSAP animations, one file per effect
├── styles/global.css          ← colours, fonts, shared styles
└── assets/                    ← site-wide images, fonts, Lottie files
```

### Projects

The folder name is the URL. `category` decides the section:

| category       | URL                    | listed on                 |
| -------------- | ---------------------- | ------------------------- |
| `professional` | `/main-work/<slug>`    | Home "Latest Works", Professional |
| `case-study`   | `/projects/<slug>`     | Case Study card stack     |
| `playground`   | `/experiments/<slug>`  | Playground (by `group`)   |

To add a project, copy an existing folder, rename it, swap the images and edit
`index.mdx`. The frontmatter at the top controls the cards; the body is the page.
Useful settings:

- `cover`, `hero`, `card` – images (paths like `./images/cover.png`)
- `theme` – page `background`, `text` and `accent` colours
- `featured: true` – show in "Latest Works" on the home page
- `showcase:` – show in "More interesting..." (can override title/summary/image)
- `externalUrl` – card links out instead of to a page (e.g. Piggy → Medium)
- `listOnly: true` – card only, no page
- `order` – lower numbers first
- `draft: true` – hide everywhere

The full list, with descriptions, is in `src/content.config.ts`.

### Writing a page (MDX)

Markdown works as usual: `### Heading`, paragraphs, `![](./images/x.png)`.
Layout components are available without importing:

```mdx
<Divider id="research">🔍 Research</Divider>   {/* section pill + side-nav icon */}

<Row>
<Col span={7}>

Text on the left.

</Col>
<Col span={5}>

![](./images/photo.jpg)

</Col>
</Row>

<Grid cols={3}> <Cell>…</Cell> <Cell>…</Cell> <Cell>…</Cell> </Grid>
<Quote title="Prompt">How might we…?</Quote>
<YouTube id="6HoKMjBOA1c" />
<LinkButton href="https://figma.com/…">View Prototype</LinkButton>
<Tabs> <Tab label="One">…</Tab> <Tab label="Two">…</Tab> </Tabs>
```

Also: `Lead`, `MetaGrid`/`Meta`, `Member`, `Box`, `Section`, `Accordion`, `Stat`,
`Small`, `Embed` (see `src/components/mdx/`). Leave a blank line between a
component tag and Markdown inside it.

### Animations

Add a data attribute; the script in `src/scripts/` does the rest:

| attribute | effect |
| --- | --- |
| `data-reveal` (`="left"`, `"right"`, `"bottom"`, `"grow"`, `"drop"`, `"fade"`, `"heading"`) | animate in on scroll |
| `data-split="words-slide-up"` (and other text effects) | split text animation |
| `data-hover="spin" \| "fill" \| "slide" \| "jello" \| "flip" \| "reveal"` | hover effects |
| `data-magnetic="50"` | element follows the cursor |
| `data-float` | gentle bobbing |

Animations are skipped for visitors who turn on "reduce motion".

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push
to `main`. In the repo, set **Settings → Pages → Source** to **GitHub Actions**.
It works on `https://selinaguo0261.github.io/old-portfolio/` or a custom domain.
