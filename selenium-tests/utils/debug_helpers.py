"""
Debug helpers untuk troubleshooting Selenium tests
Gunakan ini jika test masih gagal untuk investigasi
"""

from selenium.webdriver.common.by import By
import time


class DebugHelpers:
    """Helper functions untuk debugging Selenium tests"""
    
    @staticmethod
    def print_page_title(driver):
        """Print current page title"""
        print(f"📄 Page Title: {driver.title}")
    
    @staticmethod
    def print_current_url(driver):
        """Print current URL"""
        print(f"🔗 Current URL: {driver.current_url}")
    
    @staticmethod
    def print_all_buttons(driver):
        """Print all buttons on page"""
        buttons = driver.find_elements(By.TAG_NAME, "button")
        print(f"\n🔘 Found {len(buttons)} buttons:")
        for i, btn in enumerate(buttons[:10], 1):  # Limit to 10
            try:
                text = btn.text or btn.get_attribute('aria-label') or 'No text'
                visible = btn.is_displayed()
                print(f"   {i}. '{text}' - Visible: {visible}")
            except:
                print(f"   {i}. [Error reading button]")
    
    @staticmethod
    def print_elements_by_xpath(driver, xpath, label="Elements"):
        """Print elements found by XPath"""
        elements = driver.find_elements(By.XPATH, xpath)
        print(f"\n🔍 {label}: Found {len(elements)} elements")
        for i, elem in enumerate(elements[:5], 1):
            try:
                text = elem.text[:50] if elem.text else 'No text'
                visible = elem.is_displayed()
                print(f"   {i}. '{text}' - Visible: {visible}")
            except:
                print(f"   {i}. [Error reading element]")
    
    @staticmethod
    def highlight_element(driver, element, duration=2):
        """Highlight element dengan red border untuk visual debug"""
        original_style = element.get_attribute('style')
        driver.execute_script(
            "arguments[0].setAttribute('style', arguments[1]);",
            element,
            "border: 3px solid red; background-color: yellow;"
        )
        time.sleep(duration)
        driver.execute_script(
            "arguments[0].setAttribute('style', arguments[1]);",
            element,
            original_style
        )
    
    @staticmethod
    def take_screenshot(driver, filename="debug_screenshot.png"):
        """Take screenshot untuk debugging"""
        try:
            driver.save_screenshot(filename)
            print(f"📸 Screenshot saved: {filename}")
            return True
        except Exception as e:
            print(f"❌ Screenshot failed: {e}")
            return False
    
    @staticmethod
    def print_viewport_size(driver):
        """Print current viewport size"""
        size = driver.get_window_size()
        print(f"📐 Viewport: {size['width']}x{size['height']}")
    
    @staticmethod
    def print_scroll_position(driver):
        """Print current scroll position"""
        scroll_y = driver.execute_script("return window.pageYOffset;")
        scroll_height = driver.execute_script("return document.body.scrollHeight;")
        print(f"📜 Scroll: {scroll_y}px / {scroll_height}px")
    
    @staticmethod
    def wait_for_page_load(driver, timeout=30):
        """Wait sampai page fully loaded"""
        from selenium.webdriver.support.ui import WebDriverWait
        
        wait = WebDriverWait(driver, timeout)
        wait.until(lambda d: d.execute_script("return document.readyState") == "complete")
        print("✅ Page fully loaded")
    
    @staticmethod
    def print_console_logs(driver):
        """Print browser console logs (Chrome only)"""
        try:
            logs = driver.get_log('browser')
            if logs:
                print(f"\n📋 Console Logs ({len(logs)} entries):")
                for log in logs[-10:]:  # Last 10 logs
                    print(f"   [{log['level']}] {log['message'][:100]}")
            else:
                print("✅ No console errors")
        except Exception as e:
            print(f"⚠️ Cannot get console logs: {e}")
    
    @staticmethod
    def check_react_loaded(driver):
        """Check if React app is loaded"""
        try:
            react_root = driver.execute_script("""
                return document.querySelector('#root') || 
                       document.querySelector('#__next') || 
                       document.querySelector('[data-reactroot]');
            """)
            
            if react_root:
                print("✅ React app detected")
                return True
            else:
                print("⚠️ React app not detected")
                return False
        except:
            return False
    
    @staticmethod
    def debug_modal_state(driver):
        """Debug modal state dengan berbagai checks"""
        print("\n🔍 DEBUG: Modal State")
        
        checks = [
            ("//div[contains(@class, 'fixed') and contains(@class, 'z-50')]", "Modal overlay (fixed z-50)"),
            ("//h3[contains(text(), 'Bagikan Testimoni')]", "Modal title (h3)"),
            ("//input[@id='testerName']", "Name input (ID)"),
            ("//textarea[@id='message']", "Testimoni textarea (ID)"),
            ("//button[text()='Batal']", "Cancel button"),
            ("//button[@type='submit']", "Submit button"),
        ]
        
        for xpath, label in checks:
            elements = driver.find_elements(By.XPATH, xpath)
            if elements:
                visible = any(e.is_displayed() for e in elements)
                print(f"   ✅ {label}: Found ({len(elements)} elements, visible={visible})")
            else:
                print(f"   ❌ {label}: Not found")
    
    @staticmethod
    def debug_button_state(driver, button_xpath):
        """Debug specific button state"""
        print(f"\n🔍 DEBUG: Button State")
        print(f"   XPath: {button_xpath}")
        
        elements = driver.find_elements(By.XPATH, button_xpath)
        
        if not elements:
            print("   ❌ Button not found")
            return
        
        for i, btn in enumerate(elements, 1):
            print(f"\n   Button #{i}:")
            try:
                print(f"      Text: {btn.text}")
                print(f"      Visible: {btn.is_displayed()}")
                print(f"      Enabled: {btn.is_enabled()}")
                
                location = btn.location
                size = btn.size
                print(f"      Position: x={location['x']}, y={location['y']}")
                print(f"      Size: {size['width']}x{size['height']}")
                
                # Check if in viewport
                in_viewport = driver.execute_script("""
                    var elem = arguments[0];
                    var rect = elem.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= window.innerHeight &&
                        rect.right <= window.innerWidth
                    );
                """, btn)
                print(f"      In Viewport: {in_viewport}")
                
            except Exception as e:
                print(f"      Error: {e}")


# ============================================
# USAGE EXAMPLE
# ============================================

def example_usage_in_test(driver):
    """
    Example cara pakai debug helpers di test
    """
    from debug_helpers import DebugHelpers
    
    # Basic info
    DebugHelpers.print_page_title(driver)
    DebugHelpers.print_current_url(driver)
    DebugHelpers.print_viewport_size(driver)
    
    # Check page loading
    DebugHelpers.wait_for_page_load(driver)
    DebugHelpers.check_react_loaded(driver)
    
    # Debug specific elements
    DebugHelpers.print_all_buttons(driver)
    DebugHelpers.print_elements_by_xpath(
        driver,
        "//button[.//span[contains(text(), 'Bagikan')]]",
        "Testimonial Buttons"
    )
    
    # Debug modal
    DebugHelpers.debug_modal_state(driver)
    
    # Take screenshot
    DebugHelpers.take_screenshot(driver, "debug_modal.png")
    
    # Check console for errors
    DebugHelpers.print_console_logs(driver)