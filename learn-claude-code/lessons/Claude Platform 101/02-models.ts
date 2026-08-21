import Anthropic from "@anthropic-ai/sdk";

//to run this typescript: npx tsx filename.ts

const MODELS = ["claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"] as const;

const client = new Anthropic();

const prompt = "Explain prompt caching in two sentenses.";

for (const model of MODELS) {
  const start = Date.now();
  const res = await client.messages.create({
    model,
    max_tokens: 256,
    messages: [
    { role: "user", content: prompt},
    ],
  });

  const ms = Date.now() - start;

  
  const text = res.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("");  

  console.log(`\n[${model}] ${ms}ms in=${res.usage.input_tokens} out=${res.usage.output_tokens}`);  
  console.log(text)
}