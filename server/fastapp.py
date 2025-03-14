from fastapi import FastAPI
from Scraper import scrape_url
from models import ScrapeRequest
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
    url = req.url
    data = scrape_url(url)
    return {"title": data["title"], "price": data["price"]}