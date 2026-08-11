# Lesson 5 — Your First Edit

## Concept

When Claude Code changes a file, it doesn't rewrite it blindly — it shows you a
**diff** (old lines vs. new lines) and, depending on your permission mode,
pauses for approval before applying it. Three permission outcomes you'll see
constantly:

- **Allow once** — approve just this one action
- **Allow for this session / always** — stop asking for this kind of action
- **Deny** — reject it; Claude will ask what you'd like instead

This lesson is about the edit → approve → verify loop, and about giving Claude
feedback when its first attempt isn't quite right.

## Hands-on

In your `task-tracker/` session:

### Step 1 — Find the bug from Lesson 4

You already know (from Lesson 4, Step 4) that running `done` with a bad id
doesn't fail gracefully. Now ask for the fix:

```
When `done <id>` is called with an id that doesn't exist, print a clear error
message like "Task 7 not found." instead of whatever currently happens. Don't
change anything else.
```

### Step 2 — Read the diff before approving

Claude will show you a proposed change (old code vs. new code). Actually read
it — check:
- Does it only touch what you asked for?
- Does it match the project's existing style (naming, formatting)?

Approve it.

### Step 3 — Verify it yourself, don't just trust the description

```bash
python3 tasks.py done 999
```

Confirm you see the clear error message, not a crash or silent nothing.

### Step 4 — Give corrective feedback

Ask for something slightly underspecified on purpose:

```
Add a `--verbose` flag to `list` that also shows when each task was created.
```

Since tasks don't currently have a creation timestamp, Claude has a choice to
make (add the field now vs. ask you). See how it handles the ambiguity. If you
don't like its choice:

```
Actually, store the timestamp as an ISO 8601 string, not a unix epoch number.
```

This is normal and expected — treat the first response as a draft, not a final
answer.

### Step 5 — Reject something on purpose

Ask for one more change, but this time **deny** the file edit when prompted
(there should be a "no"/deny option). Then tell Claude:

```
Don't do that — instead, just add a comment explaining why we're not doing it.
```

Practicing "no" is as important as practicing "yes." You're always in control
of what actually lands in your files.

## Try it yourself

- Ask Claude to undo the `--verbose` feature entirely and confirm the file
  actually reverts (don't just take its word for it — check the file).
- Intentionally ask for a vague change ("make the code better") and notice how
  much less useful the result is compared to a specific request.

## Checkpoint

- [ ] You approved an edit after actually reading the diff
- [ ] You verified a fix by running the code yourself, not just reading the
      explanation
- [ ] You gave follow-up corrective feedback on an underspecified request
- [ ] You denied a proposed change at least once

Next: [Lesson 6 — Running Commands](06-running-commands.md)
