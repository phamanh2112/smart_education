"""
TDD Tests — HTML Structure & Accessibility

Tests validate frontend HTML follows Bootstrap 5 best practices,
semantic structure, and accessibility standards.
"""

import pytest


@pytest.fixture
def html():
    with open('frontend/index.html') as f:
        return f.read()


# ─── HTML Structure ─────────────────────────────────────────────────────────

class TestHTMLStructure:
    """Tests for basic HTML document structure."""

    def test_html5_doctype(self, html):
        assert '<!DOCTYPE html>' in html

    def test_charset_utf8(self, html):
        assert 'charset="UTF-8"' in html or "charset='UTF-8'" in html

    def test_viewport_meta(self, html):
        assert 'viewport' in html
        assert 'width=device-width' in html

    def test_bootstrap_css_included(self, html):
        assert 'bootstrap.min.css' in html

    def test_bootstrap_js_included(self, html):
        assert 'bootstrap.bundle.min.js' in html

    def test_title_tag(self, html):
        assert '<title>' in html and '</title>' in html

    def test_valid_html_structure(self, html):
        assert html.strip().startswith('<!DOCTYPE html>')
        assert '<html' in html
        assert '<head>' in html
        assert '<body>' in html


# ─── Bootstrap Components ───────────────────────────────────────────────────

class TestBootstrapComponents:
    """Tests for Bootstrap UI components."""

    def test_container_class_used(self, html):
        assert 'container' in html or 'container-fluid' in html

    def test_responsive_navbar(self, html):
        assert 'navbar' in html

    def test_grid_system(self, html):
        assert 'row' in html

    def test_buttons_bootstrap_styled(self, html):
        assert 'btn' in html


# ─── Accessibility ──────────────────────────────────────────────────────────

class TestAccessibility:
    """Tests for accessibility best practices."""

    def test_images_have_alt(self, html):
        import re
        imgs = re.findall(r'<img[^>]+>', html)
        for img in imgs:
            assert 'alt=' in img

    def test_headings_hierarchy(self, html):
        assert '<h1' in html or '<h2' in html

    def test_lang_attribute(self, html):
        assert 'lang="en"' in html or "lang='en'" in html
