# Our homepage

This is the source of our website at [inflection.engineering](https://www.inflection.engineering).

## Developing

Install [fnm](https://github.com/Schniz/fnm#readme), the fast node manager:

```bash
# Install with homebrew
brew install fnm

# Load into your environment; this can be added to your `.zshrc` or equivalent
eval "$(fnm env --use-on-cd --shell zsh)"

# Switch to the appropriate node version
fnm use
```

Install `pnpm` if you haven't already:

```bash
npm install -g pnpm
```

Run the development server, which builds and compiles the site as you edit:

```bash
pnpm run dev
```

Edit the website files, `index.html`, `404.html` and `src/*` and see the changes appear as you save them.

This site uses [TailwindCSS](https://tailwindcss.com) and [DaisyUI](https://daisyui.com).
