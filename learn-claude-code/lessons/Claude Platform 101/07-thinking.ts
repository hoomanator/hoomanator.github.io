import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

//npm install dotenv
//to run this typescript: npx tsx filename.ts

const client = new Anthropic();

// The tools array tells Claude what's available:
// a name, a description, and a JSON schema for the inputs.
const tools: Anthropic.Tool[] = [
    {
        name: "get_weather",
        description: "Get today's current weather for a city.",
        input_schema: {
            type: "object",
            properties: {
                city: { type: "string", description: "The city to check" }
            },
            required: ["city"]
        }
    },
];

const WEATHER: Record<string, { temp_f: number; conditions: string }> = {
    "denver": { temp_f: 62, conditions: "foggy" },
    "austin": { temp_f: 62, conditions: "foggy" }
};



function runTool(name: string, input: Record<string, unknown>): unknown {
    const city = String(input.city ?? "").toLowerCase();
    switch (name) {
        case "get_weather":
            return WEATHER[city] ?? { error: `unknown city: ${input.city}` };
        default:
            return { error: `unknown tool: ${name}` };
    }
}

const messages: Anthropic.MessageParam[] = [
    { "role": "user", "content": "Plan a 3-stop weekend road trip from Denver. Weigh weather and drive time. Pick the two best stops." }
]

while (true) {
    const response = await client.messages.create({
        model: "claude-opus-4-7",
        max_tokens: 1024,
        thinking: { type: "adaptive", display: "summarized" },
        output_config: { effort: "high" },
        tools,
        messages,
    });

    console.log(`\nstop_reason=${response.stop_reason}`);
    messages.push({ role: "assistant", content: response.content });


    for (const block of response.content) {
        if (block.type === "thinking") console.log(`\n[thinking]\n${block.thinking}`);
        if (block.type === "text") console.log(`\n[text]\n${block.text}`);
    }

    if (response.stop_reason !== "tool_use") break;

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        const out = runTool(block.name, block.input as Record<string, unknown>);
        console.log(`   tool: ${block.name}(${JSON.stringify(block.input)}) -> ${JSON.stringify(out)}`);
        results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out) });
    }
    messages.push({ role: "user", content: results });
}