# home-crew-webapp

The web frontend for HomeCrew. An Angular application, served as static files
by nginx.

One of fifteen repositories that make up HomeCrew, a home-services marketplace
built as a Spring Boot microservice system. This one is the only repository
that is not a JVM project.

## At a glance

| | |
|---|---|
| Stack | Angular 22, TypeScript, SCSS |
| Talks to | the API gateway on 8080, from the browser |
| Served by | nginx, from `dist/webapp/browser` |
| Local URL | http://localhost:4200 |
| Image | `mthanuj/homecrew-webapp:dev` |
| Compose service | `webapp` |
| Default branch | `main` |
| Tests | vitest, via `ng test` |

## Running it

With the rest of the stack, which is the easy way:

    cd ../home-crew-infrastructure
    cp .env.example .env
    ./dev up

That runs the dev server in a container with your checkout bind-mounted, so a
save rebuilds and the browser reloads. `node_modules` lives in a named volume
rather than in your checkout, so the first start is slow and later ones are not.

On its own, if you have Node 24 and a reachable npm registry:

    npm install
    npm start

## The lockfile

**There is no `package-lock.json` yet, and that is a known gap rather than a
choice.** Until one is committed:

- `Dockerfile` and CI both use `npm install`, not `npm ci`. `npm ci` requires a
  lockfile and exits non-zero without one.
- Builds are not reproducible. Two builds a week apart can resolve different
  patch versions.
- CI cannot cache npm downloads; `actions/setup-node`'s `cache: npm` also
  requires a lockfile.

To close it, on a machine that can reach the public registry:

    npm install --registry=https://registry.npmjs.org/
    grep -c 'registry.npmjs.org' package-lock.json      # should be most lines
    grep 'resolved' package-lock.json | grep -v 'registry.npmjs.org'   # expect none

then commit it and switch `npm install` to `npm ci` in `Dockerfile` and
`.github/workflows/ci.yml`, and add `cache: npm` to the setup-node step.

The check matters: `.npmrc` in this repo pins the public registry, but a
project-level `.npmrc` does **not** override `NPM_CONFIG_REGISTRY` in the
environment. On a machine that sets it to a private mirror, every `resolved`
URL in the lockfile records that mirror's hostname - which both leaks an
internal address and produces a lockfile nobody else can install from.

## Layout

    src/app/app.ts         root component
    src/app/app.html       root template
    src/app/app.routes.ts  routes (empty)
    src/app/app.config.ts  providers
    public/                static assets copied verbatim
    nginx.conf             SPA fallback and cache headers for the built image

`angular.json` pins `outputPath` to `dist/webapp` rather than leaving it to be
derived from the project name, because `Dockerfile` copies from
`dist/webapp/browser` and a rename would otherwise move it silently.

## Deployment

A push to `dev` builds the image, pushes `mthanuj/homecrew-webapp:dev` and a
`sha-<short>` tag to Docker Hub, then fires a `repository_dispatch` at
home-crew-infrastructure, which pulls and restarts the container on the Hetzner
dev host.

A push to `main` publishes `:latest` and stops there - `deploy.yml` rejects any
tag but `dev`.

## Quality gates

Unlike the twelve Java repositories, this one has no Spotless, Checkstyle,
SpotBugs or JaCoCo, and no shared git hooks - `_standards/apply.py` skips it
deliberately, because two hook managers fighting over `core.hooksPath` in one
repository is a guaranteed bad time. What runs instead:

| Gate | Tool | Runs at |
|---|---|---|
| Secrets | gitleaks | CI |
| Formatting | `prettier --check` | CI |
| Tests | vitest | CI |
| Build | `ng build` | CI |

Formatting is enforced in CI rather than at commit time. Run `npx prettier
--write .` before pushing, or wire up husky.

## Licence

MIT. See [LICENSE](LICENSE).
