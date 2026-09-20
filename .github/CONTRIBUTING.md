# Contributing to home-crew-webapp

One of fifteen repositories that make up HomeCrew. The rules below are
identical in all fifteen, and in the twelve Java services they are enforced by
blocking git hooks rather than discovered in CI.

## Before you start

Two things, once per clone.

**1. Node 24.** `package.json` declares `engines.node >= 24`, and the Dockerfile
and CI both use it. An older Node fails somewhere inside the Angular build
rather than telling you the version is wrong.

    node --version
    # nvm: nvm use     (reads .nvmrc)

**2. Dependencies.**

    npm install

There is no `package-lock.json` yet, so this resolves fresh every time and is
not reproducible. See the lockfile section in README.md - closing that gap needs
a machine that can reach the public npm registry.

No git hooks to install: this repository is in `apply.py`'s `HOOKS_OPT_OUT`, so
`core.hooksPath` is unset. If you also work in the twelve service repositories,
install gitleaks anyway - their pre-commit hook requires it.

    brew install gitleaks

## Branching

`dev` is the integration branch. `main` is the release branch. Everything else
is a feature branch off `dev`, named to a fixed shape:

```
dev                                    exempt
main                                   exempt
dev__YYYYmmDD__lower_snake_name        everything else
```

Lowercase only, single underscores inside the name, double underscores between
sections. The year must be last year, this year or next year - a cheap typo
catch.

```
dev__20260916__add_spotless_config     ok
feature/spotless                       rejected
dev__20260916__Add-Config              rejected
dev__19990916__old                     rejected (implausible year)
```

The `dev__` prefix is literal and applies even in the two repositories whose
default branch is `main`. There is no `main__` form. That reads oddly the
first time; it is the pattern, not a mistake.

## Commits

Conventional Commits, subject capped at 100 characters:

```
<type>[(scope)][!]: <description>
```

Types: `feat fix docs style refactor perf test build ci chore revert`. Merge,
revert, `fixup!` and `squash!` messages pass through untouched.

```
fix(docker): copy the jar by glob instead of a pinned filename
build: add formatting, lint and coverage gates with git hooks
ci: sync infrastructure config during deployment
```

Lowercase after the type, no trailing period, imperative mood. Say what the
commit does, not what you did.

## The local gate

No git hook runs here. This repository is in `apply.py`'s `HOOKS_OPT_OUT`, so
`core.hooksPath` is unset and nothing checks a commit or a push locally - the
branch-name and Conventional Commits rules are conventions here, not gates.

The gates are real, they just run in CI. Run the same four before you push and
you will not be surprised by the pull request:

    npm run format:check     # prettier
    npm run lint             # eslint, type-aware
    npm test                 # vitest
    npm run build            # ng build

`npm run lint:fix` and `npm run format` fix most of what the first two report.

CI also runs gitleaks over the whole tree. Nothing runs it for you locally:

    gitleaks git --staged --redact --no-banner

## Opening a pull request

Base the pull request on `main`.

One logical change per pull request. A formatting sweep and a behaviour change
in the same diff means the reviewer reads neither carefully.

Fill in the template. The checklist is not ceremony - every line on it maps to
something that will otherwise be caught later and more expensively. Read your
own diff in the GitHub UI before you request a review; it is a different
reading experience from `git diff` and it catches different things.

## Where things live

Fifteen repositories means the right fix is often not in the repository where
you noticed the problem.

| Changing | Edit |
|---|---|
| A shared configuration value | `home-crew-config/application.yml` |
| Ports, images, compose topology, the deploy | `home-crew-infrastructure/docker-compose.yml` |
| A quality rule, a hook, checkstyle, spotbugs | `_standards/templates/`, then `./apply.py` |
| The CI secret-scan step | `_standards/add-ci-scan.py` |
| These community files | `_standards/templates/github/`, then `./add-github-meta.py` |
| Behaviour of this service | here |

Hardcoding a value here that belongs in home-crew-config works locally and
then diverges across twelve services. Adding a port here without mirroring it
into docker-compose works locally and then fails on deploy.

## Notes

- **Nothing checks this repository before a push.** No hook runs locally. CI is
  the gate, so a red pull request is the first feedback unless you run the four
  commands above yourself.

- **There is no `package-lock.json`.** Builds are not reproducible and CI cannot
  cache npm downloads. `Dockerfile` and CI use `npm install` rather than
  `npm ci`, which would fail without a lockfile. README.md has the steps to fix
  it and why it needs a machine on the public registry.

- **`.editorconfig` and `.gitattributes` come from `_standards/templates/`**,
  but `apply.py` skips this repository, so edits here are not overwritten.

- **These community files are generated.** Everything under `.github/` except
  `workflows/` comes from `_standards/templates/github/` and is overwritten on
  every `add-github-meta.py` run. Change the template, not the copy.

## Code of conduct

By participating you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).
