from playwright.sync_api import sync_playwright, Page

class BaseScraper:
    def __init__(self, url):
        self.url = url
        
    def fetch_data(self):
        with sync_playwright() as pw:
            browser = pw.firefox.launch(headless=True)
            page = browser.new_page()
            page.goto(self.url)
            
            data = self.extract_data(page)
            
            browser.close()
            return data
        
    def extract_data(self, page: Page):
        raise NotImplementedError("Subclasses Must Use the Method")
    
class AmazonScraper(BaseScraper):
    def extract_data(self, page):
        title_locator = "#centerCol h1#title span#productTitle"
        product_title = page.locator(title_locator).inner_text()
        print(product_title)
        print("Located Title")
        
        price_locator = "#apex_desktop div.celwidget div.a-section span.a-price"
        #Price is separated in 3 spans. Return as iterable list and combine
        item_price = page.locator(price_locator).first.all()
        item_price = "".join([part.text_content().strip() for part in item_price])
        print("Located Price")
        print(item_price)
        return {"title": product_title, "price": item_price}
    
class EbayScraper(BaseScraper):
    def extract_data(self, page):
        title_locator = "#CenterPanel h1.x-item-title__mainTitle"
        product_title = page.locator(title_locator).inner_text()
        print(product_title)
        print("Located Title")
        
        #Locator for price
        price_locator = "#CenterPanel div.x-price-primary span.ux-textspans"
        #Price is separated in 3 spans. Return as iterable list and combine
        item_price = page.locator(price_locator).inner_text()
        print("Located Price")
        print(item_price)
        return {"title": product_title, "price": item_price}