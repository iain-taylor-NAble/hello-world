---
sidebar_position: 5
---

# Response 3

## 1) Preview deployments with built‑in, page‑anchored comments

### 1A. Netlify Deploy Previews + Netlify Drawer (Visual Reviews)

    **What it does:** Every PR gets a preview URL; reviewers open a built‑in Drawer to pin comments, annotate screenshots, record short videos, and (optionally) sync issues to Jira/GitHub/etc. Reviewers only need a free Netlify “Reviewer” account and the preview link. [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)], [[netlify.com](https://www.netlify.com/platform/core/deploy-previews/)], [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)], [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)], [[netlify.com](https://www.netlify.com/blog/2021/05/19/give-meaningful-feedback-with-collaborative-deploy-previews/)]

#### How it meets your criteria

    - **Medium:** Rendered preview of your Docusaurus doc site (host‑agnostic). [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)]
    - **Comments linked to location:** Comments are anchored to a specific on‑page region (screenshot/DOM context) in the preview; not literal source “line numbers”, but precise page coordinates/sections for writers to trace. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    - **Simple access:** Share a link; reviewers sign up (free) and comment in‑browser. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)]
    - **Version tracking:** Each PR → one preview URL; comments can sync into Jira/GitHub so the trail lands in your system of record. [[netlify.com](https://www.netlify.com/platform/core/deploy-previews/)], [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    - **Fits stack:** Works seamlessly with GitHub PRs and Docusaurus static builds. [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)]

#### Pros

    - Non‑GitHub reviewers can comment without learning Git. Free reviewer seats. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)]
    - Rich feedback (video, screenshots, annotations) + Jira integration. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    - Instant, true‑to‑final rendering (good for MDX components, styling regressions). [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)]

#### Cons

    - Not true line‑level mapping back to .md/.mdx. You’ll still resolve comments manually in the source, unless you add a lightweight “bridge” (see Bridge #1 below).
    - Requires enabling Netlify (you said AWS today but hosting “may change”—previews can be on Netlify while keeping prod elsewhere). [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)]

