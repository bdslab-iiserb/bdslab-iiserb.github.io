# Biomedical Data Science Lab (BDS Lab) @ IISER Bhopal — Website

The official website of the Biomedical Data Science Lab at IISER Bhopal, live at
**https://bdslab-iiserb.github.io**.

This document is the **main reference for anyone maintaining the website**. It explains
how the site is built, how to run it locally, how to make common content updates, and
the **rules (norms) every contributor must follow** — including the branch → PR →
review → merge workflow that is mandatory from now on.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started Locally](#getting-started-locally)
- [Making Common Edits (The Easy Stuff)](#making-common-edits-the-easy-stuff)
- [Adding a New Course](#adding-a-new-course)
- [Deployment](#deployment)
- [Contribution Workflow & Norms](#contribution-workflow--norms)
- [Code Style](#code-style)
- [License](#license)

---

## Tech Stack

- **React 18** + **TypeScript** — UI and application logic
- **Vite 6** — build tool and dev server
- **Tailwind CSS 3** — styling
- **Framer Motion** — animations
- **React Router (HashRouter)** — routing (`/#/...` paths)
- **lucide-react** — icons
- **GitHub Actions** — automatic build and deploy to GitHub Pages

---

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml              # Builds & deploys on push to main
│   │   └── ci.yml                  # Runs build checks on every PR
│   └── PULL_REQUEST_TEMPLATE.md    # PR form contributors must fill in
├── public/
│   └── images/                     # ALL site images live here
│       ├── papers/                 # Publication preview images
│       └── gallery/                # Gallery images
├── src/
│   ├── App.tsx                     # Routes for all pages
│   ├── components/                 # Reusable UI components
│   ├── data/
│   │   ├── detailedProjectData.tsx # "Project Spotlights" on Research page
│   │   └── courses/                # Course content (TA-editable)
│   │       ├── index.ts            # Course registry
│   │       └── advancedNlp.tsx     # ★ All Advanced NLP course content
│   └── pages/                      # One file per page
│       ├── Home.tsx                # Hero, focus areas, news, videos
│       ├── Team.tsx                # Team members, alumni
│       ├── Research.tsx            # Focus, publications carousel, projects
│       ├── Gallery.tsx             # Photo gallery
│       ├── Courses.tsx             # Course listing page
│       ├── Courses/AdvancedNLP.tsx # Advanced NLP page (thin wrapper)
│       └── Contact.tsx             # Contact details, map
├── index.html
├── package.json
└── README.md
```

---

## Getting Started Locally

### Prerequisites

- **Node.js** version **18 or 20** (the deploy workflow uses Node 18)

### Install & run

```bash
# 1. Clone the repository
git clone https://github.com/bdslab-iiserb/bdslab-iiserb.github.io.git
cd bdslab-iiserb.github.io

# 2. Install dependencies (only once)
npm install

# 3. Start the dev server (hot reload)
npm run dev

# 4. Create a production build (also type-checks the whole project)
npm run build

# 5. Preview the production build locally
npm run preview

# 6. Lint the code
npm run lint
```

Open the URL printed by `npm run dev` (usually `http://localhost:5173`).

> **Always run `npm run build` before pushing.** It runs TypeScript type checking and
> will catch errors that would otherwise break the live site. The deploy pipeline runs
> this exact command.

---

## Making Common Edits (The Easy Stuff)

Most content lives in plain data structures. Find the file for what you want to change
and edit the text/values — you almost never need to touch styling or components.

| I want to change…                  | Edit this file                                             | Notes                                             |
| ---------------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| **Team members / alumni**          | `src/pages/Team.tsx`                                        | `supervisor`, `phdScholars`, `mastersStudents`, `bachelorsStudents`, `alumni` arrays |
| **Publications**                   | `src/pages/Research.tsx` + `public/images/papers/`          | Follow `PUBLICATIONS_GUIDE.md` for screenshots    |
| **Project spotlights**             | `src/data/detailedProjectData.tsx`                          | Modal project data                                |
| **News announcements**             | `src/pages/Home.tsx` (the news array)                       | Each news item has title, description, optional link |
| **Gallery photos / captions**      | `src/pages/Gallery.tsx` + `public/images/gallery/`          | Add the image file first, then its entry          |
| **Advanced NLP course content**    | `src/data/courses/advancedNlp.tsx` ★                        | The ONLY file TAs need to edit for the course     |
| **Contact details / map**          | `src/pages/Contact.tsx`                                     |                                                |
| **Site images (logos, photos)**    | `public/images/`                                            | Use lowercase descriptive filenames               |

### Adding images

1. Put the image file inside `public/images/` (or a subfolder such as `papers/` or `gallery/`).
2. Reference it with a **leading slash**: `/images/your-file.png`.
3. All data files in this project use a helper like `getImagePath('your-file.png')`.

### A note on quotes

Strings are written with single quotes. If your text contains an apostrophe, **escape
it** with a backslash (`Saisab\'s`) or use double quotes — an unescaped `'` breaks the
build. (See history: this caused build failures before.)

---

## Adding a New Course

Courses are designed so that **teaching assistants can own and update their course
content without touching page code**. One course = one data file.

1. **Copy** `src/data/courses/advancedNlp.tsx` to `src/data/courses/<your-course>.tsx`
   and replace the content (title, schedule, assignments, grading, announcements, etc.).
2. **Register** it in `src/data/courses/index.ts` by importing it and adding it to the
   `courses` array.
3. **Create a thin page** `src/pages/Courses/<YourCourse>.tsx`:
   ```tsx
   import CoursePage from '../../components/CoursePage';
   import { yourCourse } from '../../data/courses/yourCourse';

   export default function YourCourse() {
     return <CoursePage course={yourCourse} />;
   }
   ```
4. **Add the route** in `src/App.tsx`:
   ```tsx
   <Route path="/courses/your-course" element={<YourCourse />} />
   ```

> If you only need to update the **Advanced NLP** course content, edit
> `src/data/courses/advancedNlp.tsx` and nothing else.

---

## Deployment

The site is deployed automatically by GitHub Actions (**no manual steps**):

- **`deploy.yml`** runs on every push/merge to `main`. It installs dependencies, runs
  `npm run build`, and deploys the generated `dist/` to GitHub Pages.
- **`ci.yml`** runs on every pull request and verifies the project builds cleanly, so
  broken code cannot be merged by mistake.

Once a PR is merged to `main`, the live site updates in ~1–2 minutes.

---

## Contribution Workflow & Norms

> **Important — from now on, NO ONE pushes directly to `main`.**

Every change must go through the following flow:

1. **Create a separate branch** from the latest `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b <your-branch-name>
   ```
2. **Make your edits** on that branch.
3. **Commit** with a clear message (see [Commit style](#commit-style)).
4. **Push your branch**:
   ```bash
   git push origin <your-branch-name>
   ```
5. **Open a Pull Request (PR)** to `main` using the PR template.
6. **Get it reviewed by senior members of the lab** — at least one approval is required
   before merging.
7. **After approval**, merge the PR. The site deploys automatically.

### Norms every contributor must follow

| # | Rule |
|---| ---- |
| 1 | **No direct pushes to `main`.** Always use a branch + PR. |
| 2 | **Always create a new branch for each change.** Never do unrelated work in one branch. |
| 3 | **Use descriptive branch names**, e.g. `add-tanmay-paper`, `update-course-schedule`, `fix-team-photo`. |
| 4 | **Get at least one senior-lab-member review** before merging. Do not merge your own PR if you can avoid it. |
| 5 | **Run `npm run build` locally before pushing** — it must pass. |
| 6 | **Do not change files unrelated to your task.** Keep PRs small and focused. |
| 7 | **Never commit secrets or API keys.** If one is ever committed, revoke it immediately. |
| 8 | **Do not commit `node_modules/` or build output.** They are ignored by `.gitignore`. |
| 9 | **Use single quotes** and escape apostrophes in strings (see [A note on quotes](#a-note-on-quotes)). |
| 10 | **Reference images with a leading slash** (`/images/...`) and use descriptive lowercase filenames. |
| 11 | **Write clear commit messages and PR descriptions** so reviewers know exactly what changed and why. |
| 12 | **Update this README / the relevant guide** if you introduce a new pattern or file. |

### Commit style

- Short, imperative summaries: `Add Tanmay paper to publications`, `Fix Team page typo`.
- Add a short body when the change is non-obvious (what and why).
- Reference the PR/issue number when relevant.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow with step-by-step instructions.

---

## Code Style

- **TypeScript strict** — types are checked on build.
- **Functional React components** with hooks; avoid class components.
- **Tailwind utility classes** for all styling (no custom CSS unless necessary).
- **Framer Motion** for animations, following existing patterns.
- Existing components are the best reference — **match the surrounding code**.

---

## License

See [LICENSE](./LICENSE).
