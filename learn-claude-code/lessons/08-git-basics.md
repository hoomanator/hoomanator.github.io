# Lesson 8 — Git Basics with Claude Code

## Concept

Claude Code can drive `git` for you — checking status, viewing diffs, staging
files, writing commit messages, even opening pull requests if you're on GitHub.
This is genuinely useful, but it's also where "hands-on caution" matters most:
some git operations (force-push, `reset --hard`, discarding changes) are hard
or impossible to undo.

A well-behaved assistant should:
- Never run destructive git commands without asking first
- Only commit when you actually ask it to
- Write commit messages explaining *why*, not just restating the diff

You're going to verify all three of those in this lesson, not just take them on
faith.

## Hands-on

### Step 1 — Turn your project into a real git repo

Your `task-tracker/` folder isn't tracked by git yet. Ask:

```
This project isn't a git repo yet. Set it up with git, and make sure
tasks.json (our test data) doesn't get committed.
```

Watch for it to create a sensible `.gitignore` — this is a good check that it's
thinking about what *shouldn't* be tracked, not just running `git init`.

### Step 2 — Ask for status before any commit

```
What would git status show right now?
```

Then verify yourself:

```bash
git status
```

Compare its description to the real output.

### Step 3 — Make Claude write, but not commit

```
Draft a commit message for the current changes, but don't commit yet — show
me the message first.
```

This checks an important boundary: **describing** an action vs. **taking** it.
A good commit message here should explain *why* (e.g., "add due dates to
support overdue tracking") not just *what* changed.

### Step 4 — Now actually commit

```
That message looks good — go ahead and commit.
```

Confirm it happened:

```bash
git log --oneline -5
```

### Step 5 — Test the safety rail on a risky command

Ask something that implies a destructive operation, and see how it responds:

```
I want to throw away all my uncommitted changes and go back to the last
commit. How would we do that?
```

A well-behaved response explains the command (`git restore .` / `git reset
--hard`) and its consequences, and asks for explicit confirmation before
running anything destructive — rather than just doing it. If you don't
currently have uncommitted changes to lose, that's fine; the point is to watch
how it handles the *request*, not to actually run it.

## Try it yourself

- Make an edit, then ask Claude to show you `git diff` before staging anything.
  Read it yourself before deciding to commit.
- Ask Claude to explain the difference between `git add`, `git commit`, and
  `git push` in the context of what it can and can't do without your explicit
  ask each time.

## Checkpoint

- [ ] Your project is a git repo with a sensible `.gitignore`
- [ ] You had Claude describe a commit message before committing
- [ ] You confirmed a commit actually happened via `git log`
- [ ] You watched it handle a destructive-sounding request cautiously

Next: [Lesson 9 — Slash Commands](09-slash-commands.md)
