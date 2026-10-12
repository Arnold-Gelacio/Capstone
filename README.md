# TechFix — Computer Troubleshooting Guide

## Run
Double-click `index.html`. No server, install, or paid service is needed. Use a modern browser.

## Files
- `index.html`, `hardware.html`, `software.html`, `internet.html`, `diagnostics.html`, `maintenance.html`: the six pages (same header and footer).
- `style.css`: all styling (dark theme, mobile-first).
- `data.js`: all content (guides, wizard questions, checklist). Edit this to add or fix content.
- `script.js`: behavior (menu, search, guides, wizard, checklist).
- `DEFENSE_GUIDE.md`: study guide, code walkthrough, practice questions and demo checklist.
- `TESTING.md`: test table. Results start as NOT TESTED; fill in after you run each test.

## Modify
- Add a guide: add an object to `GUIDES` in `data.js` (it appears on its page and in search).
- Add a wizard question: add a node to `TREE`; every option must point to an existing node.

## Status
Code syntax was checked with Node. The pages have NOT yet been opened in a browser, so every test in `TESTING.md` is NOT TESTED.
