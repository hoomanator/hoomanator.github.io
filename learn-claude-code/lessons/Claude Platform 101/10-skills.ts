import "dotenv/config";
import Anthropic, { toFile } from "@anthropic-ai/sdk";

const skillContent = `---
name: daily-status
description: Summarizes a daily status update.
---

# Daily Status

Instructions for producing a daily status update go here.
`;

const client = new Anthropic();

const skill = await client.skills.create({
    files: [await toFile(new File([skillContent], "SKILL.md", { type: "text/markdown" }))],
});

console.log(skill.id);

const activity = `
- 09:12 commit: refactor proposal sidebar
- 10:45 meeting: kick off with Riverside Pavilion stakeholders
- 14:02 commit: add fact-check route
- 15:30 blocker: waiting on legal review for MSA
`.trim();

const calc = await client.beta.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 2048,
  betas: ["code-execution-2025-08-25"],
  container: {
    skills: [{ type: "custom", skill_id: skill.id, version: "latest" }],
  },
  tools: [{ type: "code_execution_20260521", name: "code_execution" }],
  messages: [
    {
      role: "user",
      content: `Generate today's status report for project "Riverside Pavilion" using these activity logs:\n\n${activity}`,
    },
  ],
});

for (const block of calc.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}