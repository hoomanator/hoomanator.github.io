# Lesson 2 — Your First Conversation

## Concept

Claude Code sessions are conversations, not one-shot commands. You type a
message, Claude replies (with text, and sometimes with tool actions like reading
a file), and the conversation keeps going — remembering everything said so far —
until you clear it or exit.

Two starting modes matter:

- `claude` — starts an interactive session (a back-and-forth conversation).
- `claude "some question"` — starts an interactive session with your first
  message already sent, saving you a step.

There's also a non-interactive mode (`claude -p "..."`) for scripting, but ignore
that for now — this course stays in interactive mode throughout.

## Hands-on

### Step 1 — Make a scratch folder

We don't want to touch a real project yet.

```bash
mkdir -p ~/claude-code-course/scratch
cd ~/claude-code-course/scratch
```

### Step 2 — Start a session

```bash
claude
```

### Step 3 — Ask a plain question

At the `>` prompt, type (no code involved yet — just talk to it):

```
What files are in this directory, and what is this folder likely used for?
```

Press Enter. Claude should tell you the directory is empty and ask what you'd
like to do — because there's nothing here yet. That's expected.

### Step 4 — Ask it to create something small

```
Create a file called hello.txt that contains a short haiku about learning to code.
```

Watch what happens: Claude will likely show you the exact content it's about to
write, possibly asking for permission to create the file (depending on your
permission settings). Approve it.

### Step 5 — Verify it actually happened

Without leaving the session, ask:

```
Show me the contents of hello.txt
```

Claude should read the file back to you. This is the core loop you'll repeat for
the whole course: **ask → Claude acts (with your approval) → verify the result.**

### Step 6 — Continue the conversation

```
Now make it funnier.
```

Notice Claude knows what "it" refers to — the conversation has memory within a
session.

### Step 7 — End the session

```
/exit
```

## Try it yourself

- Start a new `claude` session in the same folder and ask it to list what's in
  the directory. Does it remember the haiku conversation? (It shouldn't — a new
  session starts with a clean slate unless you resume one.)
- Look up how to resume a previous conversation: ask Claude itself, "how do I
  resume my last session from the command line?" and try it.

## Checkpoint

- [ ] You started an interactive session and had a back-and-forth exchange
- [ ] You watched Claude ask permission before creating a file
- [ ] You confirmed the file's contents afterward
- [ ] You understand that each new `claude` session starts fresh by default

Next: [Lesson 3 — Your Hands-On Project](03-project-setup.md)
