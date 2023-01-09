from fastapi import FastAPI, HTTPException, Request, Response
import uvicorn
import numpy as np 
import pandas as pd
from tensorflow import keras
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from Models.Shop import Shop
from Models.Item import Item
from Models.Pivot import Pivot


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to the MongoDB server
client = MongoClient("mongodb://localhost:27017/")

# Access the "test" database
db = client["MLOPS"]

@app.get("/")
def home():
    return {"DATA": "SALAM"}

@app.get('/predict')
async def predict(id_shop:int, id_item:int):

      # Access the "shops" collection
      pivot_collection = db["pivot_table"]
      result = pivot_collection.find_one({"shop_id": id_shop, "item_id":id_item})
    

      print(id_shop)
      print(id_item)

      print(result)
      Id= Pivot(**result).id

      print(Id)

      df_test = pd.read_csv('./test.csv')
      loaded_model = keras.models.load_model('./LSTM_model.h5')
  # creating submission file 
      xtest = np.load('./parrot.npy')
      submission_file = np.load('./predict.npy')
      submission_file = submission_file.clip(0,20)
  # creating dataframe with required columns 
      submission_trp = pd.DataFrame({'ID':df_test['ID'],'item_cnt_month':submission_file.ravel()})
      val = submission_trp['item_cnt_month'].values[Id]
      val = float(val)
     # Return val as a dictionary
      return {'Result':val}

@app.get("/shops")
def all_shops():
    # Access the "shops" collection
    shops_collection = db["Shops"]

    shops = list(shops_collection.find())

   
    return [Shop(**shop) for shop in shops]

@app.get("/items")
def all_items():
    # Access the "shops" collection
    items_collection = db["Items"]

    items = list(items_collection.find())

   
    return [Item(**item) for item in items]

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, log_level="info")
