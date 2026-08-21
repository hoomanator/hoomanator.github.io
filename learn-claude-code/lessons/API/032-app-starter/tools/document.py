import os
from markitdown import MarkItDown, StreamInfo
from io import BytesIO
from pydantic import Field


def binary_document_to_markdown(binary_data: bytes, file_type: str) -> str:
    """Converts binary document data to markdown-formatted text."""
    md = MarkItDown()
    file_obj = BytesIO(binary_data)
    stream_info = StreamInfo(extension=file_type)
    result = md.convert(file_obj, stream_info=stream_info)
    return result.text_content


def document_path_to_markdown(
    file_path: str = Field(
        description="Absolute or relative path to a PDF or DOCX file to convert"
    ),
) -> str:
    """Reads a PDF or DOCX file from disk and converts its contents to markdown.

    Given a local filesystem path, reads the file's binary contents and
    converts it to markdown-formatted text. The file type is inferred from
    the path's extension.

    When to use:
    - When you have a path to a PDF or DOCX file on disk and need its
      content as markdown
    - When you need to extract text from a local document file for further
      processing or summarization

    When not to use:
    - When you already have the document's bytes in memory rather than a
      path (use binary_document_to_markdown instead)
    - For file types other than PDF or DOCX

    Examples:
    >>> document_path_to_markdown("/path/to/report.pdf")
    '# Report Title\\n\\nReport contents...'
    """
    file_type = os.path.splitext(file_path)[1].lstrip(".")
    with open(file_path, "rb") as f:
        binary_data = f.read()
    return binary_document_to_markdown(binary_data, file_type)
