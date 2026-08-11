# Lesson 7 — Iterating on Features

## Concept

Real feature work is rarely one request. It's a sequence: propose → build →
try it → notice something's off → refine → repeat. Claude Code is designed for
exactly this back-and-forth, and the conversation's memory means you don't have
to re-explain context each time — you just react to what you see.

This lesson is deliberately less scripted than earlier ones: you'll build one
real feature end-to-end, making judgment calls along the way like you would at
work.

## Hands-on

### Step 1 — Propose a real feature

In your `task-tracker/` session, ask for something with multiple moving parts:

```
Add due dates to tasks. I should be able to run
`add "text" --due 2026-08-01`, and `list` should show overdue tasks with a
clear marker.
```

### Step 2 — Try it immediately

```bash
python3 tasks.py add "Pay rent" --due 2026-08-01
python3 tasks.py add "Something old" --due 2020-01-01
python3 tasks.py list
```

Look closely: does the overdue marker actually appear correctly? Is the date
format what you expected?

### Step 3 — Report back what you see, not what you want fixed

Instead of telling Claude *how* to fix it, describe what you observed:

```
The overdue marker shows up even for tasks that are already marked done. That
doesn't seem right.
```

Notice this is a bug report, not an instruction — you're letting Claude
diagnose it. This mirrors how you'd work with a human collaborator.

### Step 4 — Push back on a design choice

Suppose Claude used a display format you don't like (e.g., raw ISO dates in
`list` output). Say so directly:

```
Can we show dates as "Aug 1, 2026" in the list output instead of the raw ISO
string? Keep ISO format in the JSON file itself.
```

This distinguishes **storage format** from **display format** — a real design
concept, and a good one to practice articulating.

### Step 5 — Ask for a second opinion on your own idea

```
I'm thinking of also adding task priorities that affect sort order in `list`.
Before you build it — any concerns with that approach, given how the code is
structured right now?
```

Good responses here reference your actual code (e.g., "list currently sorts by
insertion order in storage.py; adding priority sort would touch this function
specifically") rather than generic advice.

## Try it yourself

- Actually build the priority-based sorting from Step 5, end to end, using the
  propose → try → report → refine loop from this lesson.
- Deliberately give one instruction that contradicts an earlier one (e.g., "go
  back to showing raw ISO dates in list output") and observe how Claude
  reconciles it with what's already there.

## Checkpoint

- [ ] You built a multi-part feature through several conversational turns
- [ ] You reported a bug by describing behavior, not prescribing the fix
- [ ] You pushed back on a design decision and got a revised version
- [ ] You asked for feedback on your own idea before building it

Next: [Lesson 8 — Git Basics with Claude Code](08-git-basics.md)
