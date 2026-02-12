---
sidebar_position: 2
---

# The Configs

Here I detail the changes made to the configs for this test website

## New Additions

- **Directory:** .github/ISSUE_TEMPLATE **File:** docs-issue.yml

This is the Issue template used when adding content to the issue to GitHub.

> This could possibly be extended to multiple templates for use if it is possible to create a selection of issue types to report from the Report Issue button.

```yaml title=".github\ISSUE_TEMPLATE\docs-issue.yml"
name: "Docs feedback"
description: "Report a problem or suggest an improvement."
title: "[Docs]: <short description>"
labels: [documentation]
body:
  - type: input
    id: page_url
    attributes:
      label: "Page URL"
      placeholder: "https://docs.example.com/..."
    validations:
      required: true

  - type: textarea
    id: selection
    attributes:
      label: "Highlighted text"
      description: "The exact text you selected"
      render: markdown

  - type: textarea
    id: details
    attributes:
      label: "What’s the issue?"
      placeholder: "Describe what’s wrong or what should change"
```

- **Directory:** src\clientModules **File:** report-issue.js

This script creates the Report Issue button to display on text selection.

> This could be expanded to possibly provide a selection of issue types, to select, would possibly be useful if this can be made public for Cx feedback submission.

```js title="src\clientModules\report-issue.js"
/* Detect highlighted text, show a floating "Report issue" button,
   and open a prefilled GitHub Issue Form.
*/

const GITHUB_OWNER = "iain-taylor-NAble"; // <-- change me
const GITHUB_REPO = "hello-world"; // <-- change me
const ISSUE_FORM = "docs-issue.yml"; // <-- your Issue Form filename
const MAX_SELECTION_CHARS = 800; // cap to avoid overly long URLs

function buildIssueUrl({ pageUrl, selectionText }) {
  const sel = (selectionText || "").trim().slice(0, MAX_SELECTION_CHARS);

  // Prefill Issue Form fields by their `id`s (page_url, selection)
  const params = new URLSearchParams({
    template: ISSUE_FORM,
    page_url: pageUrl,
    selection: sel ? `> ${sel.replace(/\n/g, "\n> ")}` : "",
  });

  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?${params.toString()}`;
}

function createButton() {
  const btn = document.createElement("button");
  btn.classList.add("docs-report-issue-btn");
  btn.textContent = "Report issue";
  btn.style.position = "fixed";
  btn.style.zIndex = 9999;
  btn.style.padding = "8px 12px";
  btn.style.borderRadius = "999px";
  btn.style.border = "1px solid #ccc";
  btn.style.background = "#fff";
  btn.style.boxShadow = "0 2px 8px rgba(0,0,0,.12)";
  btn.style.cursor = "pointer";
  btn.style.display = "none";
  btn.setAttribute("aria-label", "Report issue with selected text");
  document.body.appendChild(btn);
  return btn;
}

// Called on each client-side navigation in Docusaurus
export function onRouteDidUpdate() {
  const button = createButton();
  let lastSelection = "";

  const hide = () => {
    button.style.display = "none";
  };

  const hideOnDocumentMouseDown = (ev) => {
    // If the click is on the button, don't hide (let the click handler run)
    const target = ev.target;
    if (target && target.closest && target.closest(".docs-report-issue-btn")) {
      return;
    }
    button.style.display = "none";
  };

  // Also prevent the button's own mousedown from bubbling up
  document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    const text = sel ? sel.toString() : "";
    if (!text || !sel.rangeCount) {
      hide();
      return;
    }

    lastSelection = text;

    // Position the button near the selection
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    const top = Math.max(8, rect.top + window.scrollY - 40);
    const left = Math.min(window.innerWidth - 140, rect.left + window.scrollX);

    button.style.top = `${top}px`;
    button.style.left = `${left}px`;
    button.style.display = "block";
  });

  button.addEventListener("click", () => {
    const url = buildIssueUrl({
      pageUrl: window.location.href,
      selectionText: lastSelection,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    hide();
  });
}
```

## Edits to existing configs

The CSS needed a small update to control the Report Issue button colours, as whrn in Dark Mode it had white text on a white background, resulting in non-legible button text. This CSS addition overrides the defaults to apply the colours defined.

> This will need to be refined to adhere to Accessibility standards and our other style considerations.

```css title="src\css\custom.css"
/* Light mode (default) */
.docs-report-issue-btn {
  /* Text & border */
  color: #6900ce;
  border: 1px solid #6900ce;

  /* Background */
  background: #ffffff;
}

/* Dark mode (Docusaurus sets data-theme="dark" on <html>) */
html[data-theme="dark"] .docs-report-issue-btn {
  /* Text & border */
  color: #9033bf;

  /* Background */
  background: #1b1b1d !important;
  border-color: #303846 !important;
}
```

- **File:** docusaurus.config.js

Added the following command to call the Report Issue module javascript.

```js title="docusaurus.config.js"
 clientModules: [require.resolve("./src/clientModules/report-issue.js")],
```

This completes the additions and edits.
