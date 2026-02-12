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
