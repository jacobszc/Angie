from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client

from dotenv import load_dotenv
from pathlib import Path
import uuid
import os


load_dotenv()
app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_ADMIN_UUID = os.getenv("SUPABASE_ADMIN_UUID")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


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

@app.get("/")
def read_root():
    return {"you called the base api endppoint which does nothing"}


@app.post("/uploadimage")
async def upload(file : UploadFile = File(...)): # param name file of type UploadFile
    
   

   public_url = await make_path(file) 

   result = supabase.table("Animals").insert({
        "img_url": public_url,
         "user_id": SUPABASE_ADMIN_UUID
    }).execute()
   
   print("the reult of ure query is: " , result)
    

    # weve made the file and path to it so now we need to store that path in out db as a url to an image
    
   return public_url



    
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

    result = supabase.table("Animals").select("img_url").execute()
    
    urls = []
    for row in result.data:
        urls.append(row["img_url"])
    

    if len(urls) == 0 :
        
        raise HTTPException(
            status_code = 400,
            detail = "no images returned!"
        )
    
    print(urls)
    return urls
    
    

