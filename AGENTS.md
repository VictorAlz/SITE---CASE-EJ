# Project Rules

- Component-layer classes in `src/index.css` (e.g. `.btn-highlight`) must use `!` (important) on color utilities when they are applied on top of a shadcn `Button`, because the variant's own background utility always wins the cascade otherwise. Why: without it, highlight buttons silently render as `bg-primary`.
- Account cleanup uses the server-side Auth Admin API with an explicit reviewed target list, validated administrator session, and preservation guard; remove the deployed maintenance function after use to avoid leaving a destructive endpoint available.
- Logged-in sections are controlled by the menus and panel branches in both dashboard pages; remove both entry points together so hidden sections cannot remain reachable.
- Blog articles use a shared editorial catalog with verified source links and publication dates; the homepage, blog index, and article pages read the same catalog to keep content consistent without introducing backend changes.
