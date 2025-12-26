from selenium.webdriver.common.by import By
from pages.base_page import BasePage
import time

class ProjectPage(BasePage):
    """Page object untuk Project Pages"""
    
    # Locators
    PROJECT_CARDS = (By.CSS_SELECTOR, "[class*='card']")
    PROJECT_LINKS = (By.CSS_SELECTOR, "a[href*='/project/']")
    HERO_SECTION = (By.CSS_SELECTOR, "[class*='hero']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/project-pages"
    
    def open_project_page(self):
        """Buka project pages"""
        self.open(self.url)
        time.sleep(2)  # Wait untuk lazy loading
        return self
    
    def scroll_project_sections(self):
        """Scroll parallax sections di project page"""
        self.helpers.scroll_parallax_sections(self.driver, 3)
    
    def get_project_cards(self):
        """Get semua project cards setelah scroll"""
        self.helpers.scroll_and_wait(self.driver, 500, 1)
        return self.driver.find_elements(*self.PROJECT_CARDS)
    
    def click_first_project(self):
        """Click project pertama untuk lihat detail"""
        self.helpers.scroll_and_wait(self.driver, 500, 1)
        project_links = self.driver.find_elements(*self.PROJECT_LINKS)
        if project_links:
            project_links[0].click()
            time.sleep(2)
            return True
        return False
    
    def get_current_url(self):
        """Get current URL untuk verify navigation"""
        return self.driver.current_url
