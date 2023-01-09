from pydantic import BaseModel

class Pivot(BaseModel):
    shop_id: int
    item_id: int
    id: int