---
sidebar_position: 6
---

# Findings

## Response 1

### Suggestion A1 - 3

Group A is based on the prioroty of “Preview deployments with native commenting” (URL‑based live previews per PR)

#### A1 Vercel Preview Deployments + Vercel Comments

Large product, more aimed at developers, we'd only se a small portion. The 'comments' functionality is a separate comment thread on the built pages via a view of the page, and the comment pin location on the page, with comments pane down the left hand side.
Charges for use over a defined 'credit' limit. Credits are used during build, access, etc. Going over credit incurs a charge, more credits can be bought.

- Likely to be a paid for usage situation for us.
- More suited to actual code development (applications and such rather than documentation).

#### A2 Netlify Deploy Previews + Collaborative Comments (“Netlify Drawer”)

Smaller than Vercel, more aimed at website creation, so again perhaps a little more tool than we need. Commenting functionality is similar to Vercels. Usage billing. Cost per preview server.

- Like Vercel, but more aligned to websites - may be a better fit for us.
- Likely we will incur costs on our usage for the service

#### A3 Cloudflare Pages Preview Deployments (+ GitHub Action for PR comment)

Not really suitable, again more for application developers than websites/user guides. Doesn't have the commenting feature and pushes user back into GitHub for PRs.

#### Selection from group

- None

### Suggestion B1 - 2

Group B is based in a priority of Embed a comments widget into Docusaurus pages” (per‑page threads)

#### B1 Giscus (GitHub Discussions‑backed) embedded in Docusaurus

#### B2 Utterances (GitHub Issues‑backed) or CommentBox/Docsly embeds

Not suitable - these creates a situation where readers can add 'comments' to a page - much like Facebook or YouTube. Although it does tie into GitHub for storing the comments, this is more a place to store than any real linking or review process facilitating.

### Suggestion C

Groups C is primarily concerned with “Universal web annotation overlay” (inline to text selections on the rendered page)

#### Hypothesis (Hypothes.is) annotations on your preview or staging doc site

Would mean new tool adoption throughout the business. Usage would be to create 'annotations' on a pre-view URL. Can limit user to non-public facing. Authors would still need to compare the review media to the source. No tie back to anything for auditing. Annotations do have timestamps etc. Any export/triage back to source would be a DIY bridge or manual effort.

- Tool gives a good UI, doesn't look hard to use or adopt.
- Lack of suitable audit/tracking
- Needs a DIY bridge to tie into existing stack

### Suggestion D

Group D is an approach of “Docs as pages in a collaboration suite” (Confluence as the review medium)

#### Publish review snapshots to Confluence and use Confluence inline comments

This is a poor idea as it only really addresses ease of reviewer use via Confluence, which almost all colleagues will be (to varying degrees), but doesn't improve the external review process or make it easier for reviewers or authors.

### Suggestion E

Group E is focused on “Git‑backed editorial UI” (non‑technical authors edit Markdown via a CMS UI)

#### Decap CMS (formerly Netlify CMS) — Editorial Workflow

Looked promising, but it is ultimately an editor - reviewers would amend the preview files. Uses Git.

### Suggestion F :smile:

Group F is using our (possibly) current tools, "Backstage TechDocs” (since you have Backstage)

#### Backstage TechDocs

