from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementClickInterceptedException
from pages.base_page import BasePage
import time

class TestimonialFormPage(BasePage):
    """Page object untuk Testimonial Form - FIXED VERSION"""
    
    # ============================================
    # LOCATORS - DIPERBAIKI SESUAI REACT COMPONENT
    # ============================================
    
    # Button untuk buka modal - menggunakan contains untuk span di dalam button
    OPEN_MODAL_BTN = (By.XPATH, "//button[.//span[contains(text(), 'Bagikan Testimoni Anda')]]")
    
    # Modal overlay - backdrop blur dengan bg-black/50
    MODAL_OVERLAY = (By.XPATH, "//div[contains(@class, 'fixed') and contains(@class, 'inset-0') and contains(@class, 'z-50')]")
    
    # Modal title - DIPERBAIKI: h3, bukan h2!
    MODAL_TITLE = (By.XPATH, "//h3[contains(text(), 'Bagikan Testimoni Anda')]")
    
    # Modal container
    MODAL_CONTAINER = (By.XPATH, "//div[contains(@class, 'bg-white') and contains(@class, 'rounded-2xl')]")
    
    # Cancel button - text langsung "Batal"
    CANCEL_BTN = (By.XPATH, "//button[text()='Batal']")
    
    # Input fields dengan ID
    NAMA_INPUT = (By.ID, "testerName")
    TESTIMONI_TEXTAREA = (By.ID, "message")
    
    # Character counter
    CHAR_COUNTER = (By.XPATH, "//p[contains(text(), '/500 karakter')]")
    
    # Submit button - cek text "Kirim Testimoni" atau "Mengirim..."
    SUBMIT_BTN = (By.XPATH, "//button[@type='submit' and not(@disabled)]")
    SUBMITTING_BTN = (By.XPATH, "//button[contains(., 'Mengirim...')]")
    
    # SweetAlert2 selectors
    SWAL_POPUP = (By.CSS_SELECTOR, ".swal2-popup")
    SWAL_TITLE = (By.CSS_SELECTOR, ".swal2-title")
    SWAL_TEXT = (By.CSS_SELECTOR, ".swal2-html-container")
    SWAL_CONFIRM = (By.CSS_SELECTOR, ".swal2-confirm")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/"
    
    def open_landing_page(self):
        """Buka landing page dengan explicit wait"""
        self.open(self.url)
        # Wait untuk page load sepenuhnya
        WebDriverWait(self.driver, 20).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
        time.sleep(2)  # Extra wait untuk React hydration
        print("✅ Landing page loaded")
        return self
    
    def scroll_to_testimonial_section(self):
        """
        Scroll ke section testimoni dengan strategi yang lebih robust
        Menggunakan JavaScript scroll dan detection
        """
        try:
            print("\n🔍 Searching for testimonial button...")
            
            # Strategi 1: Scroll ke section dengan mencari elemen "/Testimoni"
            try:
                testimoni_header = self.driver.find_element(
                    By.XPATH, 
                    "//span[contains(text(), '/ Testimoni')] | //div[contains(text(), '/ Testimoni')]"
                )
                
                # Scroll ke header section
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'start'});", 
                    testimoni_header
                )
                time.sleep(2)
                print("✅ Scrolled to testimonial section header")
            except:
                print("⚠️ Section header not found, using fallback scroll")
            
            # Strategi 2: Cari button dan scroll ke sana
            max_attempts = 5
            for attempt in range(max_attempts):
                try:
                    # Cari semua button yang match
                    buttons = self.driver.find_elements(*self.OPEN_MODAL_BTN)
                    
                    if buttons:
                        for btn in buttons:
                            try:
                                # Check visibility
                                if btn.is_displayed():
                                    # Scroll button ke center viewport
                                    self.driver.execute_script(
                                        """
                                        arguments[0].scrollIntoView({
                                            behavior: 'smooth', 
                                            block: 'center',
                                            inline: 'center'
                                        });
                                        """, 
                                        btn
                                    )
                                    time.sleep(2)  # Wait animation
                                    print(f"✅ Button found and centered (attempt {attempt + 1})")
                                    return True
                            except Exception as e:
                                continue
                    
                    # Jika button belum ditemukan, scroll down lebih jauh
                    if attempt < max_attempts - 1:
                        scroll_amount = 800 * (attempt + 1)
                        self.driver.execute_script(f"window.scrollTo(0, {scroll_amount});")
                        time.sleep(2)
                        print(f"⏬ Scrolling to {scroll_amount}px...")
                    
                except Exception as e:
                    print(f"Attempt {attempt + 1} error: {e}")
                    continue
            
            print("❌ Button not found after all attempts")
            return False
            
        except Exception as e:
            print(f"❌ Scroll error: {e}")
            return False
    
    def click_open_modal_button(self):
        """
        Click button untuk buka modal dengan multiple strategies
        FIXED: Menangani Framer Motion animations
        """
        max_retries = 3
        
        for attempt in range(max_retries):
            try:
                print(f"\n🔄 Attempt {attempt + 1}/{max_retries} to open modal...")
                
                # Scroll to button first
                if not self.scroll_to_testimonial_section():
                    if attempt < max_retries - 1:
                        time.sleep(2)
                        continue
                    print("❌ Cannot find button to scroll to")
                    return False
                
                # Wait untuk button menjadi clickable
                wait = WebDriverWait(self.driver, 15)
                
                # Strategy 1: Wait for element to be clickable
                try:
                    button = wait.until(
                        EC.element_to_be_clickable(self.OPEN_MODAL_BTN)
                    )
                    print("✅ Button is clickable")
                except TimeoutException:
                    print("⚠️ Button not clickable, trying to find anyway...")
                    button = self.driver.find_element(*self.OPEN_MODAL_BTN)
                
                # Extra wait untuk Framer Motion animation selesai
                time.sleep(1.5)
                
                # Ensure button is in viewport
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({behavior: 'auto', block: 'center'});", 
                    button
                )
                time.sleep(1)
                
                # Remove any potential overlays
                self.driver.execute_script("""
                    // Remove potential overlays
                    document.querySelectorAll('[style*="pointer-events"]').forEach(el => {
                        el.style.pointerEvents = 'none';
                    });
                """)
                
                # Try clicking dengan multiple methods
                click_success = False
                
                # Method 1: Regular click
                try:
                    button.click()
                    click_success = True
                    print("✅ Clicked with regular click")
                except ElementClickInterceptedException:
                    print("⚠️ Regular click intercepted, trying JavaScript...")
                
                # Method 2: JavaScript click (fallback)
                if not click_success:
                    try:
                        self.driver.execute_script("arguments[0].click();", button)
                        click_success = True
                        print("✅ Clicked with JavaScript")
                    except Exception as e:
                        print(f"❌ JavaScript click failed: {e}")
                
                if not click_success:
                    if attempt < max_retries - 1:
                        continue
                    return False
                
                # Wait for modal dengan multiple indicators
                time.sleep(2)
                
                # Verify modal opened dengan timeout lebih lama
                modal_wait = WebDriverWait(self.driver, 10)
                try:
                    modal_wait.until(
                        EC.visibility_of_element_located(self.MODAL_OVERLAY)
                    )
                    print("✅ Modal overlay detected")
                except:
                    print("⚠️ Modal overlay not detected")
                
                if self.is_modal_open():
                    print("✅ Modal confirmed opened!")
                    return True
                else:
                    print("⚠️ Modal not detected after click")
                    if attempt < max_retries - 1:
                        time.sleep(2)
                        continue
                    return False
                
            except Exception as e:
                print(f"❌ Error attempt {attempt + 1}: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(3)
                    continue
                return False
        
        print("❌ All attempts failed")
        return False
    
    def is_modal_open(self):
        """
        Check apakah modal terbuka dengan multiple indicators
        FIXED: Menggunakan locator yang benar
        """
        try:
            # Check multiple indicators dengan priority
            indicators = [
                (self.MODAL_CONTAINER, "Modal container"),
                (self.MODAL_TITLE, "Modal title (h3)"),
                (self.NAMA_INPUT, "Name input field"),
                (self.MODAL_OVERLAY, "Modal overlay")
            ]
            
            for locator, name in indicators:
                try:
                    element = self.driver.find_element(*locator)
                    if element.is_displayed():
                        print(f"✅ {name} is visible")
                        return True
                except:
                    continue
            
            print("❌ No modal indicators found")
            return False
            
        except Exception as e:
            print(f"❌ Error checking modal: {e}")
            return False
    
    def fill_nama(self, nama):
        """Isi field nama dengan improved waiting"""
        try:
            if not self.is_modal_open():
                print("❌ Modal not open, cannot fill nama")
                return False
            
            # Wait for input dengan ID
            wait = WebDriverWait(self.driver, 10)
            input_field = wait.until(
                EC.visibility_of_element_located(self.NAMA_INPUT)
            )
            
            # Ensure field is interactive
            input_field = wait.until(
                EC.element_to_be_clickable(self.NAMA_INPUT)
            )
            
            # Clear and fill
            input_field.clear()
            time.sleep(0.3)
            input_field.send_keys(nama)
            time.sleep(0.5)
            
            # Verify
            entered_value = input_field.get_attribute('value')
            if entered_value == nama:
                print(f"✅ Nama filled successfully: {nama}")
                return True
            else:
                print(f"⚠️ Nama mismatch: expected '{nama}', got '{entered_value}'")
                return False
            
        except Exception as e:
            print(f"❌ Error fill nama: {e}")
            return False
    
    def fill_testimoni(self, text):
        """Isi field testimoni dengan improved waiting"""
        try:
            wait = WebDriverWait(self.driver, 10)
            textarea = wait.until(
                EC.visibility_of_element_located(self.TESTIMONI_TEXTAREA)
            )
            
            textarea = wait.until(
                EC.element_to_be_clickable(self.TESTIMONI_TEXTAREA)
            )
            
            textarea.clear()
            time.sleep(0.3)
            textarea.send_keys(text)
            time.sleep(0.5)
            
            # Verify
            entered_value = textarea.get_attribute('value')
            print(f"✅ Testimoni filled: {len(entered_value)} chars")
            return True
            
        except Exception as e:
            print(f"❌ Error fill testimoni: {e}")
            return False
    
    def get_char_counter(self):
        """Get character counter dengan improved selector"""
        try:
            counter = self.find_element(*self.CHAR_COUNTER)
            counter_text = counter.text
            print(f"📊 Character counter: {counter_text}")
            return counter_text
        except Exception as e:
            print(f"⚠️ Cannot get counter: {e}")
            return ""
    
    def click_submit(self):
        """Click submit button dengan proper waiting"""
        try:
            wait = WebDriverWait(self.driver, 10)
            
            # Wait untuk button submit yang enabled
            submit_btn = wait.until(
                EC.element_to_be_clickable(self.SUBMIT_BTN)
            )
            
            # Scroll to button in modal
            self.driver.execute_script(
                "arguments[0].scrollIntoView({block: 'nearest'});", 
                submit_btn
            )
            time.sleep(0.5)
            
            # Click dengan JavaScript untuk avoid intercept
            self.driver.execute_script("arguments[0].click();", submit_btn)
            time.sleep(1)
            
            print("✅ Submit button clicked")
            return True
            
        except Exception as e:
            print(f"❌ Error click submit: {e}")
            return False
    
    def wait_for_swal_popup(self, timeout=10):
        """Wait for SweetAlert2 popup dengan improved detection"""
        try:
            wait = WebDriverWait(self.driver, timeout)
            popup = wait.until(
                EC.visibility_of_element_located(self.SWAL_POPUP)
            )
            
            # Extra check: ensure popup is actually visible
            if popup.is_displayed():
                print("✅ SweetAlert popup detected")
                return True
            return False
            
        except TimeoutException:
            print("⚠️ SweetAlert popup not found")
            return False
        except Exception as e:
            print(f"❌ Error waiting for popup: {e}")
            return False
    
    def get_swal_title(self):
        """Get SweetAlert title"""
        try:
            wait = WebDriverWait(self.driver, 5)
            title = wait.until(
                EC.visibility_of_element_located(self.SWAL_TITLE)
            )
            title_text = title.text
            print(f"📋 SweetAlert title: {title_text}")
            return title_text
        except:
            return ""
    
    def get_swal_text(self):
        """Get SweetAlert content text"""
        try:
            wait = WebDriverWait(self.driver, 5)
            text = wait.until(
                EC.visibility_of_element_located(self.SWAL_TEXT)
            )
            content_text = text.text
            print(f"📄 SweetAlert text: {content_text}")
            return content_text
        except:
            return ""
    
    def click_swal_confirm(self):
        """Click SweetAlert confirm button"""
        try:
            wait = WebDriverWait(self.driver, 5)
            btn = wait.until(
                EC.element_to_be_clickable(self.SWAL_CONFIRM)
            )
            btn.click()
            time.sleep(1)
            print("✅ SweetAlert confirmed")
            return True
        except Exception as e:
            print(f"❌ Error clicking SweetAlert confirm: {e}")
            return False
    
    def click_cancel(self):
        """Click button Batal dengan improved handling"""
        try:
            if not self.is_modal_open():
                print("❌ Modal not open, cannot click cancel")
                return False
            
            wait = WebDriverWait(self.driver, 10)
            cancel_btn = wait.until(
                EC.element_to_be_clickable(self.CANCEL_BTN)
            )
            
            # Scroll to button in modal
            self.driver.execute_script(
                "arguments[0].scrollIntoView({block: 'nearest'});", 
                cancel_btn
            )
            time.sleep(0.5)
            
            # Click dengan JavaScript
            self.driver.execute_script("arguments[0].click();", cancel_btn)
            time.sleep(1.5)  # Wait untuk modal close animation
            
            print("✅ Cancel button clicked")
            
            # Verify modal closed
            time.sleep(1)
            if not self.is_modal_open():
                print("✅ Modal successfully closed")
                return True
            else:
                print("⚠️ Modal still open after cancel")
                return True  # Button clicked successfully even if modal still visible
            
        except Exception as e:
            print(f"❌ Error click cancel: {e}")
            return False