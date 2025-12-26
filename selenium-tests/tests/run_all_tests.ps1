# run_all_tests.ps1
# Complete test execution script

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ARTAJAYA AUTOMATED TESTING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if in correct directory
if (-not (Test-Path "pytest.ini")) {
    Write-Host "❌ Error: Run this script from selenium-tests directory" -ForegroundColor Red
    exit 1
}

# Check dependencies
Write-Host "🔍 Checking dependencies..." -ForegroundColor Yellow
$packages = pip list | Out-String
if ($packages -notmatch "pytest") {
    Write-Host "❌ Pytest not installed. Run: pip install -r requirements.txt" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies OK" -ForegroundColor Green

# Check if frontend/backend running
Write-Host "`n🔍 Checking services..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:5174" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Frontend running (http://localhost:5174)" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Frontend not responding (http://localhost:5174)" -ForegroundColor Red
    Write-Host "   Make sure frontend is running: npm run dev" -ForegroundColor Yellow
}

try {
    $backend = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend running (http://localhost:3000)" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Backend not responding (http://localhost:3000)" -ForegroundColor Red
    Write-Host "   Make sure backend is running: npm run dev" -ForegroundColor Yellow
}

# Ask user what to run
Write-Host "`n📋 Select test type:" -ForegroundColor Cyan
Write-Host "  1. Smoke tests (fastest - ~1 min)" -ForegroundColor White
Write-Host "  2. Full sequential (~6 min)" -ForegroundColor White
Write-Host "  3. Full parallel (~2 min)" -ForegroundColor White
Write-Host "  4. Full with HTML report (~6 min)" -ForegroundColor White
$choice = Read-Host "Enter choice (1-4)"

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

switch ($choice) {
    "1" {
        Write-Host "`n⚡ Running smoke tests..." -ForegroundColor Yellow
        pytest -m smoke -v
    }
    "2" {
        Write-Host "`n🐢 Running full test suite (sequential)..." -ForegroundColor Yellow
        pytest tests/ -v
    }
    "3" {
        Write-Host "`n🚀 Running full test suite (parallel)..." -ForegroundColor Yellow
        pytest tests/ -n 4 -v
    }
    "4" {
        Write-Host "`n📊 Running full test suite with HTML report..." -ForegroundColor Yellow
        if (-not (Test-Path "reports")) {
            New-Item -ItemType Directory -Path "reports" | Out-Null
        }
        pytest tests/ -v --html="reports/test-report-$timestamp.html" --self-contained-html
        Write-Host "`n✅ Report generated: reports/test-report-$timestamp.html" -ForegroundColor Green
        
        $openReport = Read-Host "Open report in browser? (Y/N)"
        if ($openReport -eq 'Y' -or $openReport -eq 'y') {
            Start-Process "reports/test-report-$timestamp.html"
        }
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST EXECUTION COMPLETED" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Make executable and run
# .\run_all_tests.ps1
