1. Claude Code works as an AI agent. What is an AI agent?

- A chatbot that responds to questions in real time
- A code editor with built-in autocomplete features
- A cloud service that hosts your development projects
- AI that takes action to complete goals

AI that takes action to complete goals

What makes an AI agent different?
Action & Autonomy: While a traditional chatbot simply answers questions or generates text, an AI agent can plan steps, execute actions (like running terminal commands, editing files, or calling APIs), evaluate the results of those actions, and iterate independently to achieve a specific goal.

2. What happens when Claude Code reaches its context window limit?

- It switches to a smaller, faster model to save memory
- It removes your oldest files to make room for new ones
- It automatically compacts your conversation to free up space
- It stops working and asks you to restart the session

It automatically compacts your conversation to free up spaceHow it works:When a session approaches the context window limit, Claude Code performs auto-compaction. It summarizes earlier messages and removes redundant tool outputs while preserving key code snippets and decisions, allowing you to continue working seamlessly without losing your session state.

3. What is the recommended workflow for using Claude Code effectively?

- Code → Test → Deploy → Monitor
- Explore → Plan → Code → Commit
- Write → Review → Merge → Ship
- Prompt → Accept → Push → Repeat

Explore → Plan → Code → CommitWhy this workflow is recommended:Explore: Claude reads and analyzes the existing codebase to understand context and dependencies before writing any code.Plan: Using Plan Mode, Claude maps out a clear, step-by-step strategy for the implementation without modifying files yet.Code: Claude executes the implementation according to the plan, verifying and testing incrementally.Commit: Once the changes pass checks and meet criteria, the code is documented, committed, or prepared as a pull request.

4. How does Claude Code use the CLAUDE.md file?

- It reads it only after you run the /init command
- It reads it once when you first create the project
- It reads it automatically at the start of every session
- It only reads it when you explicitly ask it to

It reads it automatically at the start of every sessionHow CLAUDE.md works:Automatic Session Context: Whenever you open a session with Claude Code in a project folder, it looks for the CLAUDE.md file in the root directory and reads it automatically.Project Rules & Conventions: The file acts as persistent memory or "house rules" for that codebase, containing instructions like build commands, test syntax, indentation style, and architectural guidelines.No Manual Trigger Needed: You do not need to load it manually or mention it in your prompt—its contents are loaded silently at session start.

5. 