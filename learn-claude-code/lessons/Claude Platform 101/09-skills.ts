import "dotenv/config";
import fs from "node:fs";
import Anthropic, { toFile } from "@anthropic-ai/sdk";

const skillContent = `---
name: daily-status
description: Summarizes a daily status update.
---

# Daily Status

Instructions for producing a daily status update go here.
`;

const client = new Anthropic();

//generate sill from skill content
const skill = await client.skills.create({
    files: [await toFile(new File([skillContent], "SKILL.md", { type: "text/markdown" }))],
});

console.log(skill.id);

//upload skill
const skill2 = await client.skills.create({
    files: [await toFile(fs.createReadStream("SKILL.md"), "SKILL.md", { type: "text/markdown" })],
});

console.log(skill2.id);
