from fastapi import FastAPI, HTTPException
from scraper import scrape_url
from models import ScrapeRequest
from database import product_to_db, delete_product_db, get_product_db
from fastapi.middleware.cors import CORSMiddleware
from send_noti import check_price

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
    nickname = req.nickname
    data = scrape_url(url)          #Scrapes for the data
    
    if "title" not in data or "price" not in data:
        raise HTTPException(status_code=422, detail="Scraping Failed")
    
    
    data["uid"] = uid 			#Add the uid from frontend
    data["nickname"] = nickname #Add the nickname from frontend
    data = product_to_db(data)  #Saves data into database
    
    return {
        "title": data["title"], 
        "price": data["price"], 
        "link": data["link"], 
        "_id": data["_id"], 
        "uid": data["uid"], 
        "nickname": data["nickname"]
    }

# Simplified approach compared to sending a json object
@app.delete("/product_delete/{productId}")
def delete_product(productId: str):
    delete_product_db(productId)
    return {"message": "Delete request made"}

@app.get("/get_products")
def get_products(uid: str):
    check_price(uid) #Check the price and update db
    result = get_product_db(uid) #Grab stuff from db
    print("Loading Products from DB")
    return result