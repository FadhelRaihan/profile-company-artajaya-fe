from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from config import TestConfig  # ← IMPORT CONFIG
import time

class WaitHelpers:
    """Helper functions untuk waiting lazy loading elements"""
    
    @staticmethod
    def wait_for_element(driver, by, value, timeout=10):
        """Wait sampai element muncul"""
        if timeout is None:
            timeout = TestConfig.TIMEOUT
        return WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
    
    @staticmethod
    def wait_for_clickable(driver, by, value, timeout=10):
        """Wait sampai element bisa diklik"""
        return WebDriverWait(driver, timeout).until(
            EC.element_to_be_clickable((by, value))
        )
    
    @staticmethod
    def scroll_and_wait(driver, pixels=None, pause=None):
        """Scroll ke bawah dan tunggu lazy loading selesai"""
        if pixels is None:
            pixels = TestConfig.SCROLL_DISTANCE
        if pause is None:
            pause = TestConfig.SCROLL_PAUSE
            
        driver.execute_script(f"window.scrollBy(0, {pixels});")
        time.sleep(pause)
    
    @staticmethod
    def scroll_to_element(driver, element):
        """Scroll ke element tertentu"""
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
        time.sleep(0.5)
    
    @staticmethod
    def scroll_parallax_sections(driver, sections_count):  # ← UBAH PARAMETER INI
        """Scroll untuk parallax sections"""
        for i in range(sections_count):
            driver.execute_script(f"window.scrollTo(0, {i * 800});")
            time.sleep(1)  # Tunggu animasi parallax
