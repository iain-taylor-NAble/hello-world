---
sidebar_position: 10
---

# Sudden Idea

## Thinky time

**Thought:** I bet BackStage TechDocs is using some kind of .js or similar to offer the 'Raise GitHub Issue' function, and that injection into GitHub to create an issue is probably API calls. It's probably possible to replicate the experience in someway ourselves, but use Docusaurus as the static site generator rather than BackStage. I'll ask Copilot to look into it.

## Prompt

```txt title="The prompt"
You are an expert programmer, especially when it comes to the following tools:
- GitHub (and available extra tools, such as GitHub Issues, Pull Request comments)
- Docusaurus (and available extensions, plug-ins, etc.)
- VS Code (and available extensions)
- JavaScript
- BackStage TechDocs (and available extensions, plug-ins, etc.)
- Jira (and available extensions, plug-ins, etc.)
- API use for all the above API enabled tooled

BackStage TechDocs allows a live preview of the built documentation. A reader can highlight text, and is offered an on screen prompt to open a GitHub Issue. When the user selects this option, GitHub is opened in a new bowser tab, to the GitHub Issue screen, with the user presented with a pre-populated template in order to record the issue details. The template is also populated with the URL on which the text was highlighted, as well as the highlighted text itself.

I am hoping to be able to replicate this using VS Code, Docusaurus and GitHub, using API calls, and or already existing plug-ins or extensions etc. for those tools.
```

## Response

