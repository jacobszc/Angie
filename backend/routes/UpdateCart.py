from clients.SupaBaseClient import SupaBaseClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel

class PYcartDto(BaseModel):
    img_url : str
    caption: str
    id: int
    name: str
    price: int
    type: str
    breed: str

supabaseClient = SupaBaseClient()
router = APIRouter()



@router.post("/UpdateCart")
def UpdateCart(cart : list[PYcartDto]):
   
    print(cart)
      

    # supabaseClient.supabase.table("Users").update({"user_cart" : cart}).eq("id",cart.id).execute()
    
    
    return "cart updated suceesfuly"
