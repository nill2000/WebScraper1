from bson import ObjectId
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
            inserted_result = collection.insert_one(product_data) #Insert product to db
            inserted_id = inserted_result.inserted_id #This contains ._id of the current product
            print("Product saved")
            item = collection.find_one({"_id": inserted_id}) #Grabs the json document of corresponding id
            print("Retrieved Item Data from DB")
            if item:
                item["_id"] = str(item["_id"]) #Converts type ObjectID to string before passing
            return item
        except Exception as e:
            print("Insert failed:", e)
            return {"Message": e}
    return None

def delete_product_db(product_id):
    db = get_db()
    if db is not None:
        try:
            collection = db["products"]
            result = collection.delete_one({"_id": ObjectId(product_id)})
            if result.deleted_count == 1:
                return {"Message": "Successful Delete"}
            else:
                return {"Message": "No id found for product"}
        except Exception as e:
            print(f"Error: ${e}")
            return {"Message": "Error Deleting Product"}
    return {"Message": "DB connection failed"}

def get_product_db(product_uid):
    db = get_db()
    if db is not None:
        try:
            collection = db["products"]
            products_cursor = collection.find({"uid": product_uid})
            products = list(products_cursor) #Returns a cursor, so change into an array
            for product in products: #Convert ObjectId to str
                product["_id"] = str(product["_id"])
            print(products)
            return products
        except Exception as e:
            print(e)
            return{"Message": "Error"}
    return {"Message": "Connection Error"}

# get_product_db("SvRi6YUtscPP0axKYM7zMEsI8ZA3")