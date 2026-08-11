# Lesson 10 — CLAUDE.md & Project Memory

## Concept

`CLAUDE.md` is a plain markdown file, placed at your project root, that Claude
Code reads automatically at the start of every session in that directory.
It's the place for standing instructions you'd otherwise have to repeat every
time: coding conventions, commands to run tests, things to avoid, context about
the project's purpose.

Think of it as an onboarding doc — but written for Claude instead of a new
hire, and one Claude actually reads every single session without you asking.

Good `CLAUDE.md` files are short and concrete. A long, vague one gets skimmed
and ignored just like a bad onboarding doc would be for a human.

## Hands-on

### Step 1 — Generate one from your existing project

In your `task-tracker/` session:

```
Create a CLAUDE.md for this project summarizing: how to run it, how to run
the tests, the code style you've been using, and the fact that tasks.json is
test data that shouldn't be committed.
```

### Step 2 — Read it critically

Open the generated `CLAUDE.md` yourself. Ask: is every line actually useful, or
is some of it generic filler that could apply to any Python project? Trim
anything that doesn't teach Claude something *specific to this project*.

### Step 3 — Add a rule and test that it sticks

Add one instruction by hand (or ask Claude to add it) — something opinionated:

```
Add a rule: all new CLI commands must include a --help description string.
```

### Step 4 — Start a brand-new session and test it

```
/exit
```
```bash
claude
```

Ask it to add a new command without mentioning the `--help` rule yourself:

```
Add a `clear-done` command that removes all completed tasks.
```

Check whether it followed the rule from `CLAUDE.md` unprompted. This is the
real test of whether the file is doing its job.

### Step 5 — Understand the hierarchy (don't need to build all of these)

Ask Claude:

```
Besides a project-root CLAUDE.md, where else can CLAUDE.md files live, and
how do they combine if there's more than one?
```

You should come away understanding there's a difference between
project-level and personal/global conventions, even if you don't set up the
global one right now.

## Try it yourself

- Deliberately add a rule to `CLAUDE.md` that conflicts with something you
  personally prefer, and confirm that a new session actually follows the
  written rule over its own default instincts.
- Try removing a rule you no longer want and confirm the next session's
  behavior changes accordingly.

## Checkpoint

- [ ] You have a `CLAUDE.md` in your project that isn't generic boilerplate
- [ ] You added a custom rule and confirmed a fresh session actually follows it
- [ ] You understand CLAUDE.md is read automatically, every session, without
      you asking

Next: [Lesson 11 — Plan Mode](11-plan-mode.md)
