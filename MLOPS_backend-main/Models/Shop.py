from pydantic import BaseModel

class Shop(BaseModel):
    shop_name: str
    id: int