# Lesson 1 — Welcome & Setup

## Concept

**Claude Code** is a command-line tool that puts Claude directly into your terminal
and working directory. Instead of copy-pasting code into a chat window, you run
one command in a project folder, and Claude can read your files, edit them, run
your tests, and use git — all with your approval at each risky step.

Think of it less like "a chatbot that writes code" and more like "a capable
teammate who can see your project and use your terminal, but always asks before
doing anything you haven't allowed."

Three ideas to hold onto before you type anything:

- **It works in a directory.** Whatever folder you start it in becomes its
  "project." It reads and writes files relative to that folder.
- **It asks permission.** Before it edits a file or runs a shell command for the
  first time, it'll show you what it wants to do and ask you to approve, deny, or
  always-allow that kind of action.
- **It's a conversation.** You type a request in plain English, it responds with
  text and/or actions, and the conversation continues until you stop it.

## Hands-on

### Step 1 — Check if it's already installed

```bash
claude --version
```

- If you see a version number, skip to Step 3.
- If you see "command not found," continue to Step 2.

### Step 2 — Install Claude Code

The standard install is via npm (Node.js's package manager):

```bash
npm install -g @anthropic-ai/claude-code
```

Don't have Node.js? Install it first (macOS example using Homebrew):

```bash
brew install node
```

Then re-run the `npm install -g` command above.

### Step 3 — Confirm the install

```bash
claude --version
```

You should see a version string like `1.x.x`. If it still fails, close and reopen
your terminal (your `PATH` may need to refresh) and try again.

### Step 4 — Log in

```bash
claude
```

The first time you run this, it'll walk you through authentication in your
browser (via your Anthropic/Claude account or API key, depending on your setup).
Follow the prompts. Once logged in, you'll land in Claude Code's interactive
prompt — you'll know because you'll see a `>` prompt waiting for input.

### Step 5 — Exit cleanly

Type:

```
/exit
```

and press Enter. You should be dropped back to your normal shell prompt.

## Try it yourself

- Run `claude --help` and skim the output. You don't need to understand every
  flag yet — just notice that this is a real CLI tool with subcommands and
  options, not a walled garden.
- Find where the tool actually lives on disk: `which claude`.

## Checkpoint

Before moving to Lesson 2, make sure you can answer "yes" to all of these:

- [ ] `claude --version` prints a version number
- [ ] Running `claude` drops you into an interactive `>` prompt
- [ ] `/exit` returns you to your normal shell

Next: [Lesson 2 — Your First Conversation](02-first-conversation.md)
