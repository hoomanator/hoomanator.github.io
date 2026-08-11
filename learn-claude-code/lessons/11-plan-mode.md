# Lesson 11 — Plan Mode

## Concept

For small changes, "just ask and approve the diff" works fine. For bigger
changes — the kind that touch several files, or where you're not 100% sure
what the right approach even is — it helps to **see the plan before any code
gets written**. That's what Plan Mode is for: Claude researches and proposes an
approach in detail, you review and refine it in conversation, and only once
you approve does it start actually writing files.

This matters because catching a wrong approach *in the plan* costs you a
sentence of feedback. Catching it *after* five files are edited costs you a
much bigger unwind.

## Hands-on

### Step 1 — Pick a genuinely bigger change

In your `task-tracker/` project, this is a reasonable candidate:

```
I want to add persistent categories/tags to tasks (e.g., "work", "personal"),
support filtering `list` by tag, and update the README accordingly.
```

### Step 2 — Enter plan mode before sending it

Check how to trigger plan mode in your version of Claude Code (ask it: "how do
I enter plan mode?" if you're not sure — it's typically a keybinding or a
mode toggle mentioned in `/help`). Switch into it, *then* send the request
above.

### Step 3 — Read the plan like a design doc

Claude should come back with a structured plan — something like: which files
change, what the data model looks like, how filtering is implemented, what
order things happen in. Don't approve yet. Actually evaluate it:

- Does it handle existing tasks that have no tags yet?
- Does the plan mention updating the tests from Lesson 6?
- Is anything missing that you expected?

### Step 4 — Push back before approving

Ask for a change to the plan itself, not the code (there's no code yet):

```
The plan doesn't mention what `list` should show for untagged tasks. Update
the plan to handle that explicitly.
```

### Step 5 — Approve and watch it execute

Once the plan looks solid, approve it and let Claude implement. Compare the
actual changes against the plan you approved — they should match closely.

### Step 6 — Verify

```bash
python3 tasks.py add "Fix the sink" --tag home
python3 tasks.py list --tag home
```

## Try it yourself

- Think of a change you're unsure how to approach yourself (not just a bigger
  one — a genuinely ambiguous one), and use plan mode to have Claude propose
  options before committing to one.
- Compare doing the same request with and without plan mode (on a throwaway
  copy of the project) and notice the difference in how much back-and-forth
  happens before code gets written.

## Checkpoint

- [ ] You entered plan mode before starting a multi-file change
- [ ] You gave feedback on the plan itself, before any file was touched
- [ ] The eventual implementation matched the plan you approved
- [ ] You can articulate when plan mode is worth using vs. overkill

Next: [Lesson 12 — Wrap-Up & Best Practices](12-wrap-up.md)
