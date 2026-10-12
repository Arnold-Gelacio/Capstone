/* ==========================================================================
   TechFix behavior (script.js)
   --------------------------------------------------------------------------
   The HTML pages are mostly empty shells. This file reads the content from
   data.js (GUIDES, TREE, ...) and builds the page.

   Sections:
     1. Settings          values you may want to change
     2. Helper functions  small tools used everywhere
     3. Mobile menu
     4. Search
     5. Guide pages
     6. Home page cards
     7. Diagnostic wizard
     8. Maintenance page
     9. Start-up          runs everything when the page has loaded

   Every init function begins with "if (!element) return;" so the same
   script can safely run on all six pages.
   ========================================================================== */
(function () {
  "use strict"; // catches common mistakes such as using an undeclared variable

  /* ======================================================================
     1. SETTINGS
     ====================================================================== */
  const WIZARD_START_NODE = "start";          // name of the first wizard node in TREE
  const WIZARD_PROGRESS_PER_STEP = 25;        // progress bar grows 25% per step
  const CHECKLIST_STORAGE_KEY = "techfix-checklist"; // name used in localStorage

  /* ======================================================================
     2. HELPER FUNCTIONS
     ====================================================================== */

  // Shortcut for document.querySelector.  Example: $("#results")
  const $ = (selector, root = document) => root.querySelector(selector);

  // Create an element, e.g. makeElement("p", "Hello", "muted") -> <p class="muted">Hello</p>
  // It uses textContent, so text is never treated as HTML. This keeps
  // user input (like the search box) safe.
  function makeElement(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  // Create a <ul> or <ol> from an array of strings.
  function makeList(tag, items) {
    const list = makeElement(tag);
    items.forEach(item => list.appendChild(makeElement("li", item)));
    return list;
  }

  // Create a <button type="button"> that runs onClick when pressed.
  function makeButton(label, onClick, className = "btn") {
    const button = makeElement("button", label, className);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  // Find a guide by its id. Returns undefined if there is none.
  function findGuide(guideId) {
    return GUIDES.find(guide => guide.id === guideId);
  }

  // Link to a guide, e.g. "software.html#sw-slow"
  function guideUrl(guide) {
    return PAGE_OF[guide.cat] + "#" + guide.id;
  }

  /* ======================================================================
     3. MOBILE MENU
     ====================================================================== */
  function initNav() {
    const menuButton = $("#menu-btn");
    const menuList = $("#nav-list");
    if (!menuButton || !menuList) return;

    // Menu button shows/hides the list (CSS class "open") on phones.
    menuButton.addEventListener("click", () => {
      const isOpen = menuList.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Mark the link of the current page (matches <body data-page="...">).
    const currentPage = document.body.dataset.page;
    document.querySelectorAll("#nav-list a").forEach(link => {
      if (link.dataset.page === currentPage) link.setAttribute("aria-current", "page");
    });
  }

  /* ======================================================================
     4. SEARCH  (keyword matching, not artificial intelligence)
     ====================================================================== */

  // "No Display!!" -> ["no", "display"]
  // lowercase, remove punctuation, split into words, drop a plural "s".
  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean)
      .map(word => (word.length > 3 ? word.replace(/s$/, "") : word));
  }

  // Score = how many search words appear in the guide's title, keywords
  // and description.
  function scoreGuide(searchWords, guide) {
    const guideText = normalize(guide.title + " " + guide.keywords + " " + guide.description).join(" ");
    return searchWords.reduce((score, word) => score + (guideText.includes(word) ? 1 : 0), 0);
  }

  // Show a warning/info message in the results box.
  function showResultsMessage(box, text) {
    box.appendChild(makeElement("p", text, "msg warn"));
  }

  function runSearch(rawText) {
    const resultsBox = $("#results");
    if (!resultsBox) return;
    resultsBox.replaceChildren(); // clear old results

    const searchWords = normalize(rawText);

    // Case 1: nothing typed
    if (searchWords.length === 0) {
      showResultsMessage(resultsBox, "Please type a problem first, for example “no display” or “slow”.");
      return;
    }

    // Score every guide, keep those above 0, best match first.
    const matches = GUIDES
      .map(guide => ({ guide, score: scoreGuide(searchWords, guide) }))
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);

    // Case 2: nothing found
    if (matches.length === 0) {
      const message = makeElement("p", "No guides matched your search. Try different words, or ", "msg");
      const wizardLink = makeElement("a", "use the diagnostic wizard");
      wizardLink.href = "diagnostics.html";
      message.append(wizardLink, ".");
      resultsBox.appendChild(message);
      return;
    }

    // Case 3: show one card per match
    const grid = makeElement("div", undefined, "grid two");
    matches.forEach(({ guide }) => {
      const card = makeElement("a", undefined, "card");
      card.href = guideUrl(guide);
      card.append(makeElement("h3", guide.title), makeElement("span", guide.description, "muted"));
      grid.appendChild(card);
    });
    resultsBox.appendChild(grid);
  }

  function initSearch() {
    const form = $("#search-form");
    if (!form) return;
    // "submit" covers both the Search button and the Enter key.
    form.addEventListener("submit", event => {
      event.preventDefault(); // stop the page from reloading
      runSearch($("#q").value);
    });
  }

  /* ======================================================================
     5. GUIDE PAGES (hardware / software / internet)
     ====================================================================== */

  // Build one expandable guide: <details><summary>title</summary>...</details>
  function buildGuide(guide) {
    const details = makeElement("details");
    details.id = guide.id; // lets links like software.html#sw-slow find it
    details.appendChild(makeElement("summary", guide.title));

    const body = makeElement("div", undefined, "body");
    body.append(
      makeElement("p", guide.description),
      makeElement("h4", "Possible causes"),
      makeList("ul", guide.causes),
      makeElement("h4", "Troubleshooting steps"),
      makeList("ol", guide.steps),
      makeElement("h4", "What to observe / if the problem persists"),
      makeElement("p", guide.observe)
    );

    const safetyBox = makeElement("div", undefined, "safety");
    safetyBox.append(makeElement("strong", "Safety: "), document.createTextNode(guide.safety));
    body.appendChild(safetyBox);

    const backLink = makeElement("a", "Back to home", "btn alt back-link");
    backLink.href = "index.html";
    body.appendChild(backLink);

    details.appendChild(body);
    return details;
  }

  // "Expand all" and "Collapse all" buttons above the guides.
  function buildExpandCollapseButtons(guidesBox) {
    const toolbar = makeElement("div", undefined, "toolbar");
    [
      { label: "Expand all", open: true },
      { label: "Collapse all", open: false },
    ].forEach(({ label, open }) => {
      toolbar.appendChild(makeButton(label, () => {
        guidesBox.querySelectorAll("details").forEach(details => (details.open = open));
      }, "btn alt"));
    });
    return toolbar;
  }

  // Open the guide whose id matches the URL (#sw-slow) and scroll to it.
  function openGuideFromUrl() {
    const id = location.hash.slice(1); // remove the "#"
    const details = id && document.getElementById(id);
    if (details && details.tagName === "DETAILS") {
      details.open = true;
      details.scrollIntoView();
    }
  }

  function initGuides() {
    const guidesBox = $("#guides");
    if (!guidesBox) return;

    // Show only the guides of this page's category (data-cat="hardware", ...)
    GUIDES
      .filter(guide => guide.cat === guidesBox.dataset.cat)
      .forEach(guide => guidesBox.appendChild(buildGuide(guide)));

    guidesBox.before(buildExpandCollapseButtons(guidesBox));

    openGuideFromUrl();
    window.addEventListener("hashchange", openGuideFromUrl);
  }

  /* ======================================================================
     6. HOME PAGE CARDS
     ====================================================================== */
  function initCards() {
    const cardsBox = $("#problem-cards");
    if (!cardsBox) return;

    PROBLEM_CARDS.forEach(({ icon, title, guideId }) => {
      const guide = findGuide(guideId);
      if (!guide) {
        console.error("Problem card points to a missing guide:", guideId);
        return;
      }
      const card = makeElement("a", undefined, "card");
      card.href = guideUrl(guide);

      const iconElement = makeElement("div", icon, "icon");
      iconElement.setAttribute("aria-hidden", "true"); // emoji is decoration only
      card.append(iconElement, makeElement("h3", title));
      cardsBox.appendChild(card);
    });
  }

  /* ======================================================================
     7. DIAGNOSTIC WIZARD
     --------------------------------------------------------------------
     path    = list of node names visited, e.g. ["start", "power", "r_power"]
               The current node is the LAST item.
     answers = the answer labels the user clicked (shown as a trail).
     Next -> push onto path | Back -> pop | Restart -> reset to start.
     ====================================================================== */
  function initWizard() {
    const wizardBox = $("#wizard");
    if (!wizardBox) return;

    let path = [WIZARD_START_NODE];
    let answers = [];

    function restart() {
      path = [WIZARD_START_NODE];
      answers = [];
      showCurrentStep();
    }

    function goBack() {
      path.pop();
      answers.pop();
      showCurrentStep();
    }

    // Called when the user clicks an answer.
    function chooseOption(nextNodeId, label, statusMessage) {
      if (!TREE[nextNodeId]) { // safety: never move to a node that does not exist
        statusMessage.textContent = "That choice is not available. Please pick another.";
        statusMessage.hidden = false;
        return;
      }
      path.push(nextNodeId);
      answers.push(label);
      showCurrentStep();
    }

    // --- Pieces of the screen ---

    function buildProgress() {
      const bar = makeElement("div", undefined, "progress");
      const fill = makeElement("div");
      fill.style.width = Math.min(100, path.length * WIZARD_PROGRESS_PER_STEP) + "%";
      bar.appendChild(fill);
      return bar;
    }

    function showQuestion(node) {
      const statusMessage = makeElement("p", undefined, "msg warn"); // shown only on errors
      statusMessage.hidden = true;
      statusMessage.setAttribute("role", "alert");

      const optionsBox = makeElement("div", undefined, "opts");
      node.options.forEach(({ label, next }) => {
        optionsBox.appendChild(makeButton(label, () => chooseOption(next, label, statusMessage)));
      });

      wizardBox.append(makeElement("h2", node.question), optionsBox, statusMessage);
    }

    function showResult(node) {
      wizardBox.append(
        makeElement("h2", node.title),
        makeElement("p", node.explanation),
        makeElement("p", "These are possible causes only. This tool cannot inspect your computer.", "msg")
      );
      const guide = findGuide(node.guideId);
      if (guide) {
        const guideLink = makeElement("a", "Open the detailed guide", "btn");
        guideLink.href = guideUrl(guide);
        wizardBox.appendChild(guideLink);
      }
    }

    function showError() { // unexpected state: never show an undefined step
      wizardBox.appendChild(makeElement("p", "Something went wrong with the diagnostic. Please restart.", "msg warn"));
      wizardBox.appendChild(makeButton("Restart Diagnosis", restart));
    }

    // Draw the current step from scratch.
    function showCurrentStep() {
      wizardBox.replaceChildren();
      const node = TREE[path[path.length - 1]];

      if (!node) { showError(); return; }

      wizardBox.append(buildProgress(), makeElement("p", "Step " + path.length, "muted"));
      if (answers.length) {
        wizardBox.appendChild(makeElement("p", "Your answers: " + answers.join(" → "), "muted"));
      }

      if (node.isResult) showResult(node);
      else showQuestion(node);

      // Back and Restart buttons
      const navButtons = makeElement("div", undefined, "wizard-nav");
      const backButton = makeButton("Back", goBack, "btn alt");
      backButton.disabled = path.length < 2; // nothing to go back to on step 1
      navButtons.append(backButton, makeButton("Restart Diagnosis", restart, "btn alt"));
      wizardBox.appendChild(navButtons);
    }

    showCurrentStep();
  }

  /* ======================================================================
     8. MAINTENANCE PAGE
     ====================================================================== */
  function initTopics() {
    const topicsBox = $("#topics");
    if (!topicsBox) return;
    TOPICS.forEach(({ title, text }) => {
      const card = makeElement("div", undefined, "card");
      card.append(makeElement("h3", title), makeElement("p", text));
      topicsBox.appendChild(card);
    });
  }

  function initChecklist() {
    const checklistBox = $("#checklist");
    if (!checklistBox) return;

    const counter = $("#count");
    const storageNote = $("#storage-note");
    let storageWorks = true; // becomes false if the browser blocks localStorage

    function warnStorageBlocked() {
      storageWorks = false;
      if (storageNote) storageNote.hidden = false;
    }

    // Load the saved list of ticked item numbers, e.g. [0, 3].
    let savedItems = [];
    try {
      savedItems = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || "[]");
    } catch (error) {
      warnStorageBlocked();
    }

    const allCheckboxes = () => [...checklistBox.querySelectorAll("input")];

    function updateCounter() {
      if (!counter) return;
      const done = allCheckboxes().filter(box => box.checked).length;
      counter.textContent = done + " of " + CHECKLIST.length + " done";
    }

    // Called whenever a box changes (or on Reset): update the count and save.
    function saveChecklist() {
      updateCounter();
      if (!storageWorks) return;
      const tickedNumbers = allCheckboxes()
        .map((box, index) => (box.checked ? index : -1))
        .filter(index => index >= 0);
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(tickedNumbers));
      } catch (error) {
        warnStorageBlocked();
      }
    }

    // Build one checkbox row per CHECKLIST item.
    CHECKLIST.forEach((text, index) => {
      const row = makeElement("label", undefined, "check");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = savedItems.includes(index);
      checkbox.addEventListener("change", saveChecklist);
      row.append(checkbox, makeElement("span", text));
      checklistBox.appendChild(row);
    });
    updateCounter();

    const resetButton = $("#reset");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        allCheckboxes().forEach(box => (box.checked = false));
        saveChecklist();
      });
    }
  }

  /* ======================================================================
     9. START-UP
     Runs after the page has loaded. Each init function does nothing if
     its element is missing from the current page.
     ====================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initSearch();
    initGuides();
    initCards();
    initWizard();
    initTopics();
    initChecklist();
  });
})();
