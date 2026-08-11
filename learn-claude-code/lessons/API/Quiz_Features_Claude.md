1. What is the Files API used for?

- Scanning files for viruses and malware
- Compressing large files to reduce API costs
- Converting files between different formats automatically
* Uploading files ahead of time and referencing them later instead of encoding them directly in messages

2. You're making many requests with the same large system prompt. What feature would make your requests faster and cheaper?

- PDF processing
- Citations
- Extended thinking
* Prompt caching

3. What is the primary purpose of citations in Claude?

* To create a clear trail from Claude's response back to specific parts of source documents
- To compress large documents for faster processing
- To count the number of words in a document
- To automatically generate footnotes for academic papers

4. When Claude uses extended thinking, what two parts do you get in the response?

* Reasoning process and final answer
- Problem and solution
- Input and output
- Question and answer

5. You want Claude to analyze a PDF document. What's the main difference from sending an image?

* Change the type to "document" and media_type to "application/pdf"
- PDFs cost more to process
- You can only send text, not images in PDFs
- PDFs require special permission

6. What is a key limitation of Claude's Code Execution tool?

- It can only run JavaScript code
* It has no network access and runs in an isolated Docker container
- It requires users to provide their own execution environment
- It can only process text files

A key limitation of Claude's Code Execution tool is that it has no network access and runs in an isolated Docker container.

Because the code runs within a secure, sandboxed environment without internet connectivity, it cannot make web requests, call external APIs, or fetch external data during execution.

7. You want to cache your system prompt. What's the minimum requirement for caching to work?

 - You must make at least 5 requests
 - You must use extended thinking
 - The content must be under 500 tokens
 * The content must be at least 1024 tokens long

