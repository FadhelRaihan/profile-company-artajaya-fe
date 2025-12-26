from selenium.webdriver.common.by import By
from pages.base_page import BasePage
import time

class TeamActivityPage(BasePage):
    """Page object untuk Team Activity Section"""
    
    # Locators - UPDATE SELECTOR INI
    TEAM_RING = (By.CSS_SELECTOR, "canvas, [class*='ring'], [class*='team']")
    ACTIVITY_CARDS = (By.CSS_SELECTOR, "div[class*='card'], div[class*='activity'], div.grid > div")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/team-activity-section"
    
    def open_team_activity_page(self):
        """Buka team activity page"""
        self.open(self.url)
        time.sleep(2)
        return self
    
    def is_team_ring_visible(self):
        """Check 3D ring visible"""
        try:
            time.sleep(1)
            ring = self.find_element(*self.TEAM_RING)
            return ring.is_displayed()
        except:
            return False
    
    def scroll_to_activity_cards(self):
        """Scroll untuk melihat activity cards"""
        # Scroll lebih jauh untuk memastikan cards terlihat
        self.helpers.scroll_and_wait(self.driver, 1000, 2)  # ← TAMBAH SCROLL DISTANCE
    
    def get_activity_cards(self):
        """Get semua activity cards"""
        self.scroll_to_activity_cards()
        time.sleep(1)  # ← TAMBAH DELAY
        return self.driver.find_elements(*self.ACTIVITY_CARDS)
