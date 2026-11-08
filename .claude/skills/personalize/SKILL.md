---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails by lead group

Campaign folder: $ARGUMENTS

Write one copy of each email in the campaign for each lead group. These are drafts only. Never send email to anyone.

## Step 1: Check the campaign folder

- If no campaign folder was given above, stop. Use Glob on `campaigns/*/` to find the campaign folders. Reply with this list and ask which one to use. Write nothing.
- Accept either `agent-launch` or `campaigns/agent-launch`. Both mean `campaigns/agent-launch`.
- If the folder doesn't exist or has no `emails/*.md` files, stop. Reply with the list of campaign folders that do exist. Write nothing.

## Step 2: Read the rules and the groups

1. Read `brand/voice.md` and `.claude/rules/emails.md`. Every copy must follow both.
2. Read `leads/leads.csv`. Find the group names in the `group` column. Expect `small-business`, `online-stores` and `agencies`. Use whatever groups are there.
3. Use only the group names. Never copy a lead's name, email address or other details into an email. Keep `{{first_name}}` as it is.

Match each group to its readers:

| Group | Readers |
|---|---|
| `small-business` | small business owners, like salons, clinics, cafes and repair shops |
| `online-stores` | online store owners |
| `agencies` | agencies that serve other businesses |

## Step 3: Write each copy

Do this for every file in `<campaign folder>/emails/*.md` and every group.

**Keep these exactly the same:**

- The subject line and the preview line
- The order of the sections
- The one main link: both the button text and the address
- The sign-off and the footer, as plain text

**Change only these two things:**

1. **The opening line.** This is the first sentence after the greeting. Rewrite it so it speaks to that group.
2. **One example.** Pick one example in the email and swap it for a task that group really does. Keep it the same length and shape. If the email has no examples, change only the opening line.

**If the email already has marked group sections**, like `[Version for small business owners]`:

- Keep only the section for this group. Delete the other groups' sections.
- Delete the `[Version for ...]` marker line itself.
- That section already counts as the changed example. Don't change another one.

**Before you save each copy, check:**

- No words from the "Words we avoid" list in `brand/voice.md`
- None of the "Claims we must never make"
- Numbers follow the "Writing numbers" rule in `.claude/rules/emails.md`
- No code blocks (three backticks) anywhere

## Step 4: Save

- Save each copy to `<campaign folder>/groups/<group>/emails/` with the same file name as the original.
- For example: `campaigns/agent-launch/groups/agencies/emails/01-were-open.md`.
- If a file already exists there, don't overwrite it. Skip it and count it as skipped.
- Never change the original files in `<campaign folder>/emails/`.

## Step 5: Reply

Reply with a short summary only. Don't paste whole emails. Use this shape:

```
Wrote 12 files (4 emails × 3 groups) in campaigns/agent-launch/groups/.

Example opening lines:
- small-business: "..."
- online-stores: "..."
- agencies: "..."
```

If you skipped any files, add one line saying how many and why.
