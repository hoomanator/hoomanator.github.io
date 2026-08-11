# Lesson 9 — Slash Commands

## Concept

Anything starting with `/` is a **slash command** — a built-in shortcut for
managing the session itself, rather than a message to Claude. You've already
used one: `/exit`. Slash commands control things like conversation memory,
help text, and configuration — they don't get "interpreted" by the model the
way a normal message does.

You can also **create your own** slash commands for prompts you use often —
more on that at the end of this lesson.

## Hands-on

### Step 1 — Discover what's available

```bash
cd ~/claude-code-course/task-tracker
claude
```

At the prompt:

```
/help
```

Skim the list. Don't try to memorize it — just notice the categories (session
management, config, etc.).

### Step 2 — Try `/clear`

Have a short exchange first so there's something to clear:

```
Remind me what this project does.
```

Then:

```
/clear
```

Now ask:

```
What were we just talking about?
```

Claude shouldn't remember — `/clear` wipes the conversation (but not your
files, which are unaffected either way).

### Step 3 — Try `/compact`

Long conversations eventually hit context limits. `/compact` summarizes the
conversation so far to free up space while keeping the gist. Have a few
exchanges, then run:

```
/compact
```

Ask a question referencing something from earlier in the conversation and see
whether the important parts survived the compaction.

### Step 4 — Check your configuration

```
/config
```

Skim what's configurable — permission modes, model selection, etc. You don't
need to change anything right now, just know this exists.

### Step 5 — Look for a resume/continue command

Exit the session (`/exit`), then check the CLI's flags for resuming a
conversation:

```bash
claude --help
```

Look for a `--continue` or `--resume` style flag, then try it:

```bash
claude --continue
```

Confirm you're back in a session that remembers the earlier conversation.

## Try it yourself

- Ask Claude itself: "What slash commands are available and what do each of
  them do?" — compare its answer against what `/help` showed you.
- Look into **custom slash commands**: ask Claude "how do I create my own
  custom slash command in this project?" and try creating a trivial one (e.g.,
  `/tasks` that just runs `python3 tasks.py list`).

## Checkpoint

- [ ] You've run `/help`, `/clear`, `/compact`, and `/config` at least once each
- [ ] You understand `/clear` wipes conversation memory, not your files
- [ ] You've resumed a previous session from the command line
- [ ] You've seen how a custom slash command is defined (even if you didn't
      keep it)

Next: [Lesson 10 — CLAUDE.md & Project Memory](10-claude-md.md)
