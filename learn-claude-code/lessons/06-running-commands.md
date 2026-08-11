# Lesson 6 — Running Commands

## Concept

Claude Code can run shell commands for you — tests, linters, scripts, `git`,
package installs — through the same permission model as file edits. This is
what separates it from a plain chatbot: it can close the loop itself by
**running the code it just wrote and reacting to the result**, instead of
guessing whether something works.

Just like edits, you'll be asked to approve commands (especially ones that look
risky), and you can always deny or ask for a different command instead.

## Hands-on

### Step 1 — Ask Claude to add tests

In your `task-tracker/` session:

```
Add a simple test file using Python's built-in unittest module that covers
add, list, done, and remove. Then run it and show me the results.
```

Watch for two separate approvals: one for creating the test file, one for
running `python3 -m unittest` (or however it chooses to run it).

### Step 2 — Watch it self-correct

If a test fails on the first try (it sometimes will, especially if `tasks.json`
already has leftover data from your earlier manual testing), watch what Claude
does next. A good sign is that it investigates *why* before changing anything —
e.g., "the test file is picking up your existing tasks.json." Let it fix its
own mistake before you step in.

### Step 3 — Ask it to run something *without* changing files

```
Run `python3 tasks.py list` right now and tell me what's currently in the
tracker — don't change any files.
```

This is a good pattern for "just check something" moments — you're not always
editing, sometimes you just want Claude to look.

### Step 4 — Try a deliberately risky-sounding command

Ask:

```
What would happen if we deleted tasks.json entirely? Don't actually do it —
just explain, then propose the safest way to reset test data if we needed to.
```

Notice that asking "what if" without asking for action is a safe way to explore
consequences before approving anything destructive.

### Step 5 — Deny a command on purpose

Ask Claude to run the test suite again, but this time deny the permission
prompt. Confirm it stops and asks what you'd like instead, rather than trying
to work around your denial.

## Try it yourself

- Ask Claude to add a `Makefile` or a simple shell script that runs the tests
  with one command (`make test` or `./test.sh`), then use *that* instead of
  typing the full Python command every time.
- Ask it to check whether `tasks.json` is accidentally going to be included in
  version control (a preview of Lesson 8).

## Checkpoint

- [ ] You had Claude write and run a test suite in one request
- [ ] You watched it react to a failing test before you intervened
- [ ] You asked a "what if" question without triggering any action
- [ ] You denied a command and confirmed it respected that

Next: [Lesson 7 — Iterating on Features](07-iterating-features.md)
