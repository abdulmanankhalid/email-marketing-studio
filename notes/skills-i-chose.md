# Skills I chose

Searched on 8 November 2026 for "email marketing", "email sequence", "campaign plan" and "resend" on skills.sh. Star counts come from GitHub on the same day. Nothing is installed yet.

## Use these

**1. For writing campaigns: Anthropic's marketing skills**
Source: `anthropics/knowledge-work-plugins` (the `marketing` folder)

- It's published by Anthropic, the company that makes Claude.
- It has the skills this studio needs: `campaign-plan` (it was the top result for "campaign plan"), `email-sequence`, `draft-content`, `content-creation`, `brand-review` and `performance-report`.
- The repo has about 35,000 stars and 3,900 forks. It was updated this week, and its license (Apache-2.0) allows free use.

**2. For sending email: Resend's own skills**
Source: `resend/resend-skills`

- It's published by Resend, the email-sending service, from their official GitHub account. The people who run the service maintain the instructions for using it.
- It includes `resend` (send email through Resend), `resend-cli`, `react-email` (build email designs), `email-best-practices` and `agent-email-inbox`.
- It has only 211 stars, but it's the official source, it was updated this week, and its license is MIT. Resend's main email-design project (`resend/react-email`) has about 19,900 stars, so the publisher is well established.

Runner-up for writing: `coreyhaines31/marketingskills`. One person publishes it, but it has about 59,000 stars, and its `emails` and `copywriting` skills were strong results (`emails` was called `email-sequence` before May 2026, and skills.sh still lists the old name). Use it if Anthropic's skills feel too general.

## Avoid these

**1. `caffeinelabs/skills` → `extension-email-marketing`**
It was the first result for "email marketing" and shows over 30,000 installs. But:
- The repo has only **2 stars** and no description. That many installs with almost no stars doesn't add up.
- When I read the skill, it turned out to be an add-on for another product (Caffeine AI). It needs Caffeine's own packages and a paid Caffeine plan, so it won't do anything useful in this project.

**2. `mbfinotti/sales-skills` (for example `cold-email-deliverability`)**
Each of its skills shows about 33,000 installs. But:
- The repo has **3 stars and 0 forks**, it was created in September 2026, and the account has 3 followers.
- Tens of thousands of installs on skills that almost nobody has starred suggests the install counts are inflated.
- The text I read looked harmless. The problem is that its popularity can't be trusted.

Also skip the many small "resend" skills from personal accounts, such as `tristanmanchester/agent-skills` and `spiosifidis/my-claude-skills`. Most have under 100 installs, and Resend already publishes an official version.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it?** Look at the GitHub owner. For a product's skill, the owner should be that company, for example `resend/...` for Resend or `anthropics/...` for Anthropic. A random account using a company's name is not the company.
2. **Do the numbers agree with each other?** Install counts on the directory are easy to inflate. Compare them with the GitHub stars, forks, last update date, repo age and whether it has a license. Huge installs with almost no stars is a warning sign.
3. **Have you read the SKILL.md?** Open it on GitHub before installing. Check what it actually does, what it needs (a paid product, API keys, other packages), and whether it runs scripts or sends your data anywhere. A skill gives instructions to your AI assistant, so read it as you would read code.
