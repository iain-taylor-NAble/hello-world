---
sidebar_position: 7
---

# The Shortlist

You may have spotted three smiley faces throughout the [Findings](findings.md). These are my top 3 picks from the plethora of suggestions made by Copilot.

Ideally, we would like to have a situation whereby:

- a reviewer can view a rendered version of the online user guide content update and be able to provide feedback using that.
- an author can minimise tool changes to action review feedback
- robust logging/tracking of work

There ares no currently available solutions that meet all the sought after aspects as detailed in [External Reviews in future tech stack](ext-review-intro.md).

My shortlist is based on overall fit with the caveat that one area looked for is not an ideal result.

## Shortlister 1: Backstage TechDocs

This seems to be a good fit, but negates the non-GitHub user aspect, as each reviewer does need a GitHub account. However actual use of GitHub for the reviewer is minimal.

Reviewer would be presented with an online build of the user guide. They can highlight text on the page, right-click and create a GitHub issue via a template that opens on screen that captures some key data and the reviewers highlighted text.

Unsure of comment reply/continuation in this setup - but as Jira is to be the source of truth, discussion around the raised issue should be recorded in the Jira comments regardless.

Requires a BackStage instance. As this is also a UI where a user can edit .md source files and see a rendered version side by side, it is the TechDocs add-on that provides the review GitHub issue functionality.

Maintaining a review version in a different tool may be too much overhead however, depending on whether or not the same source files used for Docusaurus can be used or not. If so, this may be a viable option.

Depending on source files required to mirror Docusaurus in BackStage TechDocs, there is other functionality in the tool we could leverage, such as links back to GitHub, Slack/Teams channels, or even an area to advise which author(s) to contact etc. if needed.

See this YouTube video: [How to make great documentation (TechDocs plugin) in Backstage (Demo)](https://www.youtube.com/watch?v=mOLCgdPw1iA)

It may also be possible using API to bridge to Jira (our source of truth) to also create updates to existing Jira (Review cycle Jira ticket for example).

Further, more in-depth research into this possible solution is warranted.

## Shortlister 2: Hypothes.is (public or private groups; open‑source, free service)

Web annotation layer on your preview site
Can use the Docusaurus preview as the review, would require a custom 'bridge' to return comments in review as TODO Comments in the .md and or open GitHub PR.

## Shortlister 3: Decap CMS (ex‑Netlify CMS) with Editorial Workflow

Git‑based CMS UI so non‑GitHub users can propose changes (instead of comments)
More a case of all reviewers are now editors. Each edit creates a branch and a PR - this may be too much (assuming each edit on a single page would create a branch and PR). May work with Docusaurus preview site rather than having to use Netlify if we self host.
