1. You want to send a request to Claude's API. What's the minimum information you must include?

- Only the API key and your question
- Just your message text
- API key, model name, messages, and max tokens
- Your name, email, and message

API key, model name, messages, and max tokens

Key Requirements for Anthropic's Messages API
API Key: Sent via authentication headers (x-api-key) to authorize the request.

model: Specifies which Claude model to invoke (e.g., claude-3-5-sonnet-20241022).

messages: An array containing the prompt or conversation context.

max_tokens: Unlike some other LLM APIs, Anthropic requires you to explicitly specify the maximum number of tokens to generate in the response.

2. You ask Claude "What is pizza?" and it answers. Then you ask "What toppings are popular?" but Claude doesn't understand what you're referring to. What's the problem?

- Your internet connection is slow
- Claude is broken
- You asked too quickly
- Claude doesn't remember previous messages

Claude doesn't remember previous messages

Why this happens
LLM APIs (including Claude's) are stateless. Every API request is completely independent, meaning the model has no built-in memory of past interactions.

To maintain context in a multi-turn conversation, you must include the entire conversation history—both user prompts and Claude's previous responses—in the messages array with every new request you send. Without sending that past context, asking "What toppings are popular?" lacks the context of "pizza."

3. When Claude processes your text, what's the first thing it does?

- Generates a response immediately
- Checks if it's appropriate content
- Breaks it into smaller chunks called tokens
- Translates it to another language

Breaks it into smaller chunks called tokens

How Tokenization Works
Before an LLM like Claude can process, understand, or generate text, it must first convert the raw input text into tokens (words, sub-words, or characters) and map them to numerical values (embeddings) that the model's neural network can calculate.

4. Users complain your chat app feels slow because they wait 20 seconds staring at a loading spinner, then all the generated text appears at once. What can fix this?

- Asking shorter questions
- Using a faster internet connection
- Enabling response streaming
- Using a different web browser

Enabling response streaming

Why Streaming Solves This
Instead of making the user wait for the model to generate the entire response on the server before sending it back, response streaming (using Server-Sent Events or WebSockets) sends tokens back to the client bit by bit as they are generated in real time.

This drastically reduces the Time to First Token (TTFT), making the app feel responsive immediately instead of keeping users staring at a loading spinner.

5. You're building a web app that talks to Claude. Where should you store your API key?

- In your mobile app that users install
- In a text file on the user's computer
- On your server that users can't access
- In your JavaScript code that users download

On your server that users can't access

Why this is essential for security
Your API key acts as a secret credential tied directly to your billing account.

Why client-side storage fails: Any code or file sent to the user's browser or device (JavaScript code, mobile app bundles, files on their machine) can easily be inspected, reverse-engineered, or decompiled to extract the key.

The secure approach: Store the API key in environment variables on a secure backend server. Your client app sends requests to your backend, and your server securely proxies those requests to Anthropic's API without ever exposing the key to the user.

6. You're building a math tutor bot. You want Claude to give hints instead of direct answers. What should you use?

- Setting a very low word limit
- Using all capital letters in your messages
- A system prompt explaining the tutor role
- Asking users to be more specific

A system prompt explaining the tutor role

Why System Prompts Are Ideal for Behavioral Roles
A system prompt (or system message) allows you to set high-level guidelines, persona rules, and behavioral boundaries for the model before the conversation even starts.

By instructing Claude in the system prompt to act like a supportive tutor—guided by instructions such as "Never give the final answer directly; instead, guide the user step-by-step using hints and probing questions"—it consistently maintains that teaching approach across all user interactions.

7. You want Claude to give very predictable, consistent answers for a factual Q&A app. What temperature setting should you use?

- Temperature doesn't matter for facts
- Low temperature (near 0.0)
- Medium temperature (around 0.5)
- High temperature (near 1.0)

Low temperature (near 0.0)

Why Low Temperature Works Best for Deterministic Outputs
Temperature controls the randomness and creativity of the model's token selections:

Low Temperature (0.0 – 0.2): Makes token selection deterministic (choosing the most probable words every time). This produces consistent, repeatable, and precise answers—ideal for factual Q&A, code generation, and structured data output.

High Temperature (0.7 – 1.0): Increases randomness and output diversity, making it better for creative writing, brainstorming, and open-ended roleplay.

8. You're building an app that needs clean JSON from Claude with no extra text or formatting. How do you get just the raw JSON?

- Send the request multiple times and pick the best one
- Ask Claude very nicely to only return JSON
- Combine prefilled messages and stop sequences
- Use a very high temperature setting

Combine prefilled messages and stop sequences

How Prefilled Messages & Stop Sequences Work
Prefilling the Assistant Response: Anthropic allow you to prefill the beginning of Claude’s response in the messages array by passing an assistant role message containing just {. This forces Claude to start generating immediately inside the JSON object, skipping conversational openers like "Here is your JSON:".

Stop Sequences: By setting a stop sequence (such as } or stopping on valid JSON endings), you can ensure the model stops generating immediately once the JSON structure closes, preventing post-response chatter.

Note: Anthropic also supports JSON Mode / Structured Outputs directly via JSON Schema or tool/function calling parameters, but combining prefilled text and stop sequences is a classic API technique specifically used to force raw output formats without conversational fluff.