```txt title="The response"
Absolutely—Iain, you can replicate Backstage TechDocs’ “highlight → open pre‑filled GitHub Issue” flow with Docusaurus + GitHub (and tie in VS Code) without standing up any new backend. Below is a pragmatic, production‑ready approach, plus optional “bridge” pieces if you want the same UX inside VS Code.

What Backstage TechDocs does (in one paragraph)
Backstage renders docs and, via the TechDocs Addon framework, injects a <ReportIssue /> addon that watches text selections. When the reader highlights text, a small UI pops up; clicking it opens GitHub’s “New issue” page with a form pre‑filled with the page URL + the highlighted text. [backstage.io], [backstage.io], [docs.redhat.com]
We’ll reproduce the exact essence of that UX in Docusaurus using client‑side JavaScript and GitHub’s “pre‑filled new issue” URL parameters (or Issue Forms), and we’ll show how to add a VS Code workflow to complement it.

Solution overview
Core idea
Use a tiny Docusaurus client module that:

Detects user text selection (Selection API).
Shows a floating “Report an issue” button near the selection.
Builds a “new GitHub issue” URL that pre‑fills your chosen Issue template / Issue Form fields, including:

the page URL the reader was on, and
the exact highlighted text (with optional context).


Opens GitHub in a new tab.

No server required; it’s all client‑side + GitHub URL parameters (or, if you prefer, the REST API). [developer....ozilla.org]

Step 1 — Prepare GitHub Issues to accept pre‑filled data
Option A — Classic “new issue” URL query (fastest)
GitHub supports links like:
https://github.com/<owner>/<repo>/issues/new
  ?title=<url-encoded>
  &body=<url-encoded>
  &labels=documentation
  &template=docs_issue.md   # selects a Markdown template if you use one

You can include the page URL and the highlighted text in the body parameter. [npmjs.com], [stackoverflow.com]
Option B — Issue Forms (recommended for structured fields)
Create .github/ISSUE_TEMPLATE/docs-issue.yml with fields that have ids. You can then prefill them by adding ?template=docs-issue.yml&<field-id>=<value> to the URL. (This is a supported pattern—ids on form elements are addressable as query params.) [docs.github.com], [github.com]
Example Issue Form (YAML):
YAMLname: "Docs feedback"description: "Report a problem or suggest an improvement to the docs page you were reading."title: "[Docs]: <short description>"labels: [documentation]body:  - type: input    id: page_url    attributes:      label: "Page URL"      placeholder: "https://docs.example.com/..."    validations:      required: true  - type: textarea    id: selection    attributes:      label: "Highlighted text"      description: "The exact text you selected"      render: markdown  - type: textarea    id: details    attributes:      label: "What’s the issue?"      description: "Explain what’s wrong or what should change"      placeholder: "E.g., typo, broken example, missing context"Show more lines
(We’ll prefill page_url and selection from the Docusaurus client code.)

Note: Super‑long URLs can hit server limits (you’ll get 414 URI Too Long). It’s rare here, but we’ll defensively truncate the selection we send. [docs.github.com]


Step 2 — Add a tiny Docusaurus “highlight → Report issue” client module
Docusaurus lets you inject client code via a plugin or a theme swizzle. We’ll write a lightweight client that listens to mouseup, reads window.getSelection(), and shows a contextual button. The Selection API is standard and works across modern browsers. [developer....ozilla.org]

You can also place a persistent feedback widget by swizzling DocItemFooter or TOCItems if you’d like a fixed “Send feedback” button on every page—but the selection‑aware popup best mirrors TechDocs. [happyreact.com], [stackoverflow.com]

1) Create src/clientModules/report-issue.js:
JavaScript// Minimal, framework-agnostic client moduleconst GITHUB_OWNER = 'your-org';const GITHUB_REPO  = 'your-repo';// If you use Issue Forms, keep this file name in .github/ISSUE_TEMPLATE/const ISSUE_FORM   = 'docs-issue.yml';// Safety: avoid massive querystringsconst MAX_SELECTION_CHARS = 800;function buildIssueUrl({ pageUrl, selectionText }) {  // Trim selection to avoid 414s; also strip extraneous whitespace  const sel = (selectionText || '').trim().slice(0, MAX_SELECTION_CHARS);  // ---- Option A: Issue Forms with field ids ----  const params = new URLSearchParams({    template: ISSUE_FORM,    page_url: pageUrl,    selection: sel ? `> ${sel.replace(/\n/g, '\n> ')}` : '' // quote as Markdown  });  // ---- Option B (alternative): classic body/title ----  // const body = [  //   `**Page**: ${pageUrl}`,  //   sel && `**Selection**:\n\n> ${sel.replace(/\n/g, '\n> ')}`,  // ].filter(Boolean).join('\n\n');  // const params = new URLSearchParams({ title: 'Docs feedback', labels: 'documentation', body });  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?${params.toString()}`;}function createButton() {  const btn = document.createElement('button');  btn.textContent = 'Report issue';  btn.style.position = 'fixed';  btn.style.zIndex = 9999;  btn.style.padding = '8px 12px';  btn.style.borderRadius = '999px';  btn.style.border = '1px solid #ccc';  btn.style.background = '#fff';  btn.style.boxShadow = '0 2px 8px rgba(0,0,0,.12)';  btn.style.cursor = 'pointer';  btn.style.display = 'none'; // hidden by default  document.body.appendChild(btn);  return btn;}export function onRouteDidUpdate() {  // Run on first load and on client-side navigations  const button = createButton();  let lastSelection = '';  function hide() { button.style.display = 'none'; }  document.addEventListener('mousedown', hide);  document.addEventListener('mouseup', () => {    const sel = window.getSelection();    const text = sel ? sel.toString() : '';    if (!text || !sel.rangeCount) { hide(); return; }    lastSelection = text;    // Position the button near the selection    const rect = sel.getRangeAt(0).getBoundingClientRect();    const top  = Math.max(8, rect.top + window.scrollY - 40);    const left = Math.min(window.innerWidth - 140, rect.left + window.scrollX);    button.style.top = `${top}px`;    button.style.left = `${left}px`;    button.style.display = 'block';  });  button.addEventListener('click', () => {    const url = buildIssueUrl({      pageUrl: window.location.href,      selectionText: lastSelection,    });    window.open(url, '_blank', 'noopener,noreferrer');    hide();  });}Show more lines
2) Wire it in docusaurus.config.js as a client module:
JavaScript// docusaurus.config.jsexport default {  // ...  clientModules: [require.resolve('./src/clientModules/report-issue.js')],};Show more lines
That’s it—start your local site and try selecting any text. You’ll see a “Report issue” bubble that opens a pre‑filled issue. (Under the hood we’re using the standard Selection API.) [developer....ozilla.org]

Tip: If you already use “Edit this page” links (editUrl), keep them—they complement this workflow. You can compute edit links via editUrl or a function per doc. [docusaurus.io], [github.com]

Cross‑browser caveats: Backstage’s ReportIssue addon had a Safari‑specific bug at one point (the popup didn’t appear). Your custom code above is simple, but still regression‑test in Safari/Firefox/Chrome. [github.com]
Mobile caveat: If users have the GitHub mobile app installed, query params sometimes don’t prefill when the app intercepts the URL. Consider adding a note or fallback. [github.com]

