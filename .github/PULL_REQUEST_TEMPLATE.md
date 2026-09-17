<!-- Base branch should be `main`. Delete any section that does not
     apply - an empty heading is noise. -->

## What changed

<!-- One paragraph. The diff is below; do not narrate it. Say what this makes
     possible, or what it stops happening. -->

## Why

<!-- Closes #123. If there is no issue, say what broke or what was missing. -->

## Build output

<!-- The tail of the gate, with the real numbers. This is not proof that it
     ran - the pre-push hook would have blocked you otherwise - it is so the
     reviewer can see coverage and test counts without checking out. -->

    No toolchain in this repository yet.

<!-- Paste what you ran by hand and what you saw. When the Node toolchain
     lands, this becomes the install, build and test commands. -->

## Failures and warnings

<!-- There is no build log here. Say what went wrong, what you skipped, and
     what you decided about it - a container that would not come up, a value
     that did not take effect, a warning you are living with. "None" is a
     real answer and a useful one. -->

## Impact

<!-- Tick only what applies. Nothing the hooks already enforce is listed here:
     formatting, Checkstyle, SpotBugs, coverage, secrets, branch name and
     commit format are all green or this branch could not have been pushed. -->

- [ ] Depends on a backend endpoint that does not exist yet - named below
- [ ] Toolchain or dependency added
- [ ] Nothing secret was added - nothing checks this repository automatically
- [ ] README updated
- [ ] None of the above; this is self-contained

## Risk

<!-- Blast radius. Which services break if this is wrong, what has to land
     first, and how you would roll it back. "None, additive" is a useful
     thing for a reviewer to read. -->
