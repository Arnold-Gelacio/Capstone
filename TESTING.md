# Test Cases

Images: this site uses no image files, so image-loading tests do not apply.

| Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|
| Home page loads with hero, cards and footer | Page displays without errors |  | NOT TESTED |
| Hardware page loads and shows 8 guides | 8 expandable guides |  | NOT TESTED |
| Software page loads and shows 7 guides | 7 expandable guides |  | NOT TESTED |
| Internet page loads and shows 7 guides | 7 expandable guides |  | NOT TESTED |
| Diagnostics page loads wizard | First question shown |  | NOT TESTED |
| Maintenance page loads topics and checklist | 9 topics, 7 checkboxes |  | NOT TESTED |
| Tick checklist boxes | Counter shows e.g. "2 of 7 done" and updates on every change, including Reset |  | NOT TESTED |
| Every nav link opens the right page | Correct page, current page highlighted |  | NOT TESTED |
| All 8 home problem cards open the right guide | Guide opens automatically |  | NOT TESTED |
| Search 'no display' | Monitor guide listed |  | NOT TESTED |
| Search 'SLOW  Computer' (caps, extra spaces) | Slow performance guide listed |  | NOT TESTED |
| Empty search | Warning message shown |  | NOT TESTED |
| Search 'xyzabc' | No-results message with wizard link |  | NOT TESTED |
| Press Enter in search box | Search runs |  | NOT TESTED |
| Search with <b>html</b> text | Shown/ignored safely, no HTML injected |  | NOT TESTED |
| Wizard: power → no lights | Result links to power guide |  | NOT TESTED |
| Wizard: internet → other devices fail | Router result |  | NOT TESTED |
| Wizard Back button | Returns to previous question; disabled on step 1 |  | NOT TESTED |
| Wizard Restart | Returns to first question |  | NOT TESTED |
| Wizard unknown/unavailable option (edit TREE to a bad id) | Warning shown, no crash |  | NOT TESTED |
| Checklist check, reload, then Reset | State saved, then cleared |  | NOT TESTED |
| Mobile menu toggle at 360px | Menu opens and closes |  | NOT TESTED |
| No horizontal scroll at 360, 390, 768, 1024, 1440px | No sideways scrolling |  | NOT TESTED |
| Keyboard only: Tab, Enter, Space | All controls reachable, focus visible |  | NOT TESTED |
| Browser console on each page | No errors |  | NOT TESTED |
| Footer Home link and internal guide links | All work; no broken links |  | NOT TESTED |
