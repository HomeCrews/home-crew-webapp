<!-- Base branch should be `main`.

     What changed and why belongs in the linked issue, not here. This
     template is the evidence that the change is ready to merge, not a
     description of it.

     If it is not ready, convert it to a draft - "Convert to draft" in the
     Reviewers section of the Conversation tab. -->

Closes #

## AppConfig changes

<!-- Config changes, or "No application property changes". Name every service
     that picks the change up, and say whether config-server has to be
     restarted for it to take effect. -->

## Local build output

    No toolchain in this repository yet.

<!-- Paste what you ran by hand and what you saw. When the Node toolchain
     lands, this becomes the install, build and test commands, and the
     checklist above grows a lint and a test line. -->

## Before review

- [ ] Self review: you read your own diff in the GitHub UI before requesting
      a review
- [ ] Verified by hand - there is no build gate in this repository, so the
      output above is the only evidence there is

<!-- Re-request review from anyone who left comments once you have addressed
     them - they are not notified otherwise. -->

## Impact

<!-- Tick only what applies. Nothing the hooks already enforce is listed
     here: formatting, Checkstyle, SpotBugs, coverage, secrets, branch name
     and commit format are all green or this branch could not have been
     pushed. -->

- [ ] Depends on a backend endpoint that does not exist yet - named below
- [ ] Toolchain or dependency added
- [ ] Nothing secret was added - nothing checks this repository automatically
- [ ] README updated
- [ ] None of the above; this is self-contained

## Before merge

- [ ] Branch is up to date with `main` and the full gate was re-run
      after the rebase or merge

<!-- Nothing is published or deployed from this repository on merge. -->
