# Contributing to the BDS Lab Website

Thank you for helping maintain the BDS Lab website! This guide explains **how to make
changes the right way**. The most important rule:

> **Never push directly to `main`.** Every change goes through a branch, a pull
> request, and a review by senior members of the lab.

---

## The golden workflow (5 steps)

```
create branch → make edits → build & test → push → open PR → get reviewed → merge
```

### Step 1 — Create a branch

Always start from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b <your-branch-name>
```

Good branch names describe the change:

| Change                       | Branch name                    |
| ---------------------------- | ------------------------------ |
| Add a new paper              | `add-protoradnet-paper`        |
| Update course schedule       | `update-nlp-schedule`          |
| Fix a typo on the team page  | `fix-team-typo`                |
| Add a new course             | `add-dl-course`                |

### Step 2 — Make your edits

- Only change files related to your task.
- For common content changes, see the table in the [README](./README.md#making-common-edits-the-easy-stuff).
- Match the style of the surrounding code.

### Step 3 — Build and check before pushing

```bash
npm run build   # MUST pass — type-checks the whole project
npm run lint    # optional but recommended
```

Fix any errors before pushing. A broken build breaks the live site.

### Step 4 — Commit and push

```bash
git add <changed-files>        # never use `git add .` blindly
git commit -m "Short summary of the change"
git push origin <your-branch-name>
```

**Commit message style:**

- Imperative mood: `Add Tanmay paper to publications` (not `added`/`added stuff`).
- One summary line; add a short body when the "why" matters.
- Mention the issue/PR number when relevant.

### Step 5 — Open a pull request and get it reviewed

1. On GitHub, open a **Pull Request** from your branch → `main`.
2. Fill in the [PR template](./.github/PULL_REQUEST_TEMPLATE.md): what changed, how it
   was tested, screenshots if relevant.
3. The CI check (`ci.yml`) will run and must pass.
4. **Request a review from a senior lab member.** Merging requires at least one approval.
5. Address review comments by pushing more commits to the same branch.
6. Merge once approved. The site deploys automatically (GitHub Actions).

---

## What to check before opening a PR

- [ ] `npm run build` passes locally
- [ ] Branch is created from the latest `main`
- [ ] Only files related to the task were changed
- [ ] No secrets or API keys in the diff
- [ ] Images referenced with a leading slash (`/images/...`)
- [ ] Apostrophes in strings escaped (e.g. `Saisab\'s`)
- [ ] PR description filled using the template

---

## Reviewer checklist (for senior lab members)

- [ ] Change is scoped to the PR description — nothing unrelated
- [ ] Build passes (`npm run build`)
- [ ] Content is accurate (names, links, dates, data)
- [ ] No hardcoded secrets, no `node_modules`/build artifacts committed
- [ ] Images are present and correctly referenced
- [ ] Docs (README / guides) updated if a new pattern was introduced

---

## Notes for Teaching Assistants (course content)

If you maintain a course page, you only edit the course **data file** (e.g.
`src/data/courses/advancedNlp.tsx`) — no React code needed. Follow the branch → PR →
review workflow above for those edits too. See [Adding a New Course](./README.md#adding-a-new-course)
in the README.
