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
    {
        name: "get_forecast",
        description: "Get the weather forecast for the next few days for a city.",
        input_schema: {
            type: "object",
            properties: {
                city: { type: "string", description: "The city to check" }
            },
            required: ["city"]
        }
    }
];

const WEATHER: Record<string, { temp_f: number; conditions: string }> = {
    "denver": { temp_f: 62, conditions: "foggy" },
    "austin": { temp_f: 62, conditions: "foggy" }
};

const FORECAST: Record<string, { day: string; high: number; low: number }[]> = {
    austin: [
        { day: "Tue", high: 90, low: 71 },
        { day: "Wed", high: 86, low: 62 },
        { day: "Thu", high: 82, low: 65 },
    ],
    denver: [
        { day: "Tue", high: 90, low: 71 },
        { day: "Wed", high: 86, low: 62 },
        { day: "Thu", high: 82, low: 65 },
    ],
};

function runTool(name: string, input: Record<string, unknown>): unknown{
      const city = String(input.city??"").toLowerCase();
      switch(name)
      {
        case "get_weather":
            return WEATHER[city]??{error:`unknown city: ${input.city}`};
        case "get_forecast":
               return FORECAST[city]??{error:`unknown city: ${input.city}`}; 
        default: 
                return{error:`unknown tool: ${name}`};
      }
  }

  const messages: Anthropic.MessageParam[] = [
  {"role": "user", "content": "I am packing for a 3-day trip to denver. Tell me today's weather and what to expect for next couple of days?"}
]

while (true) {
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages,
        tools,
    });

    //if (response.stop_reason !== "tool_use") {
        // Claude is done — this is the final answer
    //    break;
    //}

    console.log(`\nstop_reason=${response.stop_reason}`);
    messages.push({ role: "assistant", content: response.content });

    if(response.stop_reason === "end_turn")
    {
        const text = response.content.find((b) => b.type === "text");
        if(text?.type === "text") console.log(`\nFINAL:${text.text}`);
        break;
    }

    if(response.stop_reason === "tool_use") {
        const results: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if(block.type !== "tool_use") continue;
          const out = runTool(block.name, block.input as Record<string, unknown>);  
          console.log(`   tool: ${block.name}($JSON.stringify(block.input)}) -> ${JSON.stringify(out)}`);
          results.push({type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out)}); 
       }
    
       messages.push({role: "user", content: results});
    }
}