# TechFix Code Guide for the Capstone Defense

Read this once, then open each file and find the parts named here. Being able to point at the code and explain it in your own words matters more than memorizing.

## 1. The big picture
TechFix has **three layers**, like a restaurant:
| Layer | File | Role |
|---|---|---|
| Structure (the menu layout) | `*.html` | What is on each page |
| Looks (the decoration) | `style.css` | Colors, spacing, phone vs. computer layout |
| Behavior (the staff) | `script.js` + `data.js` | Search, wizard, menu, checklist |

**Key idea:** the pages are mostly empty shells. `script.js` reads the content from `data.js` and builds the page. To add a guide you edit one file (`data.js`), not six pages.

## 2. File by file

### HTML pages
Every page has the same pieces: `<header>` (brand + nav), `<main id="main">` (page content), `<footer>`, then two scripts: `data.js` first, then `script.js` (order matters, because script.js uses what data.js defines).
- `<body data-page="hardware">`: tells the script which nav link is the current page.
- `<div id="guides" data-cat="hardware">`: an empty box; the script fills it with that category's guides.
- `<details>` / `<summary>` (created by script): built-in expandable sections, no extra code needed.
- Skip link and `aria-*` attributes: accessibility for keyboard and screen-reader users.

### style.css
- `:root {--bg, --accent ...}`: **CSS variables**. Change one color here and the whole site changes.
- **Mobile-first**: base styles are for phones. `@media(min-width:768px)` and `1024px` add tablet and desktop layouts.
- `.grid`: CSS Grid, 1 column on phones, 2 on tablets, 4 on desktops.
- `:focus-visible`: the visible outline when using the keyboard.
- `nav ul {display:none}` and `nav ul.open {display:flex}`: how the mobile menu hides and shows.

### data.js (the content)
- `GUIDES`: array of objects. Fields: `id`, `cat`, `title`, `keywords` (search words), `description`, `causes`, `steps`, `observe` (what to watch for / next action), `safety`. The comment at the top of `data.js` explains every field.
- `TREE`: the wizard's decision tree (see section 4).
- `PROBLEM_CARDS`, `CHECKLIST`, `TOPICS`: content for the home cards and maintenance page. Every file starts with a comment that lists its sections, so you can find things quickly.

### script.js (the behavior)
The file is split into numbered sections (settings, helpers, menu, search, guides, cards, wizard, maintenance, start-up). Everything is inside one wrapper `(function(){ ... })();` so variables stay private. At the bottom, after the page loads (`DOMContentLoaded`), it calls each `init...` function. Each one first checks that its element exists (`if (!box) return;`), so the same script works safely on every page.

| Function | What it does |
|---|---|
| `makeElement(tag, text, className)` | Creates an element using `textContent`. Safe: text is never treated as HTML. Used everywhere to avoid repeating code. `makeList` and `makeButton` build on it. |
| `initNav` | Menu button toggles the `open` class; marks the current page with `aria-current`. |
| `normalize` | Lowercases, removes punctuation and extra spaces, trims plural "s". |
| `scoreGuide` / `runSearch` | Counts how many search words appear in a guide's title, keywords and description; shows matches sorted by score. Handles empty and no-match cases. |
| `initSearch` | Listens for the form `submit` event (this covers both the button and the Enter key). |
| `buildGuide` / `initGuides` | Builds each expandable guide; opens the one named in the URL (`software.html#sw-slow`); adds Expand/Collapse all. |
| `initCards` | Builds the 8 home problem cards from `PROBLEM_CARDS`. |
| `initWizard` | The diagnostic wizard (section 4). |
| `initTopics` / `initChecklist` | Build the topic cards, and the checklist with its "X of 7 done" counter; saves to `localStorage` inside `try/catch`. |

## 3. How search works (say this in your defense)
1. The user types "No Display!!" and submits.
2. `normalize` turns it into `["no","display"]`.
3. For each guide, count how many of those words appear in its title + keywords + description.
4. Keep guides with a score above 0, sort highest first, show them as links.
5. If nothing is typed, show a warning. If nothing matches, show a "no results" message.
It is **keyword matching**, not artificial intelligence. Say this honestly.

## 4. How the diagnostic wizard works
The tree is a set of named nodes. A question node has `options`; each option has a `label` and the `next` node. A result node has `isResult: true`.
```
start → "Computer will not start" → power → "No lights" → r_power (result)
```
- `path` is a list of visited node IDs (see `WIZARD_START_NODE` at the top of `script.js`). The current question is the last one.
- **Next:** `path.push(nextId)`. **Back:** `path.pop()`. **Restart:** `path = ["start"]`.
- **Safety:** before showing a step, the code checks `TREE[id]` exists (`showCurrentStep` and `chooseOption`). If not, it shows an error instead of crashing (this is how "undefined steps" are prevented).
- Results say "possible cause" because the website cannot inspect real hardware.
- I validated that every option points to an existing node and every result links to an existing guide.

## 5. Possible questions from the panel (practice answers)
1. **Why plain HTML/CSS/JS and no framework?** Free, runs offline, easy to explain, no installation.
2. **Why is content in data.js?** One place to edit; avoids copy-paste across pages; less chance of mistakes.
3. **How do you prevent unsafe input in search?** I build elements with `textContent`, so typed text is shown as text and never run as HTML.
4. **What if localStorage is blocked?** The `try/catch` catches it, shows a notice, and the checklist still works until the page is closed.
5. **Is this an AI diagnosing hardware?** No. It is a rule-based guide that follows a decision tree and suggests possible causes.
6. **How is it responsive?** Mobile-first CSS with Grid and `min-width` media queries at 768px and 1024px.
7. **How is it accessible?** Visible focus, skip link, labels, `aria-live` for search results, readable contrast, buttons at least 44px tall.
8. **What are the limits?** Basic guidance only; Windows-focused commands; not a replacement for a technician; keyword search can miss unusual wording.
9. **How would you add a new guide?** Add an object to `GUIDES` in `data.js` with a unique `id` and `cat`.
10. **What did you test and what bugs did you find?** Answer only from your real `TESTING.md` and bug records.

## 6. Practice exercises (do these before the defense)
1. Change `--accent` in `style.css` and refresh. What changed?
2. Add a new guide to `GUIDES` and search for it.
3. Add a new wizard question and result. Test Back and Restart on it.
4. Open the browser console (F12) and type `GUIDES.length`.
5. Resize the browser from wide to narrow and watch the cards and menu change.

## 7. Oral defense demo checklist
- [ ] Open `index.html` locally with no internet.
- [ ] Show the home page, then search for one known and one unknown word.
- [ ] Press Enter on an empty search.
- [ ] Click a problem card; show the guide, safety note and back button.
- [ ] Run the wizard to a result, use Back, then Restart.
- [ ] Show the maintenance checklist, reload to show it saved, then reset.
- [ ] Show the mobile menu (browser device mode or a phone).
- [ ] Open DevTools and show no console errors.
- [ ] Show `TESTING.md` with your real results and your real bug records.
- [ ] Open `data.js` and `script.js` and explain one function in your own words.
