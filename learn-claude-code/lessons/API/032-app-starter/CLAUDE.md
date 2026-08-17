# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Python MCP (Model Context Protocol) server exposing document-processing and utility tools to AI assistants, built on `mcp[cli]` (FastMCP) and `markitdown`.

## Commands

```bash
# Setup
uv venv
source .venv/bin/activate
uv pip install -e .

# Run the MCP server (stdio transport)
uv run main.py

# Run all tests
uv run pytest

# Run a single test
uv run pytest tests/test_document.py::TestBinaryDocumentToMarkdown::test_binary_document_to_markdown_with_pdf
```

## Architecture

- `main.py` — MCP server entry point. Creates the `FastMCP` instance and registers each tool function explicitly via `mcp.tool()(function_name)`. **A tool function existing in `tools/` does not mean it's live** — check `main.py` to see what's actually registered (e.g. `tools/document.py:binary_document_to_markdown` is defined but not currently registered).
- `tools/` — plain Python functions, one concern per module (`math.py`, `document.py`). These are the units registered as MCP tools; nothing here talks to MCP directly.
- `tests/` — pytest tests named `test_*.py`, with binary fixtures (PDF/DOCX) under `tests/fixtures/` read via `open(path, "rb")`.

## Tool definition convention

Every tool function follows this shape (see `tools/math.py` as the canonical example):

1. Parameters typed with `pydantic.Field(description=...)` for every argument — these descriptions are surfaced to the calling model.
2. A comprehensive docstring: one-line summary, detailed explanation, an explicit "When to use" (and when not to use) section, and usage examples with expected input/output.
3. Explicit registration in `main.py` via `mcp.tool()(function_name)` — this step is separate from defining the function and is easy to forget.

When adding a new tool: define it in the appropriate `tools/` module following the convention above, register it in `main.py`, and add a corresponding test in `tests/` with any needed fixtures in `tests/fixtures/`.
