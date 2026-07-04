from clients.SupaBaseClient import SupaBaseClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel

class cartDto(BaseModel):
    name: str
    price: str
    type: str
    breed: str

supabaseClient = SupaBaseClient()
router = APIRouter()



@router.post("/UpdateCart")
def UpdateCart(newCart : list[cartDto]):
    
    for item in newCart:
        print(item)

    # supabaseClient.supabase.table("Users").update("user_cart", newCart)
    
    
    return "cart updated suceesfuly"
