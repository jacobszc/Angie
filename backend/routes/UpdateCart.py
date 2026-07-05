from clients.SupaBaseClient import SupaBaseClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel

class CartItem(BaseModel):
    img_url : str
    caption: str
    id: int
    name: str
    price: int
    type: str
    breed: str

class UpdateCartRequest(BaseModel):
    username: str
    cart: list[CartItem]
   

supabaseClient = SupaBaseClient()
router = APIRouter()



@router.post("/UpdateCart")
def UpdateCart(updateRequest : UpdateCartRequest):

    cart_data = [item.model_dump() for item in updateRequest.cart]
   
    print(updateRequest.username)
    print(updateRequest.cart)
      

    supabaseClient.supabase.table("Users").update({"user_cart": cart_data}).eq("username",updateRequest.username).execute()
    
    
    return "cart updated suceesfuly"
