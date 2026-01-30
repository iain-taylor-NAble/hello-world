---
sidebar_position: 1
---

# External Reviews in future tech stack

As we as a team transfer into a new tech stack, we have an opportunity to address current drawbacks in our current setup. One of these areas is the review process for content is not as smooth and efficient as it possibly could be.

## Scope and aims

This exploration is primarily focused on tools that we may consider and indicating what processes they lend themselves to or promote.

to facilitate the following reviewer & author experiences.

### Current situation

Our current process consists of:

1. Providing a 'mock online' version of the documentation as HTML and provide a link or a Word documents shared via SharePoint
   1. Flare project build
   2. Upload to AWS / Post to SharePoint
2. Reviewer then accesses and reviews for suitability
3. Feedback is provided via number of ad-hoc or 'informal' channels
   - Teams messaging or emails - reviewer needs to describe point in content, take screenshot, as well as the actual feedback
   - Word doc comments - easy to add, but lost upon file replacement when updates are actioned
4. Author then makes updates by comparing received feedback to source content, which is code not rendered
5. Content updates trigger step 1 again

### External reviewers

- Easy access to review material, browser based rather than a local tool for ease of adoption
- Rendered non-technical media to allow ease of reading for non-technical colleagues
- Reviewers feedback comments should be easy to add

### Authors

- If possible, map review comment back to source files in some fashion rather than rendered
- Utilise GitHub PR to maintain consistency of workspace process as per DeAnne's proposal for internal PR process.
- Include versioning/tracking/auditing

### Other considerations

- Should tie into currently planned future tech stack
  - VS Code
  - GitHub
  - Docusaurus
- Open source if possible
- Low or no cost for use
- Self-hosting option
- Utilization of currently available tools
  - Miro
  - Figma
  - Confluence
  - Jira
  - GitHub (possibly Rich diff feature?)
  - Backstage.io (may be in use in dev teams)

## Approach

1. My initial approach will be to draft a prompt for Copilot
2. Use that prompt to have Copilot generate a list of possible solutions created from the currently available tools
3. Re-generate the response twice more in fresh chats as this will create different responses
4. Review and cross reference the responses
5. Self review of tool & vendors suggested
6. Consideration of solutions
7. Reduce to three 'best' options
8. Recommend one of the three 'best' options
