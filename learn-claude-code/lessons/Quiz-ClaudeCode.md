1. You can describe exactly what "done" looks like for a task (all tests in a package pass, the type checker reports zero errors) better than you can list the steps to get there. Which approach fits best?

- Run the task in plan mode and read the plan
- Use /goal to set a completion condition so Claude keeps working until a fast evaluator confirms it
- Use loop to re-run the prompt on a fixed interval
- Use /compact with instructions so the summary keeps what mattersa

Use /goal to set a completion condition so Claude keeps working until a fast evaluator confirms itExplanationHow /goal works: The /goal command allows you to define an objective or target end-state (what "done" looks like—such as passing tests or zero type errors) rather than listing step-by-step instructions.The Evaluator Loop: After each turn, a smaller, fast model (Haiku by default) evaluates the transcript to judge whether the completion condition has been satisfied. If not, Claude automatically continues taking turns until the verifiable end state is achieved.Why the other options don't fit:Plan mode: Useful for mapping out step-by-step implementation plans before execution, but it does not drive continuous execution toward a verifiable end state./loop: Re-runs a specific prompt on a fixed interval (e.g., polling or scheduled checks), rather than autonomously executing a task until a specific completion condition is confirmed./compact: Used to summarize conversation context and conserve tokens, not to execute or evaluate ongoing tasks against target criteria.

2. Your team has a hard rule: never push to main. Where should it live so Claude cannot skip it?

- In the project CLAUDE.md as an "IMPORTANT" rule
- In the local CLAUDE.md so it is scoped to you
- In a pre-tool use hook that stops the push
- In a skill's reference.md file

In a pre-tool use hook that stops the push

Explanation
Why Hooks work best: Rules written in CLAUDE.md or skill files rely on natural language prompt adherence. While Claude usually follows instructions, LLMs can occasionally overlook or misinterpret prompt-based constraints under complex contexts. A PreToolUse hook (e.g., executing a script before running Bash commands like git push) operates deterministically at the system level—programmatically intercepting and blocking unauthorized actions regardless of what Claude attempts to do.

Why the other options don't fit:
Project CLAUDE.md / Local CLAUDE.md: Useful for giving Claude context and guidance, but soft prompt constraints can still be accidentally bypassed or hallucinated around.

Skill reference.md: Skills are loaded for context when relevant to specific tasks, making them even less enforced as a global, un-bypassable guardrail.

3. You have typed the same multi-step procedure to Claude more than once, and it includes long reference material and a helper script. How should you package it?

- Paste the whole procedure into CLAUDE.md so it always loads
- Make a skill, keep skill.md lean, and push depth into reference.md and scripts Claude runs when needed
- Put every step and the full reference inline in skill.md so nothing is missed
- Add it as an org-level managed policy

Make a skill, keep skill.md lean, and push depth into reference.md and scripts Claude runs when neededExplanationProgressive Disclosure: Claude Code skills utilize a multi-tier loading architecture. Keeping SKILL.md lean ensures that only the high-level workflow and metadata are initially loaded into context.On-Demand Loading & Execution: Heavy reference material can be stored in bundled references/reference.md files (which Claude reads only if needed), and multi-step logic or scripts can be offloaded into executable scripts/ files, keeping your context window clean and efficient.Why the other options don't fit:Paste the whole procedure into CLAUDE.md: CLAUDE.md is loaded at the start of every session, so putting lengthy procedural documentation and scripts there permanently consumes tokens and clutters the context window.Put every step inline in SKILL.md: Bloating SKILL.md defeats progressive disclosure guidelines, leading to unnecessary token overhead whenever the skill is loaded.Add it as an org-level managed policy: Managed policies are meant for enforcing security rules and organization-wide governance, not for executing reusable multi-step workflows or developer scripts.

4. You ask Claude in auto mode to refactor authentication and it writes broken authentication. What actually happens, and what should you add?

- The classifier blocks it because broken code is dangerous; nothing more needed
- The classifier waves it through because broken is not dangerous; pair auto mode with a stop hook that runs your tests
- Bypass permissions would have caught it; switch to that mode
- Plan mode would have caught it; switch to that mode

The classifier waves it through because broken is not dangerous; pair auto mode with a stop hook that runs your tests

Explanation
Why the classifier lets it pass: Claude Code's auto-mode classifier evaluates safety and permissions (e.g., blocking destructive system commands or unauthorized file access). It does not assess whether refactored code is functionally correct or bug-free, so syntactically valid yet broken code is waved through.

Why Stop Hooks solve it: A Stop hook acts as a completion gate that executes right before Claude finishes its turn. By configuring a Stop hook to run your project's test suite, you can automatically block execution and send test failure context back to Claude until all authentication tests pass cleanly.

5. You want a dependency audit to run every morning at 9am with no machine of yours staying on and no workflow file to maintain. Which tool fits?

