import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

//npm install dotenv
//to run this typescript: npx tsx filename.ts

const client = new Anthropic();



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

// The tools array tells Claude what's available:
// a name, a description, and a JSON schema for the inputs.
const get_weather = betaZodTool(
    {
        name: "get_weather",
        description: "Get today's current weather for a city.",
        inputSchema: z.object({ city: z.string() }),
        run: ({ city }) =>
            JSON.stringify(
                WEATHER[city.toLowerCase()] ?? { error: `unknown city : ${city}` },
            ),
    });

const get_forecast = betaZodTool(
    {
        name: "get_forecast",
        description: "Get the weather forecast for the next few days for a city.",
        inputSchema: z.object({ city: z.string() }),
        run: ({ city }) =>
            JSON.stringify(
                FORECAST[city.toLowerCase()] ?? { error: `unknown city : ${city}` },
            ),
    });


const runner = client.beta.messages.toolRunner({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools: [get_weather, get_forecast],
    messages: [
        { "role": "user", "content": "I am packing for a 3-day trip to denver. Tell me today's weather and what to expect for next couple of days?" }
    ]
});



const finalMessage = await runner.runUntilDone();


for (const block of finalMessage.content) {
    if (block.type === "text") {
        console.log(block.text);
    }

}



