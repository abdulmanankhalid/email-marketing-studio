// PreToolUse guard for the Resend MCP tools.
// Lets email go only to Resend test addresses (@resend.dev) or to MY_EMAIL.
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

const MY_EMAIL = (process.env.MY_EMAIL || "").trim().toLowerCase();

// Tools that can reach whole lists of people. Always blocked.
const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

function block(reason) {
  process.stderr.write(`Blocked by send-guard: ${reason}\n`);
  process.exit(2);
}

// Pull the bare address out of "Name <addr@x.com>" or "addr@x.com".
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).trim().toLowerCase();
}

function isAllowed(address) {
  if (address.endsWith("@resend.dev")) return true;
  return MY_EMAIL !== "" && address === MY_EMAIL;
}

// Collect every address in to, cc and bcc. Accepts a string or an array.
function recipientsOf(email) {
  const list = [];
  for (const field of ["to", "cc", "bcc"]) {
    const value = email?.[field];
    if (value == null) continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      list.push(bareAddress(item));
    }
  }
  return list;
}

function checkEmails(emails) {
  const all = emails.flatMap(recipientsOf);
  if (all.length === 0) block("no recipients found, so the send can't be checked.");
  for (const address of all) {
    if (!isAllowed(address)) {
      block(
        `"${address}" is not allowed. Only @resend.dev test addresses` +
          (MY_EMAIL ? ` and ${MY_EMAIL}` : " (MY_EMAIL is not set)") +
          " can receive email."
      );
    }
  }
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it was blocked to be safe.");
  }

  // "mcp__resend__send-email" -> "send-email"
  const tool = String(call.tool_name || "").replace(/^mcp__resend__/, "");
  const input = call.tool_input || {};

  if (ALWAYS_BLOCK.has(tool)) {
    block(`${tool} can reach whole lists of people, so it is never allowed here.`);
  }

  if (tool === "send-email") {
    checkEmails([input]);
  } else if (tool === "send-batch-emails") {
    const emails = Array.isArray(input.emails) ? input.emails : [];
    if (emails.length === 0) block("send-batch-emails has no emails to check.");
    checkEmails(emails);
  }

  process.exit(0);
});
