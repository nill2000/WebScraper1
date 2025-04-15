from pydantic import BaseModel
class ScrapeRequest(BaseModel):
    url: str
    uid: str
    nickname: str
    
