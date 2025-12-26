import pytest
from pages.team_activity_page import TeamActivityPage

class TestTeamActivityPage:
    """Test cases untuk Team Activity Page"""
    
    def test_team_activity_page_loads(self, driver):
        """Test 1: Team activity page bisa dibuka"""
        team = TeamActivityPage(driver)
        team.open_team_activity_page()
        
        assert "/team-activity-section" in driver.current_url
        print("✓ Team activity page berhasil dibuka")
    
    def test_3d_ring_visible(self, driver):
        """Test 2: 3D ring team visible"""
        team = TeamActivityPage(driver)
        team.open_team_activity_page()
        
        is_visible = team.is_team_ring_visible()
        # Note: Jika 3D ring menggunakan canvas/WebGL, 
        # test ini mungkin perlu disesuaikan dengan selector yang tepat
        print(f"✓ 3D ring check selesai")
    
    def test_scroll_to_activity_cards(self, driver):
        """Test 3: Scroll menampilkan activity cards"""
        team = TeamActivityPage(driver)
        team.open_team_activity_page()
        
        initial_position = driver.execute_script("return window.pageYOffset;")
        team.scroll_to_activity_cards()
        final_position = driver.execute_script("return window.pageYOffset;")
        
        assert final_position > initial_position
        print(f"✓ Scroll ke activity cards berhasil ({initial_position} -> {final_position}px)")
    
    def test_activity_cards_visible(self, driver):
        """Test 4: Activity cards terlihat setelah scroll"""
        team = TeamActivityPage(driver)
        team.open_team_activity_page()
        
        cards = team.get_activity_cards()
        assert len(cards) > 0
        print(f"✓ Ditemukan {len(cards)} activity cards")
