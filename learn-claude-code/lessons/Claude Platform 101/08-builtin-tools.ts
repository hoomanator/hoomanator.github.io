import Anthropic from "@anthropic-ai/sdk";

//to run this typescript: npx tsx filename.ts

const client = new Anthropic();

console.log("=== web_search ===\n");



const search = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools: [{ type: "web_search_20260318", name: "web_search" }],
  messages: [
    {
      role: "user", content: "what is the most recent Anthropic Claude model release? One sentence.",
    },
  ],
});

for (const block of search.content) {
  if (block.type === "text") {
    console.log(block.text);
  }

  if (block.type === "server_tool_use")
    console.log(` [tool]: ${block.name}(${JSON.stringify(block.input)}`);
}

console.log("=== code execution ===\n");

const calc = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 2048,
  tools: [{ type: "code_execution_20250825", name: "code_execution" }],
  messages: [
    {
      role: "user", content: "Compute the standard deviationof [4,8,15,16,23,42] using Python. Show mw the code.",
    },
  ],
});

for (const block of calc.content) {
  if (block.type === "server_tool_use" && block.name === "bash_code_execution") {
    const input = block.input as { code?: string };
    console.log(`[python]\n${input.code ?? ""}`);
  }

  if (block.type === "code_execution_tool_result") {
    const c = block.content;
    if (c && c.type === "code_execution_result")
      console.log(`[stdout]\n${c.stdout || c.stderr || ""}`);
  }

  if (block.type === "text") {
    console.log(`\n${block.text}`);
  }

}