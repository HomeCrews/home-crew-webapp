# home-crew-webapp

The web frontend for HomeCrew. Not yet scaffolded.

One of fifteen repositories that make up HomeCrew, a home-services marketplace
built as a Spring Boot microservice system. This one is a placeholder: it
currently holds `.editorconfig`, `.gitattributes` and these community files,
and nothing else.

## At a glance

| | |
|---|---|
| Stack | Node, not yet chosen |
| Talks to | the API gateway on 8080 |
| Default branch | `main` |
| Build | none yet |

## What it will be

A single-page frontend against the gateway. Every route the backend exposes
goes through `http://localhost:8080`:

    /users/**          /auth/**          /admin/**
    /bookings/**       /workers/**       /notifications/**
    /payments/**       /xp/**            /assignments/**

Bring the backend up from
[home-crew-infrastructure](https://github.com/HomeCrews/home-crew-infrastructure)
before working here:

    docker compose up -d
    curl http://localhost:8080/actuator/health

## Why the shared hooks are not installed here

The other twelve repositories share a POSIX `sh` hook set installed at
`core.hooksPath` by Maven. This repository will use husky, driven by its own
Node toolchain, and two hook managers fighting over `core.hooksPath` in one
repository is a guaranteed bad time. `apply.py` lists it in `HOOKS_OPT_OUT` so
that `--include-non-maven` cannot reinstate what was deliberately removed.

The conventions still apply - branch names, Conventional Commits, no secrets.
Nothing enforces them here yet. See
[CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Quality gates

This repository is deliberately outside the shared git hooks. There is no
Maven build here, so the Spotless, Checkstyle, SpotBugs and JaCoCo gates that
guard the twelve service repositories have nothing to bind to, and
`apply.py`'s `HOOKS_OPT_OUT` skips it.

The practical consequence is worth stating plainly: **nothing checks this
repository before a push.** No formatter, no secret scan, no branch-name
check. Review the diff yourself.

`.editorconfig` and `.gitattributes` are still generated from
`_standards/templates/`. Everything else here is hand-written.

## Related repositories

HomeCrew is fifteen repositories. The ones you are most likely to need next:

| Repository | What it is | Port |
|---|---|---|
| [home-crew-infrastructure](https://github.com/HomeCrews/home-crew-infrastructure) | docker compose topology and the Hetzner deploy | - |
| [home-crew-config](https://github.com/HomeCrews/home-crew-config) | shared configuration, served by config-server | - |
| [home-crew-service-discovery](https://github.com/HomeCrews/home-crew-service-discovery) | Eureka registry | 8761 |
| [home-crew-config-server](https://github.com/HomeCrews/home-crew-config-server) | Spring Cloud Config server | 8888 |
| [home-crew-api-gateway](https://github.com/HomeCrews/home-crew-api-gateway) | single entry point, routes to everything below | 8080 |
| [home-crew-user-service](https://github.com/HomeCrews/home-crew-user-service) | `/users/**` | 8081 |
| [home-crew-auth-service](https://github.com/HomeCrews/home-crew-auth-service) | `/auth/**` | 8082 |
| [home-crew-admin-service](https://github.com/HomeCrews/home-crew-admin-service) | `/admin/**` | 8083 |
| [home-crew-booking-service](https://github.com/HomeCrews/home-crew-booking-service) | `/bookings/**` | 8084 |
| [home-crew-worker-service](https://github.com/HomeCrews/home-crew-worker-service) | `/workers/**` | 8085 |
| [home-crew-notification-service](https://github.com/HomeCrews/home-crew-notification-service) | `/notifications/**` | 8086 |
| [home-crew-payment-service](https://github.com/HomeCrews/home-crew-payment-service) | `/payments/**` | 8087 |
| [home-crew-xp-service](https://github.com/HomeCrews/home-crew-xp-service) | `/xp/**` | 8088 |
| [home-crew-assignment-service](https://github.com/HomeCrews/home-crew-assignment-service) | `/assignments/**` | 8089 |
| [home-crew-webapp](https://github.com/HomeCrews/home-crew-webapp) | web frontend, not yet scaffolded | - |

## Licence

MIT. See [LICENSE](LICENSE).