Uses Docs-like-code viewing - opens a GitHub issue with template for info - keeps feedback and updates in GitHub.
See this YouTube video: [How to make great documentation (TechDocs plugin) in Backstage (Demo)](https://www.youtube.com/watch?v=mOLCgdPw1iA)

Does require a BackStage instance - may be extra overhead to maintain.

As Jira is to be our source of truth, this may need a look into some kind of bridge or linking between Jira and GitHub.

### Suggestion G

Group G keeps everything in GitHub using GitHubs Rich Diff - disregards non-tech and non-GitHub users

#### Use GitHub PRs—but make them friendlier

Does keep comments in-line in the repo - requires users to understand and be able to use GitHub, no rendered view of content.

## Response 2

### Suggestion 1

Tools That Add Google‑Docs‑Style Commenting to Markdown (Most Direct Fit)

#### SideMarkr (Browser‑based Markdown with Inline Comments)

This seems like a good route to keep an eye on, and warrants further investigation. SideMarker gives a side-by-side-by-side view of content editor, rendered content and comments listing.

Allows text select in rendered view, and adding a comment. The selected text is highlighted in both the rendered view and editor.

Looks like tie back into GitHub is on the roadmap as well.

Can export/import files - may be able to tie to repo in the future

Currently only available online, website is a one pager with a live demo tho'

I like this options future potential, but probably not suitable just now.

### Suggestion 2

Tools That Provide Structured Document Review Workflows (Git‑less MDX Systems)

#### QuickMDX

Quick MDX website is blocked via work laptop. Attmpted via mobile. Account creation caused HTTP 500 (internal server) error. No emails received from website, cannot create account as already exists from 1st attempt. Forgot password process also failed, no reset email received.

Chalking this one up as an unsecure tool, and not for consideration.

### Suggestion 3

Tools That Provide Collaborative Markdown Editing (Partially Fits)

#### HackMD :smile: / CodiMD

HackMD may be an option. CodiMD is not, nor is HedgeDoc. HackMD is available free, but our use may mean we will need paid licences perhaps.

UI allows 'comments'and 'suggest edits' (highlighted in rendered view in blue and green respectively). Suggested edits can be actioned by clicking an accept edit button.

Looks promising, may incur a per person per month cost ($5-$8)

### Suggestion 4a-b

Tools Your Team Already Uses – Possible Integrations

#### (a) Confluence

#### (b) Figma / Miro

These suggestions are about as good and bad as our current Word doc approach.

### Suggestion 5

Tools That Support Guest Commenting on Markdown (GitHub‑adjacent)

#### Holocron (from Awesome Markdown Editors list) :smile:

Unable to determine much about Holocron - website is very AI built looking, similar to many others in this space. Unable to find demo content, such as YT videos/tutorials etc.

May need to setup and explore to get a feel for suitability. According to the [description](https://github.com/mundimark/awesome-markdown-editors) on GitHub, this allows acceptance of suggestions and opens a GitHub PR.

### Suggestion 6

GitHub‑Native Solutions (But Less Suitable for Non‑Technical Reviewers)

#### GitHub Rich Diff + PR Review

THis isn't suitable really, we're looking for non techy users having a nice time!

## Response 3

### Suggestion 1a-b

Preview deployments with built‑in, page‑anchored comments

#### 1a Netlify Deploy Previews + Netlify Drawer (Visual Reviews)

Already covered in response 1 and disregarded.

#### 1b Vercel Preview Deployments + Toolbar Comments

As before, Figma-style not really suitable.

### Suggestion 2 :smile:

Web annotation layer on your preview site

#### Hypothes.is (public or private groups; open‑source, free service)

Can use the Docusaurus preview as the review, would require a custom 'bridge' to return comments in review as TODO Comments in the .md and or open GitHub PR.

### Suggestion 3 :smile:

Git‑based CMS UI so non‑GitHub users can propose changes (instead of comments)

#### Decap CMS (ex‑Netlify CMS) with Editorial Workflow

More a case of all reviewers are now editors. Each edit creates a branch and a PR - this may be too much (assuming each edit on a single page would create a branch and PR).
May work with Docusaurus preview site rather than having to use Netlify if we self host.

### Suggestion 4

Current tools again

#### Use Confluence as a review surface (import, then comment inline)

Detailed before, causes more work than we generate now.

### Suggestion 5

Per‑page comment widgets on the doc site

#### Giscus (GitHub Discussions) / Utterances (GitHub Issues)

This has been covered already.

### Suggesition 6

Jira‑first feedback capture from the live preview (low‑cost SAAS)

#### Marker.io widget on previews → auto‑create Jira issues

This setup ties to Jira and GitHub issues, but also creates a comments section on the page like Facebook or YouTube. Not suitable really. Could potentially be limited to preview site. COmments are raised as a GitHub Issue, and versioning is through Jira issues.

### Suggestion 7

Current tools focus

#### Use Backstage TechDocs

Covered previously
