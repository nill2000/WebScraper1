from pydantic import BaseModel, HttpUrl

class ScrapeRequest(BaseModel):
    url: str
    
class DeleteRequest(BaseModel):
    id: int
class Product(BaseModel):
    user_id: str
    product_name: str
    product_price: str
    url: HttpUrl