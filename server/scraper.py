from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.firefox.launch(headless=False)
    page = browser.new_page()
    page.goto("https://google.com")
    page.wait_for_timeout(5000)
    
    browser.close()