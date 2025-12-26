import pytest
from pages.project_page import ProjectPage

class TestProjectPage:
    """Test cases untuk Project Pages"""
    
    def test_project_page_loads(self, driver):
        """Test 1: Project page bisa dibuka"""
        project = ProjectPage(driver)
        project.open_project_page()
        
        assert "/project-pages" in driver.current_url
        print("✓ Project page berhasil dibuka")
    
    def test_project_parallax_scroll(self, driver):
        """Test 2: Parallax scroll di project page"""
        project = ProjectPage(driver)
        project.open_project_page()
        
        initial_position = driver.execute_script("return window.pageYOffset;")
        project.scroll_project_sections()
        final_position = driver.execute_script("return window.pageYOffset;")
        
        assert final_position > initial_position
        print(f"✓ Project parallax scroll berfungsi ({initial_position} -> {final_position}px)")
    
    def test_project_cards_visible(self, driver):
        """Test 3: Project cards terlihat setelah scroll"""
        project = ProjectPage(driver)
        project.open_project_page()
        
        cards = project.get_project_cards()
        assert len(cards) > 0
        print(f"✓ Ditemukan {len(cards)} project cards")
    
    def test_project_detail_navigation(self, driver):
        """Test 4: Navigation ke detail project"""
        project = ProjectPage(driver)
        project.open_project_page()
        
        success = project.click_first_project()
        assert success
        
        # Verify URL berubah ke /project/:id
        current_url = project.get_current_url()
        assert "/project/" in current_url
        print(f"✓ Detail project berhasil dibuka: {current_url}")
