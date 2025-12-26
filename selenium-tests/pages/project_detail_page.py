from selenium.webdriver.common.by import By
from pages.base_page import BasePage
import time

class ProjectDetailPage(BasePage):
    """Page object untuk Project Detail Page berdasarkan subdetail-projects-section.tsx"""
    
    # Locators berdasarkan kode asli
    # Loading state
    LOADING_SPINNER = (By.XPATH, "//p[contains(text(), 'Memuat data project')]")
    
    # Not found state
    NOT_FOUND_TITLE = (By.XPATH, "//h1[contains(text(), 'Project Tidak Ditemukan')]")
    BACK_TO_LIST_BTN = (By.XPATH, "//button[contains(text(), 'Kembali ke Daftar Project')]")
    
    # Title Section
    BACK_BUTTON = (By.XPATH, "//button[@aria-label='Kembali ke Projects']")
    PROJECT_TITLE = (By.XPATH, "//h1[contains(@class, 'font-bold')]")
    
    # Carousel
    CAROUSEL_IMAGES = (By.XPATH, "//img[contains(@alt, 'Image')]")
    CAROUSEL_COUNTER = (By.XPATH, "//div[contains(text(), '/') and contains(@class, 'absolute')]")
    
    # Info Section
    INFO_HEADING = (By.XPATH, "//h2[text()='Info']")
    INFO_ROWS = (By.XPATH, "//h2[text()='Info']/following-sibling::div//div[contains(@class, 'flex')]")
    
    # About Section
    ABOUT_HEADING = (By.XPATH, "//h2[text()='About']")
    ABOUT_PARAGRAPHS = (By.XPATH, "//h2[text()='About']/following-sibling::div//p")
    
    # Navigation buttons
    PREV_PROJECT_BTN = (By.XPATH, "//button[contains(text(), 'Project Sebelumnya')]")
    NEXT_PROJECT_BTN = (By.XPATH, "//button[contains(text(), 'Project Selanjutnya')]")
    
    # CTA Section
    CTA_HEADING = (By.XPATH, "//span[contains(text(), 'Mulai Membuat')]")
    CTA_HUBUNGI_BTN = (By.XPATH, "//button[contains(text(), 'Hubungi Kami')]")
    
    # Related Projects
    RELATED_HEADING = (By.XPATH, "//h2[text()='Related Project']")
    RELATED_PROJECT_CARDS = (By.XPATH, "//h2[text()='Related Project']/following-sibling::div//div[contains(@class, 'group')]")
    
    # Scroll to top button (ArrowUp icon)
    SCROLL_TOP_BTN = (By.XPATH, "//button[@aria-label='Scroll to top']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = f"{driver.base_url}/project/"
    
    def open_project_detail(self, project_id):
        """Buka detail project berdasarkan ID"""
        self.open(f"{self.url}{project_id}")
        time.sleep(3)  # Wait untuk fetch dari backend + lazy load
        return self
    
    def is_loading(self):
        """Check apakah masih loading"""
        try:
            spinner = self.driver.find_element(*self.LOADING_SPINNER)
            return spinner.is_displayed()
        except:
            return False
    
    def is_not_found(self):
        """Check apakah project tidak ditemukan"""
        try:
            not_found = self.driver.find_element(*self.NOT_FOUND_TITLE)
            return not_found.is_displayed()
        except:
            return False
    
    def click_back_button(self):
        """Click back button untuk kembali ke project list"""
        try:
            # Scroll to top dulu karena back button di atas
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            back_btn = self.helpers.wait_for_clickable(self.driver, *self.BACK_BUTTON, timeout=5)
            back_btn.click()
            time.sleep(2)
            return True
        except Exception as e:
            print(f"Error clicking back button: {e}")
            return False
    
    def get_project_title(self):
        """Get project title"""
        try:
            # Check jika not found
            if self.is_not_found():
                return "Project Tidak Ditemukan"
            
            title = self.find_element(*self.PROJECT_TITLE)
            return title.text
        except:
            return ""
    
    def is_carousel_visible(self):
        """Check apakah carousel visible"""
        try:
            # Scroll sedikit untuk trigger lazy load carousel
            self.helpers.scroll_and_wait(self.driver, 200, 1)
            images = self.driver.find_elements(*self.CAROUSEL_IMAGES)
            return len(images) > 0
        except:
            return False
    
    def get_carousel_counter(self):
        """Get carousel counter text (e.g. '1 / 5')"""
        try:
            self.helpers.scroll_and_wait(self.driver, 200, 1)
            counter = self.find_element(*self.CAROUSEL_COUNTER)
            return counter.text
        except:
            return ""
    
    def scroll_to_info_section(self):
        """Scroll ke info section untuk trigger lazy load"""
        try:
            self.helpers.scroll_and_wait(self.driver, 600, 1.5)
            return True
        except:
            return False
    
    def get_info_items(self):
        """Get semua info items (Klien, Industri, dll)"""
        self.scroll_to_info_section()
        try:
            items = self.driver.find_elements(*self.INFO_ROWS)
            return items
        except:
            return []
    
    def scroll_to_about_section(self):
        """Scroll ke about section untuk trigger lazy load"""
        try:
            self.helpers.scroll_and_wait(self.driver, 1000, 1.5)
            return True
        except:
            return False
    
    def get_about_paragraphs(self):
        """Get paragraphs di about section"""
        self.scroll_to_about_section()
        time.sleep(1)  # Wait untuk animation
        try:
            paragraphs = self.driver.find_elements(*self.ABOUT_PARAGRAPHS)
            return paragraphs
        except:
            return []
    
    def scroll_to_navigation_buttons(self):
        """Scroll ke navigation buttons"""
        try:
            self.helpers.scroll_and_wait(self.driver, 1400, 1.5)
            return True
        except:
            return False
    
    def click_prev_project(self):
        """Click Project Sebelumnya"""
        try:
            # Scroll lebih jauh dulu
            self.driver.execute_script("window.scrollTo(0, 1600);")
            time.sleep(1.5)

            # Find element
            prev_btn = self.helpers.wait_for_clickable(self.driver, *self.PREV_PROJECT_BTN, timeout=5)

            # Scroll ke element dengan scrollIntoView AGGRESSIVE
            self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});", prev_btn)
            time.sleep(1)

            # Wait sampai benar-benar clickable
            time.sleep(0.5)

            # Click dengan JavaScript LANGSUNG
            self.driver.execute_script("arguments[0].click();", prev_btn)
            time.sleep(3)  # Wait untuk transition (400ms) + data load
            return True
        except Exception as e:
            print(f"Error clicking prev project: {e}")
            return False
    
    def click_next_project(self):
        """Click Project Selanjutnya"""
        try:
            # Scroll lebih jauh dulu
            self.driver.execute_script("window.scrollTo(0, 1600);")
            time.sleep(1.5)

            # Find element
            next_btn = self.helpers.wait_for_clickable(self.driver, *self.NEXT_PROJECT_BTN, timeout=5)
            
            # Scroll ke element dengan scrollIntoView AGGRESSIVE
            self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});", next_btn)
            time.sleep(1)

            # Wait sampai benar-benar clickable
            time.sleep(0.5)

            # Click dengan JavaScript LANGSUNG
            self.driver.execute_script("arguments[0].click();", next_btn)
            time.sleep(3)
            return True
        except Exception as e:
            print(f"Error clicking next project: {e}")
            return False
    
    def scroll_to_cta_section(self):
        """Scroll ke CTA section"""
        try:
            # Scroll lebih jauh
            self.driver.execute_script("window.scrollTo(0, 2000);")
            time.sleep(1.5)
            return True
        except:
            return False
    
    def click_hubungi_kami(self):
        """Click Hubungi Kami CTA button"""
        try:
            self.scroll_to_cta_section()
            cta_btn = self.helpers.wait_for_clickable(self.driver, *self.CTA_HUBUNGI_BTN, timeout=5)

            # Scroll ke element dengan scrollIntoView AGGRESSIVE
            self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});", cta_btn)
            time.sleep(1)

            # Wait untuk fixed navbar settle
            time.sleep(0.5)

            # Click dengan JavaScript LANGSUNG 
            self.driver.execute_script("arguments[0].click();", cta_btn)
            time.sleep(2)
            return True
        except Exception as e:
            print(f"Error clicking hubungi kami: {e}")
            return False
    
    def scroll_to_related_projects(self):
        """Scroll ke related projects section"""
        try:
            self.helpers.scroll_and_wait(self.driver, 2200, 2)
            return True
        except:
            return False
    
    def get_related_projects(self):
        """Get related project cards"""
        try:
            self.scroll_to_related_projects()
            time.sleep(1)  # Wait untuk animation
            cards = self.driver.find_elements(*self.RELATED_PROJECT_CARDS)
            return cards
        except:
            return []
    
    def click_first_related_project(self):
        """Click related project pertama"""
        cards = self.get_related_projects()
        if cards and len(cards) > 0:
            try:
                cards[0].click()
                time.sleep(3)
                return True
            except:
                return False
        return False
    
    def trigger_scroll_top_button(self):
        """Scroll untuk memunculkan scroll to top button (> 400px)"""
        try:
            self.driver.execute_script("window.scrollTo(0, 500);")
            time.sleep(1)
            return True
        except:
            return False
    
    def click_scroll_to_top(self):
        """Click scroll to top button"""
        if self.trigger_scroll_top_button():
            try:
                scroll_btn = self.helpers.wait_for_clickable(self.driver, *self.SCROLL_TOP_BTN, timeout=5)
                scroll_btn.click()
                time.sleep(1)
                return True
            except Exception as e:
                print(f"Error clicking scroll to top: {e}")
                return False
        return False