### 1B. Vercel Preview Deployments + Toolbar Comments

    **What it does:** Similar to Netlify—comment directly on preview deployments via the Vercel Toolbar (Figma‑style). Free on all plans; commenters need a Vercel account (external guests require certain plans). [[vercel.com](https://vercel.com/docs/comments)], [[techcrunch.com](https://techcrunch.com/2022/12/20/vercel-makes-it-easier-to-collaborate-on-preview-deployments/)]

    **Fit/flow is analogous to Netlify** (page‑anchored comments, PR‑scoped previews, notifications). [[vercel.com](https://vercel.com/docs/comments)]

#### Pros

    - Free feature; visual, page‑anchored threads; smooth PR preview experience. [[vercel.com](https://vercel.com/docs/comments)], [[techcrunch.com](https://techcrunch.com/2022/12/20/vercel-makes-it-easier-to-collaborate-on-preview-deployments/)]

#### Cons

    - Same caveat: no out‑of‑the‑box line mapping to .md/.mdx.
    - External guest commenting is plan‑dependent; everyone needs a Vercel account. [[vercel.com](https://vercel.com/docs/comments)]

    **Bridge #1 (for 1A/1B):** Add a small build‑time mapper that uses remark/unified to parse Markdown/MDX with positional data, then stores an element‑to‑source map (e.g., heading/id → file:line). Reviewers comment on an element or selection; your internal script resolves the element id + text quote to a file and approximate line. The unified/remark toolchain supports position info; MDX parsing is supported via remark-mdx. (You won’t get perfect round‑trip for every inline JSX, but it’s workable.) [[github.com](https://github.com/remarkjs/remark)], [[mdxjs.com](https://mdxjs.com/packages/remark-mdx/)], [[remark.js.org](https://remark.js.org/)]

## 2) Web annotation layer on your preview site

### 2A. Hypothes.is (public or private groups; open‑source, free service)

    **What it does:** Reviewers select text on the live preview, leave anchored annotations tied to exact text ranges via robust selectors (TextQuote/TextPosition). There’s an API to export annotations (for automation). Hypothesis can be embedded on the site (no browser extension needed). [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)], [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]

#### How it meets your criteria

    - **Medium:** Use your Docusaurus preview as the review surface (host anywhere). [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]
    - **Linked to location:** Text‑anchored (quote and position selectors) → highly precise and resilient to minor layout shifts. [[deepwiki.com](https://deepwiki.com/hypothesis/client/4.2-anchoring-and-highlighting)]
    - **Simple access:** Send a link; users log in once (free) and annotate in a group (private or public). [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]
    - **Version tracking:** Each annotation has a permalink; fetch data via API for audit trails or to create Jira issues. [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)], [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]
    - **Fits stack:** Add one script to your Docusaurus theme or client module; zero change to authoring flow. [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]

#### Pros

    - True text anchoring, often more reliable than click‑pin overlays. [[deepwiki.com](https://deepwiki.com/hypothesis/client/4.2-anchoring-and-highlighting)]
    - Open‑source; API enables your “export → script → apply” concept. [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]
    - Works across any host (AWS today, elsewhere tomorrow).

#### Cons

    - Requires Hypothesis accounts; private group setup adds a tiny bit of ceremony. [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]
    - Not a one‑click “create GitHub PR comment” out of the box—you’ll script that if desired (see Bridge #2 below).

    **Bridge #2:** Export annotations (via Hypothesis API) that include target selectors (text quotes and offsets). Use your unified/remark parse (with positions) to map the quote back to file:line and auto‑inject a TODO comment or open a GitHub PR suggestion. This gives you a repeatable machine‑assisted reconciliation loop. [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]

## 3. Git‑based CMS UI so non‑GitHub users can propose changes (instead of comments)

### 3A. Decap CMS (ex‑Netlify CMS) with Editorial Workflow

    **What it does:** Presents a friendly editor UI backed by your Git repo. Non‑technical users edit content via a web UI; the Editorial Workflow creates a branch/PR per change for you to review (no GitHub UI needed for reviewers). [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]

#### How it meets your criteria

    - **Medium:** Editor UI shows Markdown with preview; not pixel‑perfect site rendering, but keeps headings/lists/code—reduced “code” surface. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]
    - **Linked to location:** Edits produce a normal Git diff—line‑level by definition (in the PR), even though the reviewer never used GitHub directly. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]
    - **Simple access:** Host /admin behind your auth (e.g., Netlify Identity or OAuth). Editors click a link and type. [[netlify.com](https://www.netlify.com/integrations/decap/)]
    - **Version tracking:** Full Git history + PR workflow. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]
    - **Fits stack:** Pure Git + Markdown; works with Docusaurus content repos.

#### Pros

    - Eliminates the “comment vs change” gap—reviewers can propose precise edits.
    - True line‑level diffs without training people on GitHub.
    - Open‑source; free to run. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)], [[netlify.com](https://www.netlify.com/integrations/decap/)]

#### Cons

    - This turns reviewers into contributors (they’re editing), which some teams prefer; others want comment‑only.
    - Needs hosting and auth setup; preview of complex MDX widgets may be limited. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]

## 4. Use Confluence as a review surface (import, then comment inline)

    **What it does:** One‑off (or automated) import of Markdown → Confluence page, then let stakeholders use inline comments (anchored to text), page comments, and page history for versions. After review, writers reconcile changes back in Git. [confluence...assian.com], [community....assian.com]

### How it meets your criteria

    - **Medium:** Confluence page with inline comments (anchored to selected text). [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - **Linked to location:** Inline comments are text‑anchored to precise selections. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - **Simple access:** Most stakeholders already have Confluence access; commenting is dead simple. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - **Version tracking:** Page version history + resolved comment trail. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - **Fits stack:** Content originates in Git; you can script Markdown → Confluence sync with open‑source tools (e.g., mark, or Markdown‑to‑Confluence pipelines). [[github.com](https://github.com/kovetskiy/mark)], [[markdown-confluence.atlassian.net](https://markdown-confluence.atlassian.net/wiki/spaces/docs/pages/1442144/Markdown+to+Confluence+Tools)]

### Pros

    - Very low barrier for business reviewers; inline comments feel natural. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - Clear review audit (versions + resolved threads). [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - You can automate import/export in CI for review cycles (several OSS tools exist). [[github.com](https://github.com/kovetskiy/mark)], [[markdown-confluence.atlassian.net](https://markdown-confluence.atlassian.net/wiki/spaces/docs/pages/1442144/Markdown+to+Confluence+Tools)]

### Cons

    - Two sources (repo and Confluence) during review. Requires a reconciliation pass back to Markdown.
    - Formatting fidelity: standard Markdown is fine; complex MDX components won’t render. [[community.atlassian.com](https://community.atlassian.com/forums/Confluence-questions/Import-markdown-into-Confluence/qaq-p/211797)]

## 5. Per‑page comment widgets on the doc site

## 5A. Giscus (GitHub Discussions) / Utterances (GitHub Issues)

    **What they do:** Embed a comments widget on each docs page. Comments live in GitHub Discussions (Giscus) or GitHub Issues (Utterances). Many Docusaurus users adopt this for reader feedback. [[dev.to](https://dev.to/m19v/how-to-add-giscus-comments-to-docusaurus-439h)], [[handbook.hung.dev](https://handbook.hung.dev/blog/add-giscus-comments-docusaurus/)], [[alexfornuto.com](https://alexfornuto.com/blog/2024/04/01/giscus/)]

### Meets some of your criteria

    - **Medium:** Your live Docusaurus docs.
    - **Location:** Comments map to page URL/path (not line), i.e., page‑scoped threads. [[utteranc.es](https://utteranc.es/)]
    - **Simple access:** Requires GitHub login to comment (deal‑breaker for some non‑GitHub reviewers). [[utteranc.es](https://utteranc.es/)]
    - **Versioning:** All in GitHub Discussions/Issues; durable record. [[utteranc.es](https://utteranc.es/)]
    - **Fits stack:** Docusaurus integration is straightforward. [[dev.to](https://dev.to/m19v/how-to-add-giscus-comments-to-docusaurus-439h)], [[alexfornuto.com](https://alexfornuto.com/blog/2024/04/01/giscus/)]

### Pros

    - Free, OSS; tight GitHub integration; works well for post‑publication feedback. [[utteranc.es](https://utteranc.es/)]

### Cons

    - Not suitable if your reviewers don’t use GitHub.
    - Not line‑anchored (page‑scoped only). [[utteranc.es](https://utteranc.es/)]

## 6. Jira‑first feedback capture from the live preview (low‑cost SAAS)

### 6A. Marker.io widget on previews → auto‑create Jira issues

    **What it does:** Reviewers click a floating button on the preview site, capture a screenshot, annotate, and submit directly to Jira with URL, console logs, browser info. (Not open source, but inexpensive and reliable.) [[funkyspacemonkey.com](https://www.funkyspacemonkey.com/how-to-use-github-issues-to-create-a-comments-widget-for-your-blog-in-4-simple-steps)]

#### Meets some criteria

    - **Medium:** Live preview (Netlify/Vercel/your host).
    - **Location:** URL + screenshot with annotations; not line numbers.
    - **Simple access:** Click the button; comments land as Jira issues your team already uses.
    - **Versioning:** Tracked as Jira issues.

#### Pros

    - Zero learning curve; smooth Jira tie‑in; great for sign‑off UAT. [[funkyspacemonkey.com](https://www.funkyspacemonkey.com/how-to-use-github-issues-to-create-a-comments-widget-for-your-blog-in-4-simple-steps)]

#### Cons

    - Not open‑source; no direct mapping to source lines (you’d triage manually or via a bridge).

## 7. Use Backstage TechDocs (since you have Backstage)

    **What it does:** Backstage TechDocs renders Markdown‑based docs with a reader UI inside your internal portal. It also offers a feedback action pattern (commonly opens GitHub issues with permalinks to the page/section). Good for internal reviewers already in Backstage. (Line‑level mapping still requires a bridge.) [[github.com](https://github.com/facebook/docusaurus/blob/main/website/docs/guides/markdown-features/markdown-features-plugins.mdx)]

### Pros

    - Centralizes internal docs; reviewers already authenticated; easy to route feedback to GitHub issues per page. [[github.com](https://github.com/facebook/docusaurus/blob/main/website/docs/guides/markdown-features/markdown-features-plugins.mdx)]

### Cons

    -Not line‑level; setup/maintenance overhead; comments live as issues, not inline on text.

## Shortlist: Recommended solution patterns

### Pattern A — “Visual preview + text‑anchored capture + auto‑mapping” (balanced, low cost)

    1. **Host preview deployments** (Netlify or Vercel) for each PR. [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)], [[vercel.com](https://vercel.com/docs/comments)]
    2. **Enable Hypothes.is** on previews for precise text anchoring and lightweight accounts. [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]
    3. Add a small **bridge** in CI that:
        1. Pulls annotations via the Hypothesis API,
        2. Uses **remark/remark‑mdx** to parse sources with positions,
        3. Resolves selectors (quote + offset) to **file:line**, and
        4. Opens **Jira issues or PR review comments** referencing exact lines (or injects TODO comments). [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)], [[github.com](https://github.com/remarkjs/remark)], [[mdxjs.com](https://mdxjs.com/packages/remark-mdx/)]

#### Why this works for you

    - Reviewers get a one‑click link to a rendered site and “just highlight to comment.”
    - You get deterministic mapping to source lines with a small, maintainable script (your “bridge”).
    - Open‑source + free stack end‑to‑end.

#### Trade‑offs

    - Some maintenance for the bridge (edge cases with heavy MDX/JSX).
    - Reviewers create Hypothesis accounts (free) rather than Netlify/Vercel.

### Pattern B — “All‑in Netlify” (fastest to roll out, least custom work)

    1. Use Netlify Deploy Previews with the Netlify Drawer and free Reviewer role. [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)], [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)], [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)]
    2. Connect the Drawer to Jira so each comment can create/attach to a ticket with preview context. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    3. (Optional) Add a light bridge to translate Drawer comment metadata (URL + CSS selector or screenshot note) to file:line using a headings/anchor map built at compile time. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)], [[github.com](https://github.com/remarkjs/remark)]

#### Why this works

    - Easiest for reviewers—no extra tools beyond a free Netlify login; rich annotations in browser. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)]
    - Good Jira trail; strong fit with PR previews. [[netlify.com](https://www.netlify.com/platform/core/deploy-previews/)]

#### Trade‑offs

    - Still not native line‑level; a small mapping script is recommended if you need to automate reconciliation.

### Pattern C — “Reviewer edits instead of comments” (when change requests are concrete)

    1. Stand up Decap CMS on your docs repo with Editorial Workflow. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]
    2. Share a CMS link; reviewers edit the text (no GitHub exposure).
    3. The CMS opens a PR per change → you review/merge. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]

#### Why this works

    - Produces line‑level diffs automatically; no bridging needed.
    - Reviewers avoid GitHub but still deliver changes in the right place.

#### Trade‑offs

    - Changes rather than comments; not ideal for high‑level discussion or where reviewers must not edit.
    - Complex MDX widgets might not preview perfectly. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]

### Pattern D — “Confluence review lane” (maximal accessibility inside the org)

    1. Sync Markdown to Confluence (script or tool like mark/markdown‑confluence). [[github.com](https://github.com/kovetskiy/mark)], [[markdown-confluence.atlassian.net](https://markdown-confluence.atlassian.net/wiki/spaces/docs/pages/1442144/Markdown+to+Confluence+Tools)]
    2. Stakeholders use inline comments (anchored to exact text) + page history. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    3. Export comments or scrape via API and reconcile to repo (manual or scripted).

#### Why this works

    - **Zero learning curve** for non‑technical colleagues; precise inline comments and version history. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]

#### Trade‑offs

    - Parallel copy of content; reconcile back to Markdown after review.
    - Formatting parity with MDX isn’t guaranteed. [community....assian.com]

## What’s not a fit (based on your constraints)

    - **Giscus/Utterances** alone: great OSS options, but require GitHub login and are page‑scoped, not line‑anchored; they’re better for public reader feedback than internal stakeholder review if many reviewers don’t use GitHub. [utteranc.es], [dev.to]
    - **Miro/Figma** as the primary review medium: both are excellent for design reviews. They allow pin comments, but you’ll lose text anchoring, and mapping back to file:line is non‑trivial without heavy custom glue; they’re a last resort if you only need visual sign‑off. (No authoritative sources promise line‑level mapping here.)

## Bridge implementation ideas (concrete but high‑level)

### Selector‑to‑source mapping (Netlify/Vercel/Hypothesis)

    1. At build time, run a unified/remark pipeline to parse each .md/.mdx file with positions and emit a JSON map [[github.com](https://github.com/remarkjs/remark)], [[mdxjs.com](https://mdxjs.com/packages/remark-mdx/)], [[remark.js.org](https://remark.js.org/)] :

```json title="JSON map"
{ pagePath → [ {id|heading|textSnippet, file, lineStart, lineEnd} ] }
```

    2. Your bridge reads review data (Netlify Drawer export via Jira issue body or Hypothesis API rows) and resolves the anchor/quote against that JSON to pin a file:line. [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]
    3. Emit Jira subtasks or GitHub code suggestions pointing to those lines.

### Confluence sync

    1. Use an import tool (e.g., mark or markdown‑confluence CLI) in CI to publish a “review” space. After review, fetch comments via Confluence REST and attach them to PRs (description/tasks). [[github.com](https://github.com/kovetskiy/mark)], [[markdown-confluence.atlassian.net](https://markdown-confluence.atlassian.net/wiki/spaces/docs/pages/1442144/Markdown+to+Confluence+Tools)]

## Sources & Evidence

### Netlify (Deploy Previews & Drawer, Reviewer role)

    - Docs: Deploy Previews (how previews work, shareable URLs) [[docs.netlify.com](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)]
    - Product page: comments/annotations + Jira/GitHub integration [[netlify.com](https://www.netlify.com/platform/core/deploy-previews/)]
    - Netlify Drawer overview (annotations, issues sync, unlimited free Reviewers) [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    - Reviewer Quickstart (free reviewer accounts, flow) [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/netlify-reviewer-quickstart/)]
    - Blog explainer (how reviewers leave feedback from a preview) [[netlify.com](https://www.netlify.com/blog/2021/05/19/give-meaningful-feedback-with-collaborative-deploy-previews/)]

### Vercel (Preview comments)

    - Comments Overview (toolbar, availability, accounts) [[vercel.com](https://vercel.com/docs/comments)]
    - TechCrunch coverage (commenting on previews GA) [[techcrunch.com](https://techcrunch.com/2022/12/20/vercel-makes-it-easier-to-collaborate-on-preview-deployments/)]
    - General docs (preview environments in Vercel) [[vercel.com](https://vercel.com/docs)]

### Hypothes.is (annotations & API)

    - Annotation basics (embedding, groups, permalinks) [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)]
    - API v1 reference (export/search annotations) [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]
    - Anchoring model (TextQuote/TextPosition selectors) [[deepwiki.com](https://deepwiki.com/hypothesis/client/4.2-anchoring-and-highlighting)]

### Markdown/MDX parsing (for bridges)

    - remark/unified (Markdown AST with positions) [[github.com](https://github.com/remarkjs/remark)], [[remark.js.org](https://remark.js.org/)]
    - remark‑mdx (MDX parsing support) [[mdxjs.com](https://mdxjs.com/packages/remark-mdx/)]

### Confluence (inline comments; Markdown pathways)

    - Inline/page comments (how inline comments work) [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)]
    - Community: Markdown into Confluence (supported approaches/limitations) [[community.atlassian.com](https://community.atlassian.com/forums/Confluence-questions/Import-markdown-into-Confluence/qaq-p/211797)]
    - OSS tools for MD → Confluence (mark, markdown‑confluence) [[github.com](https://github.com/kovetskiy/mark)], [[markdown-confluence.atlassian.net](https://markdown-confluence.atlassian.net/wiki/spaces/docs/pages/1442144/Markdown+to+Confluence+Tools)]

### Giscus / Utterances (page comment widgets)

    - Giscus with Docusaurus (setup guides) [[dev.to](https://dev.to/m19v/how-to-add-giscus-comments-to-docusaurus-439h)], [[alexfornuto.com](https://alexfornuto.com/blog/2024/04/01/giscus/)]
    - Utterances project page & docs (GitHub login required; mapping is per page) [[utteranc.es](https://utteranc.es/)]

### Backstage / TechDocs (MDX plugins & feedback patterns)

    - Docusaurus MDX plugins (remark/rehype pipeline context if you extend) [[github.com](https://github.com/facebook/docusaurus/blob/main/website/docs/guides/markdown-features/markdown-features-plugins.mdx)]

### Jira capture widget (optional)

    - Marker.io: GitHub/Issues/Jira capture from live pages (overview) [[funkyspacemonkey.com](https://www.funkyspacemonkey.com/how-to-use-github-issues-to-create-a-comments-widget-for-your-blog-in-4-simple-steps)]

## AI bottom line recommendations

    - If you want lowest friction for reviewers and rich context, choose Pattern B (Netlify Drawer) and optionally build the tiny selector → file:line bridge later as you scale. [[docs.netlify.com](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/)]
    - If you want open‑source + precise text anchoring with a clean export, use Pattern A (Hypothes.is on previews) and implement the bridge from day one. [[web.hypothes.is](https://web.hypothes.is/help/annotation-basics/)], [[h.readthedocs.io](https://h.readthedocs.io/en/latest/api-reference/v1/)]
    - If your stakeholders prefer “just let me fix the text” over commenting, stand up Decap CMS with Editorial Workflow so changes arrive as line‑level PRs without exposing GitHub. [[decapcms.org](https://decapcms.org/docs/editorial-workflows/)]
    - For teams living in Confluence, Pattern D is pragmatic: import Markdown, review with inline comments, reconcile back via script. It’s not “pure” but it’s proven and quick to adopt. [[confluence.atlassian.com](https://confluence.atlassian.com/doc/comment-on-pages-and-blog-posts-139483.html)], [[github.com](https://github.com/kovetskiy/mark)]
