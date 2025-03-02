from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGOURI"))
    client.admin.command("ping")
    print("Connected")
    db = client["WebScrape1Py"]
    
except Exception as e:
    print(e)