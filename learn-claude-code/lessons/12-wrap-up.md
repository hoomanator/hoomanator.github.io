# Lesson 12 — Wrap-Up & Best Practices

## Concept

You've now used Claude Code to scaffold a project, read and explain code,
make and verify edits, run tests, use git, manage conversation memory, encode
project conventions, and plan bigger changes. That's the full core loop. This
lesson is a review, not new mechanics — the goal is to turn what you did into
habits.

## The habits worth keeping

1. **Be specific.** "Make it better" gets a worse answer than "handle the case
   where the id doesn't exist." (Lesson 4–5)
2. **Read before you approve.** Diffs and commands are shown to you for a
   reason — actually look. (Lesson 5, 8)
3. **Verify, don't just trust the summary.** Run the code yourself after a
   change. Claude's description of what happened and what actually happened
   should match — check that they do. (Lesson 3, 5, 6)
4. **Report symptoms, not just fixes.** "This looks wrong" plus what you
   observed is often more useful than prescribing the exact fix yourself.
   (Lesson 7)
5. **Say no when something's not right.** Denying a proposed action is normal,
   not rude — you did it on purpose in Lessons 5, 6, and 8. Keep doing it.
6. **Push back on plans before code exists**, especially for bigger changes —
   it's far cheaper than pushing back after. (Lesson 11)
7. **Write your conventions down once, in `CLAUDE.md`**, instead of repeating
   them every session. (Lesson 10)

## A final hands-on exercise: do it without the script

No step-by-step instructions this time. Using your `task-tracker/` project (or
a brand-new small idea, if you'd rather), do all of the following yourself,
end to end, in one sitting:

1. Propose a nontrivial new feature
2. Use plan mode if it's big enough to warrant it
3. Review and push back on at least one part of the approach
4. Have Claude implement it
5. Verify it actually works by running it yourself
6. Have Claude write a test for it and run that test
7. Update `CLAUDE.md` if the feature introduces a new convention worth
   remembering
8. Commit the result with a commit message that explains *why*

If you can do all eight steps without needing to look anything up, the course
has done its job.

## Where to go next

- Explore **custom slash commands** more seriously — codify a prompt you find
  yourself repeating often.
- Look into **subagents** — specialized helper agents you can delegate
  research or review tasks to (ask Claude: "what are subagents and when would
  I use one?").
- Look into **hooks** — automated shell commands that run on events like "after
  every file edit" (useful for auto-formatting, for example).
- If you work in a team, try a real (non-toy) repository next, starting with
  Lesson 4's "read before you touch" habit.

## Final checkpoint

- [ ] You completed the unscripted exercise above without referring back to
      earlier lessons
- [ ] You can explain, in your own words, why "verify, don't just trust the
      summary" matters
- [ ] You know where to look next (custom commands, subagents, hooks) when
      you're ready for more

Nice work — you've built and iterated on a real project entirely through
conversation with Claude Code, with the habits to do it safely and well.
