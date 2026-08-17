# Agent Instructions for Document Tools MCP Server

This is a Python MCP (Model Context Protocol) server that provides tools for document processing and conversion.

## Quick Start

**Setup:**
```bash
uv venv
source .venv/bin/activate
uv pip install -e .
```

**Run the server:**
```bash
python main.py
```

**Run tests:**
```bash
pytest
```

## Project Structure

```
.
├── main.py              # MCP server entry point - registers tools
├── tools/
│   ├── math.py         # Math tools (arithmetic operations)
│   └── document.py     # Document processing tools (format conversion)
├── tests/
│   ├── test_document.py     # Unit tests
│   └── fixtures/            # Test data files (PDF, DOCX samples)
└── pyproject.toml       # Project metadata and dependencies
```

## Tool Definition Convention

All tools follow this pattern:

1. **Function signature** with `pydantic.Field` for parameters:
   ```python
   from pydantic import Field
   
   def my_tool(
       param1: str = Field(description="What this parameter does"),
       param2: int = Field(description="What this parameter does")
   ) -> ReturnType:
   ```

2. **Comprehensive docstring** with:
   - One-line summary
   - Detailed explanation of functionality
   - "When to use" section (when and when NOT to use)
   - Usage examples with expected input/output

3. **Register with MCP** in `main.py`:
   ```python
   mcp.tool()(my_function)
   ```

**Example:**
See [tools/math.py](tools/math.py) for a well-documented tool example.

## Testing

- All test files are in `tests/` prefixed with `test_`
- Use pytest fixtures for test data in `tests/fixtures/`
- Read binary test files (PDF, DOCX) like:
  ```python
  with open(fixture_path, "rb") as f:
      data = f.read()
  ```

## Key Dependencies

- **mcp**: Model Context Protocol framework (currently v1.8.0)
- **pydantic**: Data validation and parameter documentation (v2.11.3+)
- **markitdown**: Document format conversion (handles DOCX, PDF, images, etc.)
- **pytest**: Testing framework

## Common Tasks

**Add a new tool:**
1. Create function in appropriate file (`tools/math.py` or `tools/document.py`)
2. Use `pydantic.Field` for all parameters with descriptions
3. Write comprehensive docstring (see `tools/math.py` example)
4. Register in `main.py` with `mcp.tool()(function_name)`
5. Add test in `tests/test_document.py` with fixtures in `tests/fixtures/`

**Run the MCP server:**
```bash
python main.py
```
The server starts on stdio and waits for MCP protocol messages.

**Fix test issues:**
- Verify fixture files exist in `tests/fixtures/` with correct file extensions
- Check that test fixtures match the file types being tested (`.docx`, `.pdf`)

## Debugging

The MCP server uses stdio for communication. When running in development:
- Run `python main.py` in a terminal to see any startup errors
- Tools are invoked through the MCP protocol (not direct function calls)
- Pydantic validation errors are returned through the MCP protocol
