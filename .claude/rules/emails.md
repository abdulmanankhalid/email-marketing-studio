---
paths:
  - "campaigns/**/emails/*.md"
---

# Email File Rules

These rules apply to every email file in any campaign's `emails/` folder. They do not apply to plans or other campaign files.

Every email file must follow these rules, in this order from top to bottom.

## 1. Subject and preview lines

- Line 1 is the subject line. It starts with `Subject: `.
- Line 2 is the preview line. It starts with `Preview: `.
- The subject text after `Subject: ` is 50 characters or fewer.
- The preview text after `Preview: ` is 90 characters or fewer.
- Count the characters before you finish. If a line is too long, shorten it.

## 2. Greeting

- Greet the reader by name with `{{first_name}}`. For example: `Hi {{first_name}},`
- Never write a real name in its place.

## 3. One main link

- Each email has exactly one main link.
- Write it like this: `[Button text](https://quaror.example/agents)`
- Change "Button text" to a short action, like "Book a free chat". Keep the link address the same.
- Do not add any other links.

## 4. Sign-off

- End the email body with a short, warm line that invites a reply. For example: "Just reply to this email if you have questions."
- Then use this sign-off in every campaign email, exactly as written, so the emails in a campaign match. (`brand/voice.md` lists other closings like "Talk soon," for one-off replies, not campaign emails.)

Happy to help,
Engr. Abdul Manan
AI Agent Builder

## 5. Footer

- After the sign-off, add this footer on two lines, exactly as written:

You're getting this because you joined the Quaror waitlist.
Quaror, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

- Write the sign-off and footer as plain text. Do not put them inside a code block.
- Keep `{{company_address}}` and `{{unsubscribe_url}}` as they are. Never fill in real values.

## Writing numbers

This applies to the whole email, not one place in it.

- In subject and preview lines, use digits. For example: "3 jobs", "4 simple steps".
- In the email body, spell out one to nine. For example: "three sentences".
- Always use digits for times, lengths of time, and labels. For example: "9pm", "30-minute call", "Step 1", "Example 2".
