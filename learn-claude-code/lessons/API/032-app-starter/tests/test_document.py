import os
import pytest
from tools.document import binary_document_to_markdown, document_path_to_markdown


class TestBinaryDocumentToMarkdown:
    # Define fixture paths
    FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")
    DOCX_FIXTURE = os.path.join(FIXTURES_DIR, "mcp_docs.docx")
    PDF_FIXTURE = os.path.join(FIXTURES_DIR, "mcp_docs.pdf")

    def test_fixture_files_exist(self):
        """Verify test fixtures exist."""
        assert os.path.exists(self.DOCX_FIXTURE), (
            f"DOCX fixture not found at {self.DOCX_FIXTURE}"
        )
        assert os.path.exists(self.PDF_FIXTURE), (
            f"PDF fixture not found at {self.PDF_FIXTURE}"
        )

    def test_binary_document_to_markdown_with_docx(self):
        """Test converting a DOCX document to markdown."""
        # Read binary content from the fixture
        with open(self.DOCX_FIXTURE, "rb") as f:
            docx_data = f.read()

        # Call function
        result = binary_document_to_markdown(docx_data, "docx")

        # Basic assertions to check the conversion was successful
        assert isinstance(result, str)
        assert len(result) > 0
        # Check for typical markdown formatting - this will depend on your actual test file
        assert "#" in result or "-" in result or "*" in result

    def test_binary_document_to_markdown_with_pdf(self):
        """Test converting a PDF document to markdown."""
        # Read binary content from the fixture
        with open(self.PDF_FIXTURE, "rb") as f:
            pdf_data = f.read()

        # Call function
        result = binary_document_to_markdown(pdf_data, "pdf")

        # Basic assertions to check the conversion was successful
        assert isinstance(result, str)
        assert len(result) > 0
        # Check for typical markdown formatting - this will depend on your actual test file
        assert "#" in result or "-" in result or "*" in result


class TestDocumentPathToMarkdown:
    FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")
    DOCX_FIXTURE = os.path.join(FIXTURES_DIR, "mcp_docs.docx")
    PDF_FIXTURE = os.path.join(FIXTURES_DIR, "mcp_docs.pdf")

    def test_document_path_to_markdown_with_pdf(self):
        """Reading a PDF by path returns its actual content, not just any string."""
        result = document_path_to_markdown(self.PDF_FIXTURE)

        assert isinstance(result, str)
        assert "Model Context Protocol" in result

    def test_document_path_to_markdown_with_docx(self):
        """Reading a DOCX by path returns its actual content, not just any string."""
        result = document_path_to_markdown(self.DOCX_FIXTURE)

        assert isinstance(result, str)
        assert "Model Context Protocol" in result

    def test_nonexistent_path_raises_file_not_found(self):
        """A missing path should fail clearly rather than with an opaque error."""
        missing_path = os.path.join(self.FIXTURES_DIR, "does_not_exist.pdf")

        with pytest.raises(FileNotFoundError):
            document_path_to_markdown(missing_path)

    def test_directory_path_raises_is_a_directory_error(self):
        """Passing a directory instead of a file should fail clearly."""
        with pytest.raises(IsADirectoryError):
            document_path_to_markdown(self.FIXTURES_DIR)

    def test_unsupported_extension_falls_back_to_plain_text(self, tmp_path):
        """markitdown has no extension-specific converter for .txt, so it
        falls back to reading the raw content rather than raising - this
        locks in that (permissive) behavior rather than assuming an error."""
        txt_file = tmp_path / "notes.txt"
        txt_file.write_text("hello from a plain text file")

        result = document_path_to_markdown(str(txt_file))

        assert "hello from a plain text file" in result

    def test_corrupted_pdf_does_not_raise(self, tmp_path):
        """A .pdf-named file with garbage bytes isn't valid PDF content, but
        markitdown falls back to a generic converter instead of raising -
        this locks in that (permissive) behavior rather than assuming an
        error, since silent garbage output would otherwise go unnoticed."""
        bad_pdf = tmp_path / "broken.pdf"
        bad_pdf.write_bytes(b"not a real pdf file")

        result = document_path_to_markdown(str(bad_pdf))

        assert isinstance(result, str)

    def test_registered_as_mcp_tool(self):
        """tools/ functions aren't live until explicitly registered in
        main.py (see CLAUDE.md) - this guards against defining the tool but
        forgetting that separate step."""
        main_source = open(
            os.path.join(os.path.dirname(__file__), "..", "main.py")
        ).read()

        assert "mcp.tool()(document_path_to_markdown)" in main_source
