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
        description: "Get the current weather for a city.",
        input_schema: {
            type: "object",
            properties: { city: { type: "string" }
            },
            required: ["city"],
        },
    }
]

const WEATHER: Record<string, {temp_f: number; conditions:string}> = {
  "san francisco": {temp_f:62 , conditions:"foggy"},
  "austin" : {temp_f: 62, conditions: "foggy" }
};

// run_tool is just a hardcoded lookup.
// In a real app, this would hit your database, an API, whatever.
function runTool(name: string, input: Record<string, unknown>): unknown{
    if (name == "get_weather") {
      const city = String(input.city??"").toLowerCase();
        return WEATHER[city]??{error:`unknown city: ${input.city}`};
    }

    return{error:`unknown tool: ${name}`};
  }

const messages: Anthropic.MessageParam[] = [
    {"role": "user", "content": "What should I wear in Austin today?"}
]

// The agent loop. Each iteration sends messages to Claude
// and switches on the response's stop reason.

let turn = 0;
while (true) {
  turn++;

  const res = await client.messages.create({
        model : "claude-sonnet-4-6",
        max_tokens : 1024,
        tools,
        messages,
 } );

   console.log(`\n--- turn ${turn} (stop_reason=${res.stop_reason}) ---`);
   messages.push({ role: "assistant", content: res.content});

   if(res.stop_reason === "end_turn") {
    const text = res.content.find((b) => b.type === "text");
    if(text?.type === "text") console.log(`\nFINAL: ${text.text}`);
    break;
   }

   if(res.stop_reason === "tool_use") {
    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of res.content) {
      if(block.type !== "tool_use") continue;
      const out = runTool(block.name, block.input as Record<string, unknown>);  
      console.log(`   tool: ${block.name}($JSON.stringify(block.input)}) -> ${JSON.stringify(out)}`);
      results.push({type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out)}); 
   }

   messages.push({role: "user", content: results});
  }
}   
