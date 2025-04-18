from playwright.sync_api import sync_playwright, Page, TimeoutError
from typing import Dict, Type

class BaseScraper:
    def __init__(self, url: str):
        self.url = url
        
    def fetch_data(self) -> Dict[str, str]:
        with sync_playwright() as pw:
            try:
                browser = pw.firefox.launch(headless=True)
                page = browser.new_page()
                page.set_default_timeout(5000)
                page.goto(self.url)
                
                data = self.extract_data(page)
                
                browser.close()
                return data
            
            except TimeoutError:
                return {"Message": "Timeout Error"}
            
            except Exception as e:
                print(e)
                return {"Message": "Error"}
        
    # Method is used by child classes
    def extract_data(self, page: Page):
        raise NotImplementedError("Subclasses Must Use the Method")
    
# Both Amazon and Ebay inherit BaseScraper Class to use fetch_data
class AmazonScraper(BaseScraper):
    def extract_data(self, page: Page) -> dict:
        #Amazon title locator
        print("Scraping Amazon")
        title_locator = "span#productTitle"
        product_title = page.locator(title_locator).inner_text()
        print("Located Title")
        print(product_title)
        
        #Amacon price lcoator
        price_locator = "#apex_desktop div.celwidget div.a-section span.a-price"
        #Price is separated in 3 spans. Return as iterable list and combine
        item_price = page.locator(price_locator).first.all()
        item_price = "".join([str(part.text_content()).strip() for part in item_price]) # type: ignore
        print("Located Price")
        print(item_price)
        return {"title": product_title, "price": item_price, "link": page.url}
    
class EbayScraper(BaseScraper):
    def extract_data(self, page: Page) -> dict:
        #Ebay title locator
        print("Scraping Ebay")
        title_locator = "#CenterPanel h1.x-item-title__mainTitle"
        product_title = page.locator(title_locator).inner_text()
        print("Located Title")
        print(product_title)
        
        #Ebay price locator
        price_locator = "#CenterPanel div.x-price-primary span.ux-textspans"
        item_price = page.locator(price_locator).inner_text()
        print("Located Price")
        print(item_price)
        return {"title": product_title, "price": item_price, "link": page.url}

scraper_mapping: Dict[str, Type[BaseScraper]] = {
    "amazon": AmazonScraper,
    "ebay": EbayScraper
}


# Checks if url is amazon or ebay only and starts scraping
def scrape_url(url: str) -> dict:
    for key in scraper_mapping:
        if key in url.lower():
            return scraper_mapping[key](url).fetch_data()
        
    print("Unsupported Url")
    return {"Error": "Unsupported Url"}