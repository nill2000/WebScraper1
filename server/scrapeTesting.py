from playwright.sync_api import sync_playwright

# This file checks if the links and scraping works
with sync_playwright() as pw:
    browser = pw.firefox.launch(headless=False)
    page = browser.new_page()
    page.set_default_timeout(10000)
    
    amazon_link = "https://www.amazon.com/dp/B09HWYBCXQ/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B09HWYBCXQ&pd_rd_w=eysxy&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=1JBF395G0Y4J0Z1Z7ZK9&pd_rd_wg=QTt2R&pd_rd_r=caee3cc8-e913-473d-97e2-6deaf2f1c00d&s=kitchen&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM"
    
    ebay_link = "https://www.ebay.com/itm/186930636801?chn=ps&var=694993009933&_trkparms=ispr%3D1&amdata=enc%3A17jOujeMrTP2vF5OKLro_8g26&norover=1&mkevt=1&mkrid=711-117182-37290-0&mkcid=2&mkscid=101&itemid=694993009933_186930636801&targetid=2320093655185&device=c&mktype=pla&googleloc=9027676&poi=&campaignid=21222258394&mkgroupid=164713660992&rlsatarget=pla-2320093655185&abcId=9408285&merchantid=113390167&gad_source=1&gclid=Cj0KCQiA8q--BhDiARIsAP9tKI2BE8-hy5nnLSe9lc6XEOkAg-TWt_yGqB77y-DGlTWvd0KGSVEDDVgaAhYsEALw_wcB"
    
    page.goto(amazon_link)
    print("Inside Amazon Link")
    page.wait_for_timeout(2000)
    
    print("Scraping Info...")
    
    #Locator for title
    title_locator = "#centerCol h1#title span#productTitle"
    product_title = page.locator(title_locator).inner_text()
    print(product_title)
    print("Located Title")
    
    #Locator for price
    price_locator = "#apex_desktop div.celwidget div.a-section span.a-price"
    #Price is separated in 3 spans. Return as iterable list and combine
    item_price = page.locator(price_locator).first.all()
    full_price = "".join([str(part.text_content()).strip() for part in item_price])
    print("Located Price")
    print(full_price)
    
    page.goto(ebay_link)
    print("Inside Ebay Link")
    page.wait_for_timeout(2000)
    
     #Locator for title Ebay
    title_locator = "#CenterPanel h1.x-item-title__mainTitle"
    product_title = page.locator(title_locator).inner_text()
    print(product_title)
    print("Located Title")
    
    #Locator for price Ebay
    price_locator = "#CenterPanel div.x-price-primary span.ux-textspans"
    item_price = page.locator(price_locator).inner_text()
    print("Located Price")
    print(item_price)
    
    scraped_data = []
        
    print("Finished Scraping \nClosing...")
    page.wait_for_timeout(1000)

    browser.close()