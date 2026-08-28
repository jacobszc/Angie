from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel
from pathlib import Path
import uuid
import os
from clients.SupaBaseClient import SupaBaseClient
import json

router = APIRouter()
supabase_client = SupaBaseClient()

class RemoveImgDto(BaseModel):
    id: int 
    img_url : str

class StripeIdDto(BaseModel):
    stripe_ID: str
    stripe_price_ID: str
    id: int






@router.get("/")
def read_root():
    return {"you called the base api endppoint which does nothing"}


@router.post("/uploadlisting")
async def upload(file : UploadFile = File(...), newListing : str = Form(...)): # param name file of type UploadFile
   img_file_name = await make_file_name(file)
   bytes =  await file.read()
   newListingData = json.loads(newListing)  ## this is my listing object sent from front end before any storage
   upload =  supabase_client.supabase.storage.from_("listing_images").upload(img_file_name , bytes , {"content-type": file.content_type}) #insert into bucket
   bucket_url = supabase_client.supabase.storage.from_("listing_images").get_public_url(upload.path)

  

   result = supabase_client.supabase.table("Animals").insert({
        "img_url": bucket_url, ## this should now be url to bucket and work exactly the same
          "caption" : newListingData["caption"],
         "user_id": supabase_client.SUPABASE_ADMIN_UUID,
         "price": newListingData["price"],
         "name" : newListingData["name"],
         "type" : newListingData["type"],
         "breed" : newListingData["breed"],
         "secondary_images" : newListingData["secondary_images"]}).execute()
   
   row = result.data[0]

   listing = {
    "img_url": row["img_url"],
    "caption": row["caption"],
    "id": row["id"],
    "price": row["price"],
    "name" : row["name"],
    "secondary_images" : row["secondary_images"]

   }
       
   return listing

#######################################################################################################################

@router.get("/load_images")
def load_images():

    result = supabase_client.supabase.table("Animals").select("img_url, caption, id, price, name, type, breed, stripe_ID, stripe_price_ID, secondary_images").execute()
    print("---- results.data----" , result.data)

    return result.data

##################################################################################################################   

@router.post("/remove_img")   
def remove_img(ImageToRemove : RemoveImgDto): 

    id = ImageToRemove.id
    img_url = ImageToRemove.img_url
    reversed = []
    file_name = []
    
    for char in img_url:
        reversed.insert(0,char)

    for char in reversed:
        if char == "/":
           break
        file_name.insert(0, char)

    file_name = "".join(file_name)

    resp = supabase_client.supabase.storage.from_("listing_images").remove(file_name)  ## first remove from bucket by img_url
    result = supabase_client.supabase.table("Animals").delete().eq("id", id).select("stripe_ID").execute()  ## then remove from db itself and retrun the stripe id to be used to archive the prodcuit
  
    return(result.data[0]) ## <-- result here only contains stripeId as well need that to archive assosiated stripe prodct

######################################################################################################################################
    


@router.post("/add_stripeID_db_entry")
def add_stripe_ID_db_entry(StripeIdUpdate : StripeIdDto):

    result =  supabase_client.supabase.table("Animals").select().eq("id" , StripeIdUpdate.id).execute()

    if(result):
        update =  supabase_client.supabase.table("Animals").update({"stripe_ID" : StripeIdUpdate.stripe_ID, "stripe_price_ID" : StripeIdUpdate.stripe_price_ID  }).eq("id", StripeIdUpdate.id).execute()
        return("stripe id updated succesfully")
    else:
        return("item id doesnt exist in db!")


############################################################################################################################################

@router.post("/add_secondary_image")
async def add_secondary_image(secondary_image: UploadFile = File(...), id: int = Form(...)):


    bytes = await secondary_image.read()
    img_file_name = await make_file_name(secondary_image)
    bucket_url  = f"https://supabase.co/storage/v1/object/public/listing_images/{img_file_name}"


    bucket_result = supabase_client.supabase.storage.from_("listing_images").upload(img_file_name , bytes, {"content-type": secondary_image.content_type})
    result = supabase_client.supabase.table("Animals").select("secondary_images").eq("id" ,id).execute()

    secondary_images = result.data[0]["secondary_images"]
    secondary_images.append(bucket_url)
    result = supabase_client.supabase.table("Animals").update({"secondary_images" : secondary_images }).eq("id" ,id).execute()
    data = result.data[0]

    return(data)

####################################################################################################################################


async def make_file_name(file: UploadFile = File(...)):

    unique_id = str(uuid.uuid4()) # 034242-5454353-fsdf3
    file_name = f"{unique_id}.png" #034242-5454353-fsdf3_pikachu.png
    return file_name