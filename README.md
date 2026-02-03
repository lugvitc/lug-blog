# The LUGVITC Blog

The official blog of The Linux Club, VIT Chennai, built with Astro and Supabase

## Tech stack

- Astro 5 + TypeScript
- Markdown/MDX posts via Content Collections
- Comments and Authentication (Google OAuth) via Supabase

## Prerequisites

- Node.js
- pnpm

## Setup

1) Clone the repository

```bash
cd <folder of your choice on your PC>
git clone https://github.com/lugvitc/lug-blog.git
```

2) Install dependencies:

```bash
pnpm install
```

3) Create a `.env` file in the project root (see the next section).

4) Start the dev server:

```bash
pnpm dev
```

Then open `http://localhost:4321`.

## Environment variables

### Required (only if you want see comments)

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Example `.env`:

```bash
PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

## Commands

All commands are run from the project root:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build the production site to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Writing a new blog post

Posts live under `src/content/`. The folder name becomes the URL slug. If your folder's name is `linux-basics` the URL for you blog will be `https://blog.lugvitc.net/linux-basics`. Your blog content must be in `index.md` or `index.mdx` files inside your folder. Images referenced in the blog post must be placed in the same folder, including the cover/hero image.

### 1) Create a new post folder

Create a new folder and an `index.md` inside it:

```text
src/content/my-new-post/index.md
```

### 2) Add frontmatter

Minimum recommended frontmatter:

```yaml
---
title: "My New Post"
description: "A small description"
author: "Your Name"
heroImage: "./hero.jpg" # optional
---
```

### 3) Add images (optional)

Example:

```text
src/content/my-new-post/
    index.md
    hero.jpg
    diagram1.png
    diagram2.jpg
```

### 4) Preview locally

```bash
pnpm dev
```

OR

```bash
pnpm build
pnpm preview
```
