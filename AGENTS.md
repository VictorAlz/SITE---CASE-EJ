# Project Rules

- Component-layer classes in `src/index.css` (e.g. `.btn-highlight`) must use `!` (important) on color utilities when they are applied on top of a shadcn `Button`, because the variant's own background utility always wins the cascade otherwise. Why: without it, highlight buttons silently render as `bg-primary`.
