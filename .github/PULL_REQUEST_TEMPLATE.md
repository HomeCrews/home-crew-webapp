<!-- Delete any section that does not apply. An empty heading is noise. -->

## What changed

<!-- One paragraph. The diff is below; do not narrate it. Say what this makes
     possible, or what it stops happening. -->

## Why

<!-- Closes #123. If there is no issue, say what broke or what was missing. -->

## How to verify

There is no toolchain in this repository yet. Describe by hand what you ran
and what you saw. When the Node toolchain lands, this section becomes the
install, build and test commands.

## Checklist

- [ ] Base branch is `main`
- [ ] Branch name is `dev__YYYYmmDD__lower_snake_name`
- [ ] Every commit subject is Conventional Commits, 100 characters or fewer
- [ ] No build gate in this repository yet - say what you ran by hand
- [ ] No secrets added - nothing checks this repository automatically
- [ ] README updated if behaviour, ports or setup changed

## Risk

<!-- Blast radius. Which services break if this is wrong? Does a config or
     compose change have to land first? Say "none, additive" if that is true -
     it is a useful thing for a reviewer to read. -->
