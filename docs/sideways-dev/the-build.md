---
sidebar_position: 3
---

# The Build

The build hit some snags, mainly due to Copilots slightly inconsistent config setup throughout the vibe coding session. Overall, the process was straight forward as I always requested explanations and examples and pointed out when things did not operate as expected.

The initial iteration revealed a styling issue, whereby the default webpage Light/Dark mode colours were not suitable for the button's Dark Mode appearance. This caused an addition to custom.css to control the Report Button style and colour (background, border and text).

In another iteration, the Report Issue button was non-functional. This transpired to be a timing issue. On clicking, the button was being closed before the call to open a GitHub Issue could fire. This resulted in changes to the 'create button' function in javascript. Copilot anticipated another issue where on click hiding configs were spilling to further sections of the webpage, and not being restricted to the button. Some code updates and re-ordering of when functions fire, as well as guarding against these spilling to the webpage.

Once the button was behaving, a test was performed. I was taken to GitHub, with an Issue prepopulated with some information. I noted however, I had to login into GitHub to complete the process. I was automatically logged into GitHub with my business account, so this approach would work well for reviewers who already have GitHub accounts.

I repeated the test again, this time using an InPrivate browser tab. Again I had to log into GitHub to complete the process. I logged in using my own personal GitHub account, which is not linked to the business account. I was able to complete the issue reporting process.

I had previously installed a few different VS Code extensions to sync GitHub issues. With only one remaining extension remaining from those early trials, it was able to sync and collect the new issues added via the Report Issue button.

# Takeaways

This works well, and was far easier to implement than I had expected!

There are plenty of areas still to investigate for this potential solution;

- GitHub licensing concerns. Will personal accounts suffice, or do we start to encroach on use types and therefore need business accounts?
- Security around GitHub access
  - Can GitHub security tie things down to prevent non-staff traversing the GitHub repo?
  - Would an API injection from some sort of form be possible to avoid user log ins to report issues?
- Linking to Jira if possible to aid tracking of work.
  - Can we create Jiras, add to existing Jiras, and comment on them, as a method to communicate with the reviewer who provided feedback.
  - If possible, can this also be tied into VS Code to limit author tool switching?
