---
sidebar_position: 8
---

# Recommendation: Backstage TechDocs

## Reasoning

I feel this is the current front runner, despite the potential secondary docs setup that may be required (potentially) able to use GitHub Sync or at least C+P source files into BackStage.

We could serve a live preview version of the user guides in BackStage (probably an internal resource)

Reviewers give feedback by selecting text on screen, and selecting the Raise GitHub Issue option

Pop-up is presented for review comment capture, which is created as a GitHub Issue.

Authors review GitHub Issues either in GitHub (a la InfoDev PR process)

- There exists potential to use VS Code extensions to display GitHub PRs and Issues in VS Code itself.
- There exists potential to tie Jira and GitHub such that Jira and GitHub Issues/PRs can be interconnected

With a tie into Jira, we can then use that **source of truth** for back and forth communications (which has been working for me in a few instances where Red Vildad had raised Jiras for various update requests).

### Envisioned Reviewer Flow

1. Browse to preview user guide
1. Highlight text where edit is requested, right-click the selection and create GitHub Issue
   ![review-1](/img/review-1.png)
1. Populate GitHub Issue template and confirm
1. Repeat as is necessary to raise change requests in the preview content
   ![review-2](/img/review-2.png)

### Envisioned Author Flow

1. Jira/GitHub content created by reviewer is checked (this can be via Jira, GitHub or VS Code)
   ![review-3](/img/review-3.png)
   ![review-4](/img/review-4.png)
1. Communication with reviewer via Jira comments (manual Jira creation or automated via GitHub/Jira tools)
1. Edits made in source files
1. When updates completed, preview content re-released from branch
1. Next review cycle begins
