1. How can you tell if Claude wants to make another tool call in a conversation?

- Check if the response contains the word "tool"
- Check if the response is longer than usual
- Look at the stop_reason field for "tool_use"
- Count the number of message blocks

Look at the stop_reason field for "tool_use".

When Claude decides to invoke a tool, the API response finishes with stop_reason: "tool_use". Additionally, the response's content array will contain one or more blocks with type: "tool_use", providing the specific tool name and input arguments.

2. When Claude uses a tool, what type of message structure does it return?

- Multi-block messages with text and tool use blocks
- Simple text-only responses
- JSON data without any text
- Error messages only

When Claude makes a tool call, the API response contains a content array composed of structured message blocks. This can include:

Text blocks (type: "text"): Containing any accompanying explanation or thoughts Claude generates before invoking the tool.

Tool use blocks (type: "tool_use"): Containing the tool's unique identifier, its name, and the specific parameters/JSON input passed to the tool.

3. What is the main purpose of a JSON schema when working with Claude tools?

- To format the final response for users
- To tell Claude what arguments your function expects and how to use it
- To store the results of tool function calls
- To encrypt data between Claude and your server

To tell Claude what arguments your function expects and how to use it

When defining tools for Claude, you provide a JSON Schema within the tool definition (under the input_schema field). This schema explicitly defines the required parameter names, data types, nested properties, and descriptions so Claude understands what inputs it needs to pass when generating a tool call.

4. What problem does the batch tool solve?

- It makes tools run faster
- It translates tool results into different languages
- It reduces the number of back-and-forth communications when multiple tools are needed
- It automatically fixes errors in tool responses

It reduces the number of back-and-forth communications when multiple tools are needed

Batching allows multiple independent tool calls to be sent in a single request or executed together, preventing the unnecessary latency of waiting for a separate round-trip network response for every individual tool call.

5. What is the correct sequence of steps in the tool use workflow?

- Initial Request → Tool Request → Data Retrieval → Final Response
- Tool Request → Initial Request → Final Response → Data Retrieval
- Final Response → Initial Request → Tool Request → Data Retrieval
- Data Retrieval → Tool Request → Initial Request → Final Response

Initial Request → Tool Request → Data Retrieval → Final Response

Here is how the complete workflow operates step-by-step:

Initial Request: The user sends a prompt or query to the model.

Tool Request: The model determines it needs external information or execution and outputs a structured tool call (stop_reason: "tool_use").

Data Retrieval: Your system executes the requested function/API and sends the result back to the model as a tool_result message block.

Final Response: The model receives the tool's output and generates the final, natural-language response back to the user (stop_reason: "end_turn").

6. Claude can only access information from its training data by default. What allows Claude to get current, real-time information?

- Making educated guesses based on patterns
- Searching through its training data more carefully
- Asking the user to provide more details
- Using tools to access external information

Using tools to access external information

By default, Claude's knowledge is limited to its training data cutoff. To access real-time or current information—such as today's weather, breaking news, or live web content—it must use external tools (like search APIs, web scrapers, or custom integrations) to fetch up-to-date data during the conversation.

7. What makes Claude's built-in text editor and web search tools different from custom tools?

- Claude provides the schema, but you may still need to implement some functionality
- They require special API keys
- They only work with specific file types
- They cost more to use

Claude provides the schema, but you may still need to implement some functionality

Built-in tools (such as Claude's computer use or text editor capabilities) come with pre-defined names, parameters, and JSON schemas specified by Anthropic. However, for client-side tools like the text editor, your application is still responsible for executing the requested file actions (such as viewing, writing, or editing files) on your system and returning the result back to Claude.