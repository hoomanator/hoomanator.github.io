# Lesson 4 — Reading Code with Claude

## Concept

A huge part of real software work is understanding code you didn't write —
someone else's, or your own from six months ago. Claude Code is often at its
best here: it can read across many files fast and summarize, trace, or explain
in a way that would take you much longer manually.

The skill to practice in this lesson isn't "typing questions" — it's **asking
questions specific enough to get a useful answer.** Vague questions get vague
answers.

## Hands-on

Continue in your `task-tracker/` project (`cd ~/claude-code-course/task-tracker`
then `claude` if you're not already in a session).

### Step 1 — Ask a broad orientation question

```
Give me a one-paragraph overview of this codebase: what files exist and what
each one is responsible for.
```

This is a good first question in *any* unfamiliar codebase — including real
ones at work.

### Step 2 — Ask a specific tracing question

```
If I run `python3 tasks.py done 2`, walk me through exactly what happens,
function by function, from the command line to the file being saved.
```

Notice the difference from Step 1's answer: this one should reference specific
line numbers or function names, because you asked something specific and
traceable.

### Step 3 — Ask a "why," not just a "what"

```
Why did you choose to store tasks as a JSON file instead of, say, a SQLite
database or plain text?
```

Good answers here mention trade-offs (simplicity vs. scale, no dependencies,
human-readable) — not just a restatement of what the code does.

### Step 4 — Ask about edge cases

```
What happens right now if I run `done` with an id that doesn't exist? Don't
fix anything — just tell me.
```

This is an important habit: **ask before you fix.** Understanding a bug fully
often changes how you'd want it fixed.

## Try it yourself

- Ask Claude to find every place in the codebase where the `tasks.json` file
  path is referenced. (This is the kind of "search across files" task Claude is
  much faster at than manually grepping.)
- Ask it to explain the project *as if you were a new hire seeing it for the
  first time* — compare the tone/depth to Step 1's answer.

## Checkpoint

- [ ] You can get a high-level summary of an unfamiliar file layout
- [ ] You can ask Claude to trace one specific execution path
- [ ] You've practiced asking "why," not just "what"
- [ ] You asked about a bug/edge case without asking for a fix yet

Next: [Lesson 5 — Your First Edit](05-first-edit.md)