Step 3 — VS Code: two complementary paths
A) “Out‑of‑the‑box” (no custom extension)
Install GitHub Pull Requests and Issues. It already supports commands such as “Create Issue from Selection” (and from TODO comments). That creates an issue with a permalink to the exact file/lines you selected, which is fantastic when your docs live as Markdown in a repo. [github.com], [github.com]

Marketplace: “GitHub Pull Requests and Issues” (official). [marketplac...studio.com]
Blog announcement (issues integration, commands, hovers): [code.visua...studio.com]


This gives writers and reviewers a fast, in‑editor path to create an issue tied to a code/MD permalink—ideal during authoring.

B) A small “bridge” VS Code extension (optional, if you want published docs URLs)
If you prefer issues to reference the published Docusaurus page URL (not the MD file lines), make a minimal extension that:

Reads the frontmatter slug or the doc id,
Constructs the Docusaurus permalink, and
Opens the same pre‑filled new issue URL you use on the site (Step 2).

Skeleton outline:

package.json: add a command, e.g., "docs.createIssueFromSelection".
extension.ts:

vscode.window.activeTextEditor.selection → get selected text
parse frontmatter (---) to get slug or id, or infer permalink from the file path (depends on your routing rules)
vscode.env.openExternal(vscode.Uri.parse(prefilledIssueUrl))




If you want to go further, you can query a JSON routes map produced at build time to guarantee accurate permalinks. Docusaurus lets you compute edit/per‑doc URLs using an editUrl function; you can use the same source of truth to emit a mapping. [docusaurus.io]


Step 4 — Nice extras & quality-of-life

Use a helper lib to build URLs safely. Example: new-github-issue-url (Node/JS). Handy in utilities/scripts. [npmjs.com], [github.com]
Default template & labels: set via Issue Templates / Forms, or pass labels=... in the URL (requires permission). [docs.github.com]
Jira parity (optional): if some teams use Jira, you can add a second button that builds a Jira “create” URL in the same way; but since your aim is GitHub parity with TechDocs, keep it out of v1.
Truncation rules: we already cap selection to 800 chars to keep URLs sane; adjust as needed (server 414s are the failure mode for ultra‑long URLs). [docs.github.com]


Why this matches TechDocs behavior

Selection detection + small popup near the highlight → same as TechDocs’ UX. [backstage.io]
Opens GitHub with pre‑populated template (Issue Forms/Template). [docs.github.com], [docs.github.com]
Includes page URL and highlighted text—exactly what readers expect.
No backend; fully static‑site friendly.


End‑to‑end test checklist

On your local Docusaurus dev server, highlight text → click “Report issue” → see GitHub “New issue” with fields prefilled.
Try with Issue Forms (Option B): verify page_url and selection fields are filled in. [docs.github.com]
Open same page on Safari, Firefox, Chrome; ensure popup positions and clicks work. (Safari had known issues on the TechDocs side; your code should be fine but test it.) [github.com]
On mobile with GitHub app installed, verify behavior; if prefill fails, the issue still opens but readers may need to paste text manually. [github.com]
In VS Code, select text in a doc file → “GitHub Issues: Create Issue from Selection” works and adds a code permalink. (If you build the custom bridge, also test that command and the Docusaurus URL computation.) [github.com]


Code you can drop in today

.github/ISSUE_TEMPLATE/docs-issue.yml (Issue Form) — copy the YAML above. [docs.github.com]
src/clientModules/report-issue.js — copy the client module above.
docusaurus.config.js — add the clientModules entry.
Optional: install the GitHub Pull Requests and Issues VS Code extension for your team. [marketplac...studio.com]


References & docs

Backstage TechDocs “Report issue” addon & Addons framework: [backstage.io], [backstage.io]
Red Hat’s TechDocs docs (same feature described): [docs.redhat.com]
GitHub Issue Forms & templates (YAML, ids, prefill): [docs.github.com], [docs.github.com]
Prefilled new issue URLs / helper libs: [npmjs.com], [github.com]
Selection API (used for highlight detection): [developer....ozilla.org]
Docusaurus edit link / plugin options (for route/edit mapping): [docusaurus.io]
VS Code GitHub Issues features incl. Create Issue from Selection: [github.com]
Mobile caveat (prefill sometimes not applied with GitHub mobile app): [github.com]
```
