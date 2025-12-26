import pytest
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from config import TestConfig


# ============================================
# CACHE CHROMEDRIVER PATH - Hindari download berulang
# ============================================
_cached_driver_path = None

def get_chrome_driver_path():
    """Get ChromeDriver path dengan caching"""
    global _cached_driver_path
    
    if _cached_driver_path is None:
        try:
            print("🔄 Installing/Updating ChromeDriver...")
            _cached_driver_path = ChromeDriverManager().install()
            print(f"✅ ChromeDriver ready: {_cached_driver_path}")
        except Exception as e:
            print(f"⚠️ ChromeDriver manager failed: {e}")
            print("ℹ️ Using system ChromeDriver...")
            _cached_driver_path = "chromedriver"  # Fallback to system PATH
    
    return _cached_driver_path


@pytest.fixture(scope="function")
def driver():
    """Setup Chrome driver untuk setiap test"""
    chrome_options = Options()
    
    # Gunakan config untuk headless mode
    if TestConfig.HEADLESS:
        chrome_options.add_argument('--headless')
    
    chrome_options.add_argument('--start-maximized')
    chrome_options.add_argument(f'--window-size={TestConfig.WINDOW_SIZE}')
    chrome_options.add_argument('--disable-notifications')
    chrome_options.add_argument('--disable-popup-blocking')
    
    # Performance optimizations
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    # Get cached driver path
    driver_path = get_chrome_driver_path()
    service = Service(driver_path)
    
    # Create driver
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    # Gunakan config untuk base URL dan timeouts
    driver.base_url = TestConfig.BASE_URL
    driver.implicitly_wait(TestConfig.TIMEOUT)
    driver.set_page_load_timeout(TestConfig.PAGE_LOAD_TIMEOUT)
    
    yield driver
    
    # Cleanup
    driver.quit()


# ========== SCREENSHOT ON FAILURE ==========

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """
    Hook untuk capture screenshot ketika test gagal
    Screenshot disimpan di folder 'screenshots/'
    """
    outcome = yield
    rep = outcome.get_result()
    
    # Cek apakah test failed saat execution
    if rep.when == "call" and rep.failed:
        driver = item.funcargs.get('driver')
        if driver:
            # Buat folder screenshots jika belum ada
            screenshot_dir = TestConfig.SCREENSHOT_DIR
            
            # Check apakah path adalah directory, bukan file
            if os.path.exists(screenshot_dir) and not os.path.isdir(screenshot_dir):
                os.remove(screenshot_dir)
            
            # Buat folder jika belum ada
            if not os.path.exists(screenshot_dir):
                os.makedirs(screenshot_dir)
            
            # Generate filename dengan timestamp
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            test_name = item.name.replace(" ", "_")
            screenshot_path = f"{screenshot_dir}/{test_name}_{timestamp}.png"
            
            # Save screenshot
            try:
                driver.save_screenshot(screenshot_path)
                print(f"\n📸 Screenshot saved: {screenshot_path}")
            except Exception as e:
                print(f"\n❌ Failed to save screenshot: {e}")


# ========== SETUP/TEARDOWN ==========

@pytest.fixture(scope="session", autouse=True)
def test_session_setup():
    """Setup yang dijalankan sekali di awal semua test"""
    print("\n" + "="*60)
    print("🚀 Starting Selenium Test Session")
    print(f"📍 Base URL: {TestConfig.BASE_URL}")
    print(f"🔗 API URL: {TestConfig.API_URL}")
    print(f"⚙️  Headless Mode: {TestConfig.HEADLESS}")
    print("="*60 + "\n")
    
    # Setup screenshot directory
    screenshot_dir = TestConfig.SCREENSHOT_DIR
    
    try:
        if os.path.exists(screenshot_dir) and not os.path.isdir(screenshot_dir):
            print(f"⚠️  File '{screenshot_dir}' exists and is not a directory. Removing...")
            os.remove(screenshot_dir)
        
        if not os.path.exists(screenshot_dir):
            os.makedirs(screenshot_dir)
            print(f"📁 Created screenshot directory: {screenshot_dir}")
        else:
            print(f"📁 Screenshot directory already exists: {screenshot_dir}")
    except Exception as e:
        print(f"⚠️  Warning: Could not setup screenshot directory: {e}")
    
    # Pre-cache ChromeDriver
    try:
        get_chrome_driver_path()
    except Exception as e:
        print(f"⚠️  Warning: Could not pre-cache ChromeDriver: {e}")
    
    yield  # Test berjalan di sini
    
    # Teardown
    print("\n" + "="*60)
    print("✅ Test Session Completed")
    print("="*60 + "\n")


# ========== PYTEST CONFIGURATION ==========

def pytest_configure(config):
    """Register custom markers"""
    config.addinivalue_line(
        "markers", "smoke: Mark test as smoke test (critical functionality)"
    )
    config.addinivalue_line(
        "markers", "validation: Mark test as validation test"
    )
    config.addinivalue_line(
        "markers", "integration: Mark test as integration test"
    )