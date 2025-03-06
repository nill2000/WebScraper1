from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.firefox.launch(headless=False)
    page = browser.new_page()
    page.goto("https://amazon.com")
    print("Inside Amazon.com")
    page.wait_for_timeout(2000)
    
    page.reload()
    print("reloaded page")
    page.get_by_placeholder("Search Amazon").fill("computers")
    page.keyboard.press("Enter")
    print("Entered product\n")
    page.wait_for_timeout(2000)
    
    #Locator for title
    page.wait_for_selector("div.s-main-slot div.s-result-item h2 span")
    titles_locator = "div.s-main-slot div.s-result-item h2 span"
    product_titles = page.locator(titles_locator).all()[:5]
    print("Located Titles")
    
    #Filter the prices because some elements in this locator are empty
    prices_locator = "div.s-main-slot div.s-result-item span.a-price span.a-offscreen"
    all_prices = page.locator(prices_locator).all()
    filtered_prices = [price for price in all_prices if price.text_content().strip()]
    print("Filtered & Located Prices")
    product_prices = filtered_prices[:5]
    
    print("found titles and prices\n")
    
    for title, price in zip(product_titles, product_prices):
        print(title.inner_text())
        print(price.inner_text())
        print("")
    
    scraped_data = []
    
    # for i in range(valid_length):
    #     print(product_titles[i].inner_text())
    #     print(product_prices[i].inner_text())
	
        # print(f"Title: {title} \nPrice: {price} \n")
        # scraped_data.append({"title" : title, "price": price})
        
    print("Found product")
    print("Finished Printing")
    page.wait_for_timeout(3000)

    browser.close()