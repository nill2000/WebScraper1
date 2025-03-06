from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.firefox.launch(headless=False)
    page = browser.new_page()
    page.goto("https://amazon.com")
    print("In Login Page")
    page.wait_for_timeout(2000)
    
    page.reload()
    locator = page.get_by_placeholder("Search Amazon")
    locator.fill("computers")
    page.keyboard.press("Enter")
    print("Entered product")
    page.wait_for_timeout(2000)
    
    parent_div = page.locator("div.s-main-slot")
    products = parent_div.locator("div.s-asin").all()[:5]
    print("Located")
    
    for product in products:
        title = product.locator("h2").text_content()
        price = product.locator("span.a-offscreen").text_content()
        print(f"Title: {title} \nPrice: {price} \n")
        
    print("Found product")
    print("Finished Printing")
    page.wait_for_timeout(3000)

    browser.close()