"""
Configuration file untuk Selenium Testing
Website: Profile Company Artajaya
"""

class TestConfig:
    """Configuration untuk testing environment"""
    
    # Base URLs
    BASE_URL = "http://localhost:5174"
    API_URL = "http://localhost:3000"
    
    # Test Data
    VALID_PROJECT_ID = "ca9c5626-e52a-4bb8-943d-f89d832288cc"  # Update dengan ID valid dari database kamu
    
    # Selenium Settings
    TIMEOUT = 10  # Implicit wait timeout (seconds)
    PAGE_LOAD_TIMEOUT = 30  # Page load timeout (seconds)
    
    # Browser Settings
    HEADLESS = False  # Set True untuk headless mode (tanpa UI browser)
    WINDOW_SIZE = "1920,1080"  # Browser window size
    
    # Wait Times (seconds)
    SHORT_WAIT = 1
    MEDIUM_WAIT = 2
    LONG_WAIT = 5
    
    # Scroll Settings
    SCROLL_DISTANCE = 500  # Default scroll distance in pixels
    SCROLL_PAUSE = 0.5  # Pause after scroll (seconds)
    
    # Screenshot Settings
    SCREENSHOT_ON_FAILURE = True
    SCREENSHOT_DIR = "screenshots"
    
    # Parallel Execution
    PARALLEL_WORKERS = 4  # Number of parallel test workers
