<!-- Base branch should be `main`.

     What changed and why belongs in the linked issue, not here. This
     template is the evidence that the change is ready to merge, not a
     description of it.

     If it is not ready, convert it to a draft - "Convert to draft" in the
     Reviewers section of the Conversation tab. -->

Closes #

## AppConfig changes

<!-- Configuration changes, or "No configuration changes".

     This is not a Spring application: nothing here comes from config-server,
     and the container inherits no DB_PASSWORD or Eureka settings. What counts
     as configuration is narrower:

       environments/ or a provided token   API base URL, feature flags
       nginx.conf                          routing, cache headers
       angular.json                        budgets, build options
       compose.dev.yml + .env.example      dev server, in home-crew-infrastructure

     Anything the browser can read is public. A value that must stay secret does
     not belong in a frontend at all. -->

## Local build output

The same four gates CI runs, with nothing skipped:

    $ npm run format:check && npm run lint && npm test && npm run build

<!-- Paste the real output. The build's bundle sizes are worth keeping in the
     PR: angular.json sets a 500kB warning and a 1MB error budget on the
     initial bundle, and a dependency that pushes it over is much easier to
     argue about here than after it merges. -->

## Before review

- [ ] Self review: you read your own diff in the GitHub UI before requesting
      a review
- [ ] Lint and format clean - not silenced with an `eslint-disable` that has no
      comment saying why
- [ ] Tests written for the new behaviour, not just passing for the old
- [ ] Accessibility: the template rules pass, and anything interactive is
      reachable by keyboard
- [ ] No `console.log` left behind - the lint rule allows `warn` and `error`
      only
- [ ] Bundle budget not exceeded; if it grew meaningfully, said so above

<!-- Re-request review from anyone who left comments once you have addressed
     them - they are not notified otherwise. -->

## Impact

<!-- Tick only what applies. Nothing the hooks already enforce is listed
     here: formatting, Checkstyle, SpotBugs, coverage, secrets, branch name
     and commit format are all green or this branch could not have been
     pushed. -->

- [ ] New dependency in `package.json` - and the bundle budget still passes
- [ ] New route added
- [ ] Depends on a backend endpoint that does not exist yet - named below
- [ ] Breaking change to how an endpoint is called
- [ ] `Dockerfile` or `nginx.conf` changed - the SPA fallback still serves deep
      links
- [ ] Port or image name changed - also updated `docker-compose.yml` and the
      deploy allow-list in `.github/workflows/deploy.yml` in
      home-crew-infrastructure
- [ ] `compose.dev.yml` or `webapp-dev.sh` affected - `./dev up` still works
- [ ] README updated - behaviour, setup or commands changed
- [ ] None of the above; this is self-contained

## Before merge

- [ ] Branch is up to date with `main` and the full gate was re-run
      after the rebase or merge

<!-- A merge to `main` - this repository's default branch - builds and publishes

         mthanuj/homecrew-webapp:latest

     and deploys nowhere. deploy.yml rejects any tag but `dev`.

     A push to `dev` publishes the `:dev` tag and dispatches to
     home-crew-infrastructure, which pulls and restarts the container on the
     Hetzner dev host.

     Note the asymmetry with the twelve service repositories: their default
     branch is `dev`, so their normal flow deploys. This one's default is
     `main`, so the normal flow does not. -->
