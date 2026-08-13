from fastapi import APIRouter, UploadFile, File, HTTPException, Form

from pydantic import BaseModel

from pathlib import Path
import uuid
import os
from clients.SupaBaseClient import SupaBaseClient
import json

router = APIRouter()

supabase_client = SupaBaseClient()







@router.get("/")
def read_root():
    return {"you called the base api endppoint which does nothing"}


@router.post("/uploadlisting")
async def upload(file : UploadFile = File(...), newListing : str = Form(...)): # param name file of type UploadFile
    
   newListingData = json.loads(newListing)

   public_url = await make_path(file) 

   result =  supabase_client.supabase.table("Animals").insert({
        "img_url": public_url,
          "caption" : newListingData["caption"],
         "user_id": supabase_client.SUPABASE_ADMIN_UUID,
         "price": newListingData["price"],
         "name" : newListingData["name"],
         "type" : newListingData["type"],
         "breed" : newListingData["breed"],
         "secondary_images" : newListingData["secondary_images"]

    }).execute()
   
   print("the reult of ure query is: " , result)
    

   row = result.data[0]

   listing = {
    "img_url": row["img_url"],
    "caption": row["caption"],
    "id": row["id"],
    "price": row["price"],
    "name" : row["name"],
    "secondary_images" : row["secondary_images"]

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
    
@router.get("/load_images")
def load_images():

    result = supabase_client.supabase.table("Animals").select("img_url, caption, id, price, name, type, breed, stripe_ID, stripe_price_ID, secondary_images").execute()
    # print("Result: ",result.data)
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

    
@router.post("/remove_img")   
def  remove_img(obj : RemoveImgDto): 

    id = obj.id
    img_url = obj.img_url

    print("img ure is: " , img_url)

    result =  supabase_client.supabase.table("Animals").delete().eq("id", id).select("stripe_ID").execute()
    
    print("result looks like: ---- >>>> ", result)
    remove_local_img(img_url)
     
    

    return(result.data[0]) ## <-- result here only contains stripeId as well need that to archive assosiated stripe prodct

class StripeIdDto(BaseModel):
    stripe_ID: str
    stripe_price_ID: str
    id: int
    


@router.post("/add_stripeID_db_entry")
def add_stripe_ID_db_entry(StripeIdUpdate : StripeIdDto):

    result =  supabase_client.supabase.table("Animals").select().eq("id" , StripeIdUpdate.id).execute()

    if(result):
        update =  supabase_client.supabase.table("Animals").update({"stripe_ID" : StripeIdUpdate.stripe_ID, "stripe_price_ID" : StripeIdUpdate.stripe_price_ID  }).eq("id", StripeIdUpdate.id).execute()
        return("stripe id updated succesfully")
    else:
        return("item id doesnt exist in db!")




@router.post("/add_secondary_image")
async def add_secondary_image(secondary_image: UploadFile = File(...), id: int = Form(...)):


    
     
     
     url = await make_path(secondary_image)

    
     
    ## going to need img url, and some comparitor like name
     result = supabase_client.supabase.table("Animals").select("secondary_images").eq("id" ,id).execute()

     secondary_images = result.data[0]["secondary_images"]

     print(secondary_images)
     secondary_images.append(url)
     print(secondary_images)



     supabase_client.supabase.table("Animals").update({"secondary_images" : secondary_images }).eq("id" ,id).execute()

     return("image added!" )


