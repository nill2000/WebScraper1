from fastapi import FastAPI
from Scraper import scrape_url
from models import ScrapeRequest, DeleteRequest
from Database import product_to_db, delete_product_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# uvicorn fastapp:app --reload

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"Message": "Hello"}

@app.post("/scrape")
def scrape(req: ScrapeRequest):
    url = req.url                   #Req is the json sent from frontend. so req.url getting the .url object from frontend
    uid = req.uid
    data = scrape_url(url)          #Scrapes for the data
    data = product_to_db(data)             #Saves data into database
    
    # After getting the mongodb json, add the uid key-value pair
    data["uid"] = uid
    
    return {"title": data["title"], "price": data["price"], "link": data["link"], "id": data["_id"]}

# Simplified approach compared to sending a json object
@app.delete("/product_delete/{productId}")
def delete_product(productId: str):
    delete_product_db(productId)
    return {"message": "Delete request made"}