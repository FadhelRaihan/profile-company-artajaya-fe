from selenium.webdriver.common.by import By
from pages.base_page import BasePage
import time

class LandingPage(BasePage):
    """Page object untuk Landing Page"""
    
    # Locators berdasarkan navbar-profile.tsx
    HAMBURGER_MENU = (By.CSS_SELECTOR, "svg.lucide-menu")
    CLOSE_MENU = (By.CSS_SELECTOR, "svg.lucide-x")
    NAVBAR_OVERLAY = (By.CSS_SELECTOR, "div[class*='fixed']")
    
    # Menu links (dalam hamburger menu)
    PROJECTS_LINK = (By.XPATH, "//button[contains(text(), 'Projects')]")
    TENTANG_KAMI_LINK = (By.XPATH, "//button[contains(text(), 'Tentang Kami')]")
    TIM_KAMI_LINK = (By.XPATH, "//a[contains(text(), 'Tim Kami')]")
    KONTAK_KAMI_LINK = (By.XPATH, "//button[contains(text(), 'Kontak Kami')]")
    
    # Project cards in navbar - UPDATE SELECTOR
    PROJECT_CARD_LINKS = (By.XPATH, "//a[contains(@href, '/project/')]")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/"
    
    def open_landing_page(self):
        """Buka landing page"""
        self.open(self.url)
        time.sleep(2)
        return self
    
    def open_hamburger_menu(self):
        """Click hamburger menu untuk buka navbar"""
        try:
            menu = self.helpers.wait_for_clickable(self.driver, *self.HAMBURGER_MENU, timeout=5)
            menu.click()
            time.sleep(1.5)  # Tambah delay untuk animasi
            return True
        except:
            return False
    
    def close_hamburger_menu(self):
        """Close hamburger menu"""
        try:
            close = self.helpers.wait_for_clickable(self.driver, *self.CLOSE_MENU, timeout=5)
            close.click()
            time.sleep(0.5)
            return True
        except:
            return False
    
    def is_hamburger_menu_visible(self):
        """Check apakah hamburger menu visible"""
        try:
            menu = self.find_element(*self.HAMBURGER_MENU)
            return menu.is_displayed()
        except:
            return False
    
    def is_menu_opened(self):
        """Check apakah menu sudah terbuka"""
        try:
            overlay = self.find_element(*self.NAVBAR_OVERLAY)
            return overlay.is_displayed()
        except:
            return False
    
    def click_projects_link(self):
        """Click Projects link di navbar - UPDATED METHOD"""
        if self.open_hamburger_menu():
            try:
                # Wait untuk projects button muncul
                projects_btn = self.helpers.wait_for_clickable(self.driver, *self.PROJECTS_LINK, timeout=5)
                
                # Scroll ke element dulu
                self.helpers.scroll_to_element(self.driver, projects_btn)
                time.sleep(0.5)
                
                # Click dengan JavaScript untuk bypass overlay issues
                self.driver.execute_script("arguments[0].click();", projects_btn)
                time.sleep(2)
                
                # Check apakah navigation berhasil
                current_url = self.driver.current_url
                if "/project-pages" in current_url or "/project" in current_url:
                    return True
                
                # Jika belum navigate, coba manual navigate
                # Karena dari code, Projects button hanya close menu, 
                # user harus click project card untuk navigate
                return False
            except Exception as e:
                print(f"Error clicking projects link: {e}")
                return False
        return False
    
    def navigate_to_projects_page(self):
        """Navigate langsung ke projects page sebagai alternatif"""
        try:
            self.driver.get(f"{self.driver.base_url}/project-pages")
            time.sleep(2)
            return "/project-pages" in self.driver.current_url
        except:
            return False
    
    def click_tentang_kami(self):
        """Click Tentang Kami untuk scroll ke section3"""
        if self.open_hamburger_menu():
            try:
                tentang_btn = self.helpers.wait_for_clickable(self.driver, *self.TENTANG_KAMI_LINK)
                tentang_btn.click()
                time.sleep(1.5)
                return True
            except:
                return False
        return False
    
    def click_tim_kami(self):
        """Click Tim Kami untuk navigate ke team activity"""
        if self.open_hamburger_menu():
            try:
                tim_btn = self.helpers.wait_for_clickable(self.driver, *self.TIM_KAMI_LINK)
                tim_btn.click()
                time.sleep(2)
                return True
            except:
                return False
        return False
    
    def click_kontak_kami(self):
        """Click Kontak Kami untuk scroll ke section7"""
        if self.open_hamburger_menu():
            try:
                kontak_btn = self.helpers.wait_for_clickable(self.driver, *self.KONTAK_KAMI_LINK)
                kontak_btn.click()
                time.sleep(1.5)
                return True
            except:
                return False
        return False
    
    def get_project_cards_in_menu(self):
        """Get project cards yang ditampilkan di menu (2 random projects)"""
        if self.open_hamburger_menu():
            time.sleep(1.5)  # Tambah delay untuk data load dari backend
            try:
                cards = self.driver.find_elements(*self.PROJECT_CARD_LINKS)
                return cards
            except:
                return []
        return []
    
    def click_first_project_card(self):
        """Click project card pertama di menu - UPDATED METHOD"""
        if self.open_hamburger_menu():
            time.sleep(2)  # Wait untuk backend data load
            try:
                # Cari semua link project
                project_links = self.driver.find_elements(*self.PROJECT_CARD_LINKS)
                
                if len(project_links) > 0:
                    first_link = project_links[0]
                    
                    # Scroll ke element
                    self.helpers.scroll_to_element(self.driver, first_link)
                    time.sleep(0.5)
                    
                    # Click dengan JavaScript
                    self.driver.execute_script("arguments[0].click();", first_link)
                    time.sleep(2)
                    
                    # Verify navigation berhasil
                    if "/project/" in self.driver.current_url:
                        return True
                    
                return False
            except Exception as e:
                print(f"Error clicking project card: {e}")
                return False
        return False
    
    def scroll_through_sections(self, sections=5):
        """Scroll through parallax sections"""
        self.helpers.scroll_parallax_sections(self.driver, sections)
