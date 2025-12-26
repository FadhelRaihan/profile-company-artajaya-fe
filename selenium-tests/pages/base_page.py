from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from utils.wait_helpers import WaitHelpers

class BasePage:
    """Base class untuk semua page objects"""
    
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.helpers = WaitHelpers()
    
    def open(self, url):
        """Buka URL"""
        self.driver.get(url)
    
    def get_title(self):
        """Get page title"""
        return self.driver.title
    
    def find_element(self, by, value):
        """Find element dengan wait"""
        return self.helpers.wait_for_element(self.driver, by, value)
    
    def click_element(self, by, value):
        """Click element dengan wait clickable"""
        element = self.helpers.wait_for_clickable(self.driver, by, value)
        element.click()
