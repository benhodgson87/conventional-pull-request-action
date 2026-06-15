# Agent Guide

A GitHub Action that lints pull request titles against the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec, with optional scope validation via regex.

## Source structure

```
src/
  main.ts          # entrypoint — reads config, calls lint()
  lint.ts          # core logic — fetches PR title, runs commitlint, validates scope
  utils/
    config.ts      # parses action inputs from environment variables
    rules.ts       # loads commitlint rules, merging defaults with any custom file
  outputs/         # unit tested wrappers around @actions/core output messages
  fixtures/        # commitlint rules fixtures used in tests
```

`lib/` and `dist/` are generated — do not edit them directly.

## Setup

Node 24 is required — this matches the action runtime and CI.

```bash
npm ci  # install dependencies
```

## Development

```bash
npm test             # run tests (vitest)
npm run format:check # check formatting (Prettier)
npm run format:fix   # fix formatting
npm run build        # compile src → lib, then bundle lib → dist
```

TypeScript is compiled with `strict: true` and `noImplicitAny: true` — all types must be explicit.

Tests live alongside source as `*.test.ts` files and are excluded from TypeScript compilation. Vitest is used as the test runner.

Prettier config is in `.prettierrc.json` — read it before writing code. Run `format:fix` before committing.

## Adding or changing inputs

Action inputs are defined in `action.yml`. When adding or changing one:

1. Add/update the input in `action.yml`
2. Read it from the environment in `src/utils/config.ts` (inputs are available as `INPUT_<UPPERCASED_NAME>`)
3. Validate or parse the value in `config.ts` — return `undefined` if the env var is not set, throw a descriptive `Error` if it is set but invalid (see how `scopeRegex` handles a bad regex)
4. Update the README table with usage documentation
5. Rebuild `dist/` (see below)

## Building

`dist/` must be committed and kept in sync with `src/`. After changing source, rebuild and commit dist manually:

```bash
npm run build
git add dist/
git commit -m "chore: build dist"
```

## Pull requests

This repo uses conventional commits. PR titles are linted by the action itself (see `.github/workflows/lint-pr-title.yml`), using the root-level `commitlint.rules.js` for custom rules.

The lint workflow run in CI pins to the published release (`@v2`), not the local source. Changes to `src/` will not be reflected in that check until a new release is cut.
