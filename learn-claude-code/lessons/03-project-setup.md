# Lesson 3 — Your Hands-On Project

## Concept

From here on, the whole course uses **one running project**: a small
command-line **Task Tracker** written in Python. It's simple enough to
understand completely, but real enough to practice reading, editing, testing,
and committing code — the actual skills this course teaches.

Why build it *with* Claude Code instead of me handing you finished files? Because
scaffolding a project from a plain-English description is one of the most common
real uses of the tool, and it's the fastest way to see how it thinks about a
codebase before you start editing it by hand.

## Hands-on

### Step 1 — Create the project folder

```bash
mkdir -p ~/claude-code-course/task-tracker
cd ~/claude-code-course/task-tracker
```

### Step 2 — Start Claude Code here

```bash
claude
```

Because you started it *inside* `task-tracker/`, this folder is now its project
root for the whole session.

### Step 3 — Describe the project in plain English

Paste this as your message (feel free to reword it — it doesn't need to be
exact):

```
I'm learning Claude Code and want to build a small practice project. Please
create a simple command-line task tracker in Python with no external
dependencies, structured like this:

- tasks.py — the CLI entry point
- storage.py — functions to load/save tasks to a tasks.json file
- Commands: `add "task text"`, `list`, `done <id>`, `remove <id>`
- Each task has: id, text, done (bool)
- Include a short README.md explaining how to run it

Keep it beginner-friendly and readable — this is for learning, not production.
```

### Step 4 — Review before approving

Claude will likely explain its plan and then propose creating a few files. For
each file it wants to write, **read what it's proposing** before approving —
don't rubber-stamp it. This is a habit worth building from day one.

### Step 5 — Run it

Once the files exist, ask Claude to run it for you, or do it yourself:

```bash
python3 tasks.py add "Learn Claude Code"
python3 tasks.py list
python3 tasks.py done 1
python3 tasks.py list
```

You should see your task tracked, then marked done.

### Step 6 — Ask Claude to explain what it built

```
Walk me through storage.py — what does each function do, and why did you
structure it this way?
```

Read the explanation against the actual file. This checks that you understand
what's in your own project before you start changing it.

## Try it yourself

- Ask Claude to add a `priority` field (low/medium/high) to tasks, defaulting to
  "medium." Notice how it finds every place that needs to change (the data
  model, add command, list display) rather than just one.
- Look at the actual files it created (open `tasks.py` in your editor). Does the
  code match what Claude described?

## Checkpoint

- [ ] You have a working `task-tracker/` project with `tasks.py`, `storage.py`,
      and `tasks.json`
- [ ] You ran the CLI yourself and it worked
- [ ] You had Claude explain a file back to you and it matched reality

Next: [Lesson 4 — Reading Code with Claude](04-reading-code.md)
