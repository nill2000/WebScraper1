from pymongo import MongoClient
from dotenv import load_dotenv
import os
from Scraper import scrape_url

load_dotenv()

# Connect to cluster and get correct DB
def get_db():
    try:
        client = MongoClient(os.getenv("MONGOURI"))
        client.admin.command("ping")  # Check connection
        print("Connected to MongoDB")
        db = client["WebScrape1Py"]
        return db
    except Exception as e:
        print("MongoDB connection failed:", e)
        return None

# Checks if db is connected, connects to collections named products, and inserts data into collections
def product_to_db(product_data):
    db = get_db()
    if db is not None:
        try:
            collection = db["products"]
            collection.insert_one(product_data)
            print("Product saved")
        except Exception as e:
            print("Insert failed:", e)