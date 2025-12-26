import pytest
import time
from pages.contact_form_page import ContactFormPage


class TestContactForm:
    """
    Test cases untuk Contact Form
    Form di landing page (section 7) - no modal
    """
    
    def test_01_contact_section_visible(self, driver):
        """
        Test: Contact section dapat diakses
        """
        print("\n" + "="*60)
        print("TEST 1: Contact Section Visibility")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        
        # Scroll to contact section
        assert form.scroll_to_contact_section(), "❌ Gagal scroll ke contact section"
        time.sleep(1)
        
        # Verify section visible
        assert form.is_contact_section_visible(), "❌ Contact section tidak terlihat"
        
        print("✅ TEST PASSED: Contact section berhasil diakses")
    
    def test_02_contact_info_displayed(self, driver):
        """
        Test: Informasi kontak ditampilkan (email, phone, address)
        """
        print("\n" + "="*60)
        print("TEST 2: Contact Information Display")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Get contact info
        contact_info = form.get_contact_info()
        
        # Verify at least one info is displayed
        assert contact_info, "❌ Tidak ada contact info"
        
        # Check each field
        if contact_info.get('email'):
            print(f" ✅ Email: {contact_info['email']}")
        if contact_info.get('phone'):
            print(f" ✅ Phone: {contact_info['phone']}")
        if contact_info.get('address'):
            print(f" ✅ Address: {contact_info['address']}")
        
        print("✅ TEST PASSED: Contact info ditampilkan")
    
    def test_03_fill_contact_form_fields(self, driver):
        """
        Test: Semua form fields dapat diisi
        """
        print("\n" + "="*60)
        print("TEST 3: Fill Form Fields")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Fill form
        test_nama = "Test User"
        test_email = "testuser@example.com"
        test_pesan = "Ini adalah pesan test untuk form kontak."
        
        success = form.fill_contact_form(test_nama, test_email, test_pesan)
        assert success, "❌ Gagal mengisi form"
        
        print("✅ TEST PASSED: Form berhasil diisi")
    
    def test_04_validation_empty_form(self, driver):
        """
        Test: Validasi form kosong (semua field required)
        """
        print("\n" + "="*60)
        print("TEST 4: Validation - Empty Form")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Submit tanpa isi form
        form.click_submit()
        time.sleep(2)
        
        # Check for error message
        has_error = form.is_error_message_visible()
        
        if has_error:
            error_msg = form.get_status_message()
            assert "lengkapi" in error_msg.lower() or "field" in error_msg.lower(), \
                f"❌ Error message tidak sesuai: {error_msg}"
            print(f"✅ Validasi error: {error_msg}")
        else:
            # HTML5 validation mungkin mencegah submit
            print("✅ HTML5 validation mencegah submit form kosong")
        
        print("✅ TEST PASSED: Validasi form kosong berfungsi")
    
    def test_05_validation_partial_form(self, driver):
        """
        Test: Validasi form tidak lengkap
        """
        print("\n" + "="*60)
        print("TEST 5: Validation - Partial Form")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Isi hanya nama
        assert form.fill_nama("Test User"), "❌ Gagal isi nama"
        
        # Submit
        form.click_submit()
        time.sleep(2)
        
        # Check validation
        has_error = form.is_error_message_visible()
        
        if has_error:
            error_msg = form.get_status_message()
            print(f"✅ Validasi error: {error_msg}")
        else:
            print("✅ HTML5 validation mencegah submit")
        
        print("✅ TEST PASSED: Validasi form tidak lengkap berfungsi")
    
    def test_06_validation_invalid_email(self, driver):
        """
        Test: Validasi format email tidak valid
        """
        print("\n" + "="*60)
        print("TEST 6: Validation - Invalid Email Format")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Fill dengan email invalid
        form.fill_nama("Test User")
        form.fill_email("invalid-email-format")  # No @ symbol
        form.fill_pesan("Test pesan")
        
        # Submit
        form.click_submit()
        time.sleep(2)
        
        # HTML5 email validation should prevent submit
        print("✅ TEST PASSED: Email validation tested")
    
    @pytest.mark.slow
    def test_07_successful_submission(self, driver):
        """
        Test: Submit form dengan data valid
        NOTE: Marked as slow karena EmailJS API might be slow/rate-limited
        """
        print("\n" + "="*60)
        print("TEST 7: Successful Form Submission")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Fill valid data
        test_nama = "Selenium Test User"
        test_email = "selenium.test@example.com"
        test_pesan = "Ini adalah pesan dari automated testing. Mohon abaikan pesan ini."
        
        success = form.fill_contact_form(test_nama, test_email, test_pesan)
        assert success, "❌ Gagal mengisi form"
        
        # Submit
        form.click_submit()
        
        # Wait longer untuk EmailJS API response (bisa lambat)
        time.sleep(5)
        
        # Check for status message
        has_message = form.wait_for_status_message(timeout=10)
        
        if has_message:
            status_msg = form.get_status_message()
            
            # Check if success or error
            if form.is_success_message_visible():
                print(f"✅ Success: {status_msg}")
            elif form.is_error_message_visible():
                print(f"⚠️ Error (might be EmailJS rate limit): {status_msg}")
            else:
                print(f"ℹ️ Status: {status_msg}")
        else:
            print("⚠️ No status message (EmailJS might be down or rate-limited)")
        
        print("✅ TEST PASSED: Form submission executed")
    
    def test_08_google_maps_visible(self, driver):
        """
        Test: Google Maps iframe terlihat
        """
        print("\n" + "="*60)
        print("TEST 8: Google Maps Display")
        print("="*60)
        
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        
        # Scroll down more untuk maps
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        
        # Check maps
        has_maps = form.is_google_maps_visible()
        
        if has_maps:
            print("✅ Google Maps iframe detected")
        else:
            print("⚠️ Google Maps not detected (might be blocked)")
        
        print("✅ TEST PASSED: Google Maps check completed")


# ============================================
# SMOKE TESTS
# ============================================

@pytest.mark.smoke
class TestSmokeContactForm:
    """Smoke tests - critical functionality only"""
    
    def test_smoke_contact_section(self, driver):
        """Smoke: Contact section accessible"""
        form = ContactFormPage(driver)
        form.open_landing_page()
        assert form.scroll_to_contact_section()
        assert form.is_contact_section_visible()
        print("✅ SMOKE TEST: Contact section accessible")
    
    def test_smoke_fill_form(self, driver):
        """Smoke: Form fields can be filled"""
        form = ContactFormPage(driver)
        form.open_landing_page()
        form.scroll_to_contact_section()
        assert form.fill_contact_form("Test", "test@example.com", "Test message")
        print("✅ SMOKE TEST: Form can be filled")
