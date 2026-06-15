# Agent Guidance

This repo implements `benhodgson87/conventional-pull-request-action` — a GitHub Action that:

- Lints PR titles against the Conventional Commits spec using `@commitlint/config-conventional` rules (customisable via a rules file)
- Optionally validates the PR scope against a regex (e.g. to enforce Jira ticket IDs)
- Optionally restricts scope enforcement to specific commit types (e.g. only `feat` and `fix` must include a valid scope)

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
npm run typecheck    # typecheck without emitting
npm run check        # format + lint (biome, auto-fix)
npm run check:ci     # format + lint (biome, no fix — used in CI)
npm run build        # compile src → lib, then bundle lib → dist
```

TypeScript is compiled with `strict: true` and `noImplicitAny: true` — all types must be explicit.

Tests live alongside source as `*.test.ts` files and are excluded from TypeScript compilation. Vitest is used as the test runner.

Biome handles formatting and linting. Config is in `biome.json` — read it before writing code. Run `npm run check` before committing.

## Adding or changing inputs

Action inputs are defined in `action.yml`. When adding or changing one:

1. Add/update the input in `action.yml`
2. Read it from the environment in `src/utils/config.ts` (inputs are available as `INPUT_<UPPERCASED_NAME>`)
3. Validate or parse the value in `config.ts` — return `undefined` if the env var is not set, throw a descriptive `Error` if it is set but invalid (see how `scopeRegex` handles a bad regex)
4. Update the README table with usage documentation

## Building

`dist/` is gitignored and built automatically — do not commit it manually. The flow is:

1. Merge a feature PR to `main`
2. Release Please opens a release PR (titled `chore: release vX.Y.Z`)
3. The `build-dist.yml` workflow detects the release PR and commits a fresh `dist/` build to it
4. Merging the release PR cuts a new GitHub release and tags `vX`, `vX.Y`, and `vX.Y.Z`

To build locally for inspection:

```bash
npm run build
```

## Pull requests

This repo uses conventional commits. PR titles are linted by the action itself (see `.github/workflows/lint-pr-title.yml`), using the root-level `commitlint.rules.js` for custom rules.

The lint workflow run in CI pins to the published release (`@v2`), not the local source. Changes to `src/` will not be reflected in that check until a new release is cut.
