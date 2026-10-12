# TechFix — Computer Troubleshooting Guide

## Run
Double-click `index.html`. No server, install, or paid service is needed. Use a modern browser.

## Files
- `index.html`, `hardware.html`, `software.html`, `internet.html`, `diagnostics.html`, `maintenance.html`: the six pages (same header and footer).
- `style.css`: all styling (dark theme, mobile-first), split into 13 labeled sections.
- `data.js`: all content (guides, wizard questions, checklist). Edit this to add or fix content.
- `script.js`: behavior (menu, search, guides, wizard, checklist), split into 9 numbered sections.
- `DEFENSE_GUIDE.md`: study guide, code walkthrough, practice questions and demo checklist.
- `TESTING.md`: test table. Results start as NOT TESTED; fill in after you run each test.

## Modify
- Add a guide: copy an object in `GUIDES` in `data.js` and change its fields (it appears on its page and in search). The comment at the top of `data.js` lists every field.
- Change a color: edit the variables in section 1 of `style.css`.
- Change the menu or footer: edit the `<header>`/`<footer>` block in each of the six HTML pages (they are marked with comments).
- Add a wizard question: add a node to `TREE`; every option's `next` must be an existing node, and every result's `guideId` must be an existing guide.

## Status
The code was reorganized for readability and checked automatically in a headless browser. You must still run the tests in `TESTING.md` yourself and fill in your own results; they stay NOT TESTED until you do.