- A headless -p run you trigger manually
- The Agent SDK embedded in your own application
- A routine that runs on Anthropic infrastructure on a cron trigger
- A bypass-permissions session left running overnight

A routine that runs on Anthropic infrastructure on a cron triggerExplanationClaude Code Routines run autonomously on Anthropic's managed cloud containers. When configured with a Scheduled (cron) trigger, the routine clones your repository, executes your prompt (e.g., running npm audit or checking dependencies), and finishes on a schedule without requiring your local machine to stay online or needing a manually maintained workflow file (like GitHub Actions).Why the other options don't fit:Headless -p run triggered manually: Requires manual execution, which defeats the purpose of an automated daily 9am schedule.Agent SDK embedded in your own application: Requires hosting, managing, and maintaining your own infrastructure/application.Bypass-permissions session left running overnight: Requires keeping your local computer powered on and running an active session continuously.

6. Your team wants Claude to review every pull request with inline comments and nothing to build or host, and you do not need it to approve or block the PR. Which option fits?

- The Claude Code GitHub action with a custom workflow
- Managed code review through the Claude GitHub app
- A headless -p run triggered by a webhook you maintain
- The /code-review --fix command run locally on each PR

Managed code review through the Claude GitHub appExplanationNo Maintenance / Hosting Required: Managed code review runs automatically on Anthropic's managed cloud infrastructure when linked via the official Claude GitHub App. You don't need to write, build, or maintain custom GitHub Action .github/workflows/ files or host webhook infrastructure.Non-Blocking Inline Comments: It operates as an asynchronous multi-agent review system that scans PR diffs and posts feedback as inline comments without taking over approval or blocking merge status checks.Why the other options don't fit:Claude Code GitHub Action with a custom workflow: Requires writing, configuring, and maintaining custom GitHub Actions workflow YAML files in your repository (.github/workflows/).Headless -p run triggered by a webhook you maintain: Requires building, hosting, and maintaining your own custom server infrastructure to listen for webhooks and trigger the executions.The /code-review --fix command run locally on each PR: Must be executed manually by a developer on their local machine per PR, rather than automatically handling every PR submitted to the repository.

7. A job ran unattended in CI and reports success. What is the most reliable first move before you ship it?

- Read Claude's summary of the run and trust the passing claim
- Start from the diff itself and git diff, and confirm tests actually passed rather than were claimed
- Re-run the same prompt and compare summaries
- Switch the run to bypass permissions and run it again

Start from the diff itself and git diff, and confirm tests actually passed rather than were claimed

Explanation
Verify, Don't Just Trust Summaries: Unattended CI jobs can produce summaries that hallucinate or misinterpret test outputs. Claude may report that a job succeeded simply because no errors were explicitly flagged in its generation, even if tests were skipped or silently failed.

Inspect the Artifacts directly: Reviewing the actual git diff lets you verify code changes firsthand, while inspecting raw CI logs or test suite output ensures the test framework actually executed and reported a 0 exit code before shipping to production.

Why the other options don't fit:
Read Claude's summary and trust it: Summaries can miss critical edge cases or misinterpret test runner output; relying on them blindly introduces risk into production code.

Re-run the same prompt and compare summaries: Comparing two generated text summaries does not guarantee that either summary accurately reflects the underlying code changes or test results.

Switch to bypass permissions and run again: Permission modes control what commands Claude can execute, not whether the code changes are correct or if test assertions were actually validated.

8. A community plugin gives you a skill you want. What should you do before enabling it?

- Install it; plugins cannot change how Claude Code behaves by default
- Install it if it passed automated review, since reviewed means trusted
- Inspect every hook, agent, and MCP server it adds, because a plugin runs code with your privileges and its hooks fire on every matching call
- Rely on namespacing, since a plugin cannot ship a settings.json

Inspect every hook, agent, and MCP server it adds, because a plugin runs code with your privileges and its hooks fire on every matching call

Explanation
Full Security Responsibility: Claude Code plugins execute with your full local user privileges and system access. Furthermore, plugins can register hooks, agents, and MCP servers that execute automatically on matching tool calls or lifecycle events without explicit confirmation each time.

Why Code Audit is Essential: Even if a plugin passes automated checks or comes from a community repository, inspecting the full code structure, scripts, hooks, and MCP connections guarantees that it won't run malicious commands, leak credentials, or alter system behavior unexpectedly.

Why the other options don't fit:
Plugins cannot change behavior by default: Incorrect; plugins can hook into tool execution pipelines and alter Claude's behavior or execute custom scripts during session events.

Automated review means trusted: Automated checks scan for basic static issues, but they do not guarantee safety or eliminate risk from third-party code running in your environment.

Rely on namespacing (cannot ship settings.json): Plugins can ship configuration files and executable scripts; namespacing does not isolate or sandbox code execution privileges.

