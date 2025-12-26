import pytest
import time
from pages.project_detail_page import ProjectDetailPage
from config import TestConfig  # ← IMPORT CONFIG


class TestProjectDetailPage:
    """Test cases untuk Project Detail Page"""

    # ID Project yang valid dari database
    VALID_PROJECT_ID = TestConfig.VALID_PROJECT_ID
    
    def test_project_detail_loads_with_valid_id(self, driver):
        """Test 1: Detail project bisa dibuka dengan ID yang valid"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)

        time.sleep(TestConfig.MEDIUM_WAIT)
        
        title = detail.get_project_title()
        assert len(title) > 0
        assert title != "Project Tidak Ditemukan", "Project ID tidak valid, halaman menampilkan error"
        print(f"✓ Project detail berhasil dibuka: {title}")
    
    def test_back_button_works(self, driver):
        """Test 2: Back button berfungsi"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        success = detail.click_back_button()
        assert success, "Back button gagal di-click"
        
        time.sleep(1)  # Wait untuk navigation selesai
        assert "/project-pages" in driver.current_url, f"URL tidak berubah ke project-pages: {driver.current_url}"
        print("✓ Back button berhasil kembali ke project list")
    
    def test_carousel_visible(self, driver):
        """Test 3: Carousel gambar project terlihat"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        is_visible = detail.is_carousel_visible()
        assert is_visible, "Carousel tidak terlihat"
        
        counter = detail.get_carousel_counter()
        print(f"✓ Carousel terlihat dengan counter: {counter}")
    
    def test_info_section_has_items(self, driver):
        """Test 4: Info section menampilkan data"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        items = detail.get_info_items()
        assert len(items) > 0, "Info section tidak memiliki items"
        print(f"✓ Info section memiliki {len(items)} items")
    
    def test_about_section_has_content(self, driver):
        """Test 5: About section memiliki konten"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        paragraphs = detail.get_about_paragraphs()
        assert len(paragraphs) > 0, "About section tidak memiliki paragraphs"
        print(f"✓ About section memiliki {len(paragraphs)} paragraphs")
    
    def test_navigation_to_prev_project(self, driver):
        """Test 6: Navigation ke project sebelumnya"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        current_title = detail.get_project_title()
        success = detail.click_prev_project()
        
        assert success, "Gagal click button 'Project Sebelumnya'"
        time.sleep(2)
        
        new_title = detail.get_project_title()
        assert new_title != current_title, f"Title tidak berubah: {current_title}"
        assert new_title != "Project Tidak Ditemukan", "Previous project tidak ditemukan"
        print(f"✓ Navigasi ke project sebelumnya berhasil: {current_title} → {new_title}")
    
    def test_navigation_to_next_project(self, driver):
        """Test 7: Navigation ke project selanjutnya"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        current_title = detail.get_project_title()
        success = detail.click_next_project()
        
        assert success, "Gagal click button 'Project Selanjutnya'"
        time.sleep(2)
        
        new_title = detail.get_project_title()
        assert new_title != current_title, f"Title tidak berubah: {current_title}"
        assert new_title != "Project Tidak Ditemukan", "Next project tidak ditemukan"
        print(f"✓ Navigasi ke project selanjutnya berhasil: {current_title} → {new_title}")
    
    def test_related_projects_visible(self, driver):
        """Test 8: Related projects terlihat"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        related = detail.get_related_projects()
        assert len(related) > 0, "Tidak ada related projects yang terlihat"
        assert len(related) <= 2, f"Related projects seharusnya maksimal 2, tapi ada {len(related)}"
        print(f"✓ Ditemukan {len(related)} related projects")
    
    def test_click_related_project(self, driver):
        """Test 9: Click related project untuk navigasi ke detail lain"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        original_url = driver.current_url
        success = detail.click_first_related_project()
        
        assert success, "Gagal click related project card"
        time.sleep(2)
        
        new_url = driver.current_url
        assert new_url != original_url, f"URL tidak berubah setelah click related project"
        assert "/project/" in new_url, f"URL tidak mengarah ke detail project: {new_url}"
        print(f"✓ Click related project berhasil: {original_url} → {new_url}")
    
    def test_scroll_to_top_button(self, driver):
        """Test 10: Scroll to top button berfungsi"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        success = detail.click_scroll_to_top()
        assert success, "Scroll to top button gagal di-click"
        
        time.sleep(1)
        # Check position setelah scroll to top
        position = driver.execute_script("return window.pageYOffset;")
        assert position < 150, f"Posisi scroll tidak di top: {position}px"
        print(f"✓ Scroll to top berfungsi, position: {position}px")
    
    def test_cta_hubungi_kami_button(self, driver):
        """Test 11: CTA Hubungi Kami button berfungsi"""
        detail = ProjectDetailPage(driver)
        detail.open_project_detail(self.VALID_PROJECT_ID)
        
        success = detail.click_hubungi_kami()
        assert success, "CTA Hubungi Kami button gagal di-click"
        
        time.sleep(1)
        # Seharusnya navigate ke landing page dengan state scrollTo section7
        assert driver.current_url == f"{driver.base_url}/" or "localhost" in driver.current_url
        print(f"✓ CTA Hubungi Kami berhasil navigasi ke: {driver.current_url}")