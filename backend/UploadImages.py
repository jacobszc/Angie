from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path
import uuid
import os


load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_ADMIN_UUID = os.getenv("SUPABASE_ADMIN_UUID")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)




@app.get("/")
def read_root():
    return {"you called the base api endppoint which does nothing"}


@app.post("/uploadlisting")
async def upload(file : UploadFile = File(...), caption: str = Form(...)): # param name file of type UploadFile
    
   

   public_url = await make_path(file) 

   result = supabase.table("Animals").insert({
        "img_url": public_url,
          "caption" : caption,
         "user_id": SUPABASE_ADMIN_UUID
    }).execute()
   
   print("the reult of ure query is: " , result)
    

   row = result.data[0]

   listing = {
    "img_url": row["img_url"],
    "caption": row["caption"],
    "id": row["id"]
   }
       
   print("you called upload listing from ure useEffect that only runs when new img is dropped")
   print(listing)
   return listing



    
async def make_path(file: UploadFile = File(...)):

    unique_id = str(uuid.uuid4())

    file_name = f"{unique_id}_{file.filename}"

    path_to_react_imgs = Path(("../react-app/public/images")) 
    
    save_path = path_to_react_imgs / file_name

    public_url = f"/images/{file_name}"
   
    ## path.parent.mkdir(parents=True, exist_ok=True)

    img_bytes = await file.read()

    # create/write file
    with open(save_path, "wb") as f:  # jsut a try catch that cleans up when done and throws errors if broken
        f.write(img_bytes)

    return public_url
    
@app.get("/load_images")
def load_images():

    result = supabase.table("Animals").select("img_url, caption, id").execute()
    print("Result: ",result.data)
    return result.data

class RemoveImgDto(BaseModel):
    id: int 
    img_url : str


def remove_local_img(img_url : str):
 
    path_to_delete = Path("../react-app/public" ) / img_url.lstrip("/")
    print("path to delete is: ", path_to_delete)
    if(path_to_delete.exists()):
        path_to_delete.unlink()
    else:
        print("file not found!")
    return

    
@app.post("/remove_img")   
def  remove_img(obj : RemoveImgDto): 

    id = obj.id
    img_url = obj.img_url

    print("img ure is: " , img_url)

    result =  supabase.table("Animals").delete().eq("id", id).execute()

    remove_local_img(img_url)
     
    

    return("row with id: " , id , " succesfully deleted!")
