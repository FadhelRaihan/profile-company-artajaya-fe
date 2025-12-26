from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from pages.base_page import BasePage
import time

class ContactFormPage(BasePage):
    """Page object untuk Contact Form - Direct form (no modal)"""
    
    # ============================================
    # LOCATORS - FIXED
    # ============================================
    
    # Section heading - DIPERBAIKI: gunakan span, bukan h2
    SECTION_HEADING = (By.XPATH, "//span[contains(text(), 'Hubungi Kami Untuk')]")
    SECTION_SUBHEADING = (By.XPATH, "//span[contains(@class, 'text-red-600') and contains(text(), 'Kerjasama')]")
    
    # Alternative locator untuk section
    SECTION_CONTAINER = (By.XPATH, "//div[contains(@class, 'flex flex-col w-full')]//span[contains(text(), '/ Kontak Kami')]")
    
    # Contact info - DIPERBAIKI: sesuai dengan struktur HTML aktual
    EMAIL_INFO = (By.XPATH, "//p[contains(text(), 'example@gmail.com')]")
    PHONE_INFO = (By.XPATH, "//p[contains(text(), '+62')]")
    ADDRESS_INFO = (By.XPATH, "//p[contains(text(), 'Jl. Bandung')]")
    
    # Form fields (using name attribute from React component)
    NAMA_INPUT = (By.NAME, "nama")
    EMAIL_INPUT = (By.NAME, "email")
    PESAN_INPUT = (By.NAME, "pesan")  # DIPERBAIKI: ini input, bukan textarea
    
    # Submit button
    SUBMIT_BTN = (By.XPATH, "//button[text()='Kirim']")
    
    # Status messages - DIPERBAIKI: sesuai struktur HTML dari TSX
    STATUS_MESSAGE = (By.XPATH, "//div[contains(@class, 'p-4') and contains(@class, 'rounded-md') and (contains(@class, 'bg-green-50') or contains(@class, 'bg-red-50'))]")
    SUCCESS_MESSAGE = (By.XPATH, "//div[contains(@class, 'bg-green-50') and contains(text(), 'berhasil')]")
    ERROR_MESSAGE = (By.XPATH, "//div[contains(@class, 'bg-red-50') and (contains(text(), 'Gagal') or contains(text(), 'lengkapi'))]")
    
    # Google Maps iframe
    GOOGLE_MAPS_IFRAME = (By.XPATH, "//iframe[contains(@src, 'google.com/maps')]")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/"
    
    def open_landing_page(self):
        """Buka landing page"""
        self.open(self.url)
        # Wait untuk page load dengan timeout lebih lama
        WebDriverWait(self.driver, 30).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
        # Extra wait untuk React hydration
        time.sleep(3)
        print("✅ Landing page loaded")
        return self
    
    def scroll_to_contact_section(self):
        """
        Scroll ke contact section dengan multiple strategies
        """
        try:
            print("\n🔍 Scrolling to contact section...")
            
            # Strategy 1: Cari span dengan teks "/ Kontak Kami"
            try:
                section_marker = self.driver.find_element(
                    By.XPATH, "//span[contains(text(), '/ Kontak Kami')]"
                )
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'start'});",
                    section_marker
                )
                time.sleep(2)
                print("✅ Scrolled to contact section by marker")
                return True
            except:
                pass
            
            # Strategy 2: Cari heading "Hubungi Kami Untuk"
            try:
                heading = self.driver.find_element(*self.SECTION_HEADING)
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
                    heading
                )
                time.sleep(2)
                print("✅ Scrolled to contact section by heading")
                return True
            except:
                pass
            
            # Strategy 3: Cari form submit button
            try:
                submit_btn = self.driver.find_element(*self.SUBMIT_BTN)
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
                    submit_btn
                )
                time.sleep(2)
                print("✅ Scrolled to contact section by submit button")
                return True
            except:
                pass
            
            # Strategy 4: Scroll bertahap ke bawah
            print("⚠️  Using gradual scroll...")
            page_height = self.driver.execute_script("return document.body.scrollHeight")
            current_position = 0
            scroll_step = 800
            
            while current_position < page_height:
                self.driver.execute_script(f"window.scrollTo(0, {current_position});")
                time.sleep(1)
                current_position += scroll_step
                
                # Check if contact section visible
                try:
                    heading = self.driver.find_element(*self.SECTION_HEADING)
                    if heading.is_displayed():
                        print("✅ Contact section found during gradual scroll")
                        return True
                except:
                    continue
            
            print("✅ Scrolled to bottom")
            return True
            
        except Exception as e:
            print(f"❌ Scroll error: {e}")
            return False
    
    def is_contact_section_visible(self):
        """Check apakah contact section terlihat dengan multiple checks"""
        try:
            # Check 1: Heading visible
            try:
                heading = self.driver.find_element(*self.SECTION_HEADING)
                if heading.is_displayed():
                    print("✅ Heading visible")
                    return True
            except:
                pass
            
            # Check 2: Section marker visible
            try:
                marker = self.driver.find_element(
                    By.XPATH, "//span[contains(text(), '/ Kontak Kami')]"
                )
                if marker.is_displayed():
                    print("✅ Section marker visible")
                    return True
            except:
                pass
            
            # Check 3: Form visible
            try:
                submit_btn = self.driver.find_element(*self.SUBMIT_BTN)
                if submit_btn.is_displayed():
                    print("✅ Form visible")
                    return True
            except:
                pass
            
            print("❌ Contact section not visible")
            return False
            
        except Exception as e:
            print(f"❌ Error checking visibility: {e}")
            return False
    
    def get_contact_info(self):
        """Get displayed contact information"""
        try:
            info = {}
            
            try:
                email_elem = self.driver.find_element(*self.EMAIL_INFO)
                info['email'] = email_elem.text
            except:
                info['email'] = None
            
            try:
                phone_elem = self.driver.find_element(*self.PHONE_INFO)
                info['phone'] = phone_elem.text
            except:
                info['phone'] = None
            
            try:
                address_elem = self.driver.find_element(*self.ADDRESS_INFO)
                info['address'] = address_elem.text
            except:
                info['address'] = None
            
            print(f"📞 Contact info: {info}")
            return info
            
        except Exception as e:
            print(f"❌ Error getting contact info: {e}")
            return {}
    
    def fill_nama(self, nama):
        """Isi field nama"""
        try:
            wait = WebDriverWait(self.driver, 10)
            input_field = wait.until(
                EC.visibility_of_element_located(self.NAMA_INPUT)
            )
            input_field = wait.until(
                EC.element_to_be_clickable(self.NAMA_INPUT)
            )
            
            input_field.clear()
            time.sleep(0.3)
            input_field.send_keys(nama)
            time.sleep(0.5)
            
            entered_value = input_field.get_attribute('value')
            if entered_value == nama:
                print(f"✅ Nama filled: {nama}")
                return True
            else:
                print(f"⚠️ Nama mismatch: expected '{nama}', got '{entered_value}'")
                return False
                
        except Exception as e:
            print(f"❌ Error fill nama: {e}")
            return False
    
    def fill_email(self, email):
        """Isi field email"""
        try:
            wait = WebDriverWait(self.driver, 10)
            input_field = wait.until(
                EC.element_to_be_clickable(self.EMAIL_INPUT)
            )
            
            input_field.clear()
            time.sleep(0.3)
            input_field.send_keys(email)
            time.sleep(0.5)
            
            print(f"✅ Email filled: {email}")
            return True
            
        except Exception as e:
            print(f"❌ Error fill email: {e}")
            return False
    
    def fill_pesan(self, pesan):
        """Isi field pesan (INPUT, bukan textarea)"""
        try:
            wait = WebDriverWait(self.driver, 10)
            input_field = wait.until(
                EC.element_to_be_clickable(self.PESAN_INPUT)
            )
            
            input_field.clear()
            time.sleep(0.3)
            input_field.send_keys(pesan)
            time.sleep(0.5)
            
            entered_value = input_field.get_attribute('value')
            print(f"✅ Pesan filled: {len(entered_value)} chars")
            return True
            
        except Exception as e:
            print(f"❌ Error fill pesan: {e}")
            return False
    
    def fill_contact_form(self, nama, email, pesan):
        """Fill semua field contact form"""
        success = True
        success = success and self.fill_nama(nama)
        success = success and self.fill_email(email)
        success = success and self.fill_pesan(pesan)
        return success
    
    def click_submit(self):
        """Click submit button"""
        try:
            wait = WebDriverWait(self.driver, 10)
            submit_btn = wait.until(
                EC.element_to_be_clickable(self.SUBMIT_BTN)
            )
            
            # Scroll to button
            self.driver.execute_script(
                "arguments[0].scrollIntoView({block: 'nearest'});",
                submit_btn
            )
            time.sleep(0.5)
            
            # Click dengan JavaScript
            self.driver.execute_script("arguments[0].click();", submit_btn)
            
            print("✅ Submit button clicked")
            # Wait longer untuk EmailJS API response
            time.sleep(4)
            return True
            
        except Exception as e:
            print(f"❌ Error click submit: {e}")
            return False
    
    def wait_for_status_message(self, timeout=10):
        """Wait untuk status message muncul (success atau error)"""
        try:
            wait = WebDriverWait(self.driver, timeout)
            message = wait.until(
                EC.visibility_of_element_located(self.STATUS_MESSAGE)
            )
            return message.is_displayed()
        except TimeoutException:
            print("⚠️ No status message detected")
            return False
        except Exception as e:
            print(f"❌ Error waiting for status: {e}")
            return False
    
    def get_status_message(self):
        """Get status message text"""
        try:
            message = self.driver.find_element(*self.STATUS_MESSAGE)
            text = message.text
            print(f"📬 Status message: {text}")
            return text
        except:
            return ""
    
    def is_success_message_visible(self):
        """Check apakah success message muncul"""
        try:
            message = self.driver.find_element(*self.SUCCESS_MESSAGE)
            return message.is_displayed()
        except:
            return False
    
    def is_error_message_visible(self):
        """Check apakah error message muncul"""
        try:
            message = self.driver.find_element(*self.ERROR_MESSAGE)
            return message.is_displayed()
        except:
            return False
    
    def is_google_maps_visible(self):
        """Check apakah Google Maps iframe terlihat"""
        try:
            iframe = self.driver.find_element(*self.GOOGLE_MAPS_IFRAME)
            return iframe.is_displayed()
        except:
            return False