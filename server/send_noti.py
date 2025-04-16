import yagmail
import os
from dotenv import load_dotenv
from scraper import scrape_url
from database import get_product_db
from typing import cast
from pymongo import MongoClient
import resend

load_dotenv()

client = MongoClient(os.getenv("MONGOURI"))
db = client['WebScrape1Py']
collection = db['products']

def check_price():
    products = get_product_db(None)
    for product in cast(list[dict], products):
        current_price = product["price"] #Grab the price in the document
        new_price = scrape_url(product["url"])["price"] #Grab the newly scraped price
        if new_price != current_price:
            collection.update_one({"_id": product['_id']}, {"$set": {"price": new_price}}) #Find the matching product and replace the price with new price but only the price itself
            product["price"] = new_price
    return None

def send_notification():
    try:
        yag = yagmail.SMTP(user=os.getenv("email"), password=os.getenv("app_pw"))
        yag.send(
            to=os.getenv("email"), 
            subject='ItemTracker', 
            contents='Testing',
            headers={"From": "WebScrape Alerts <ItemTrackerNoti@gmail.com>"}
            )
        print("Email sent successfully")
    except Exception as e:
        print("Error, email was not sent")
        print(e)
    
def resend_noti():
    email = os.getenv("email", "")
    resend.api_key = os.getenv("resend_api")
    try:
        params: resend.Emails.SendParams = {
        "from": "ItemTracker <onboarding@resend.dev>",
        "to": [email],
        "subject": "resend api testing",
        "html": "<strong>it works!</strong>",
    }
        email = resend.Emails.send(params)
        print("Email Sent")
    
    except Exception as e:
        print(e)
    
    
    pass

    
if __name__ == "__main__":
    resend_noti()
