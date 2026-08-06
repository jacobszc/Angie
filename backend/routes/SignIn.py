from clients.SupaBaseClient import SupaBaseClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

router = APIRouter()
supabase_client = SupaBaseClient()


@router.post("/SignIn")
def SignIn(username: str = Form(...), password: str = Form(...) ):
     
     print(username)
     print(password)


     response = supabase_client.supabase.table("Users").select().eq("username", username).execute()
     if(response.data == []):
         print("retruned data array = ", response.data)
         return("username doesnt exist!")
     
     
     submitted_pass = password
     stored_hash = response.data[0]["password"]
     role = response.data[0]["role"]
     cart = response.data[0]["user_cart"]
     stripe_approved = response.data[0]["stripe_approved"]
     

     
     
     verifier = PasswordHasher()
     
     try:
       isverified =  verifier.verify(stored_hash, submitted_pass)
       if(isverified): 
          print("pass verified")
          return ({"role" : role , "cart" : cart, "stripe_approved": stripe_approved })
     except VerifyMismatchError:
         return("username or pass invalid")
         
         
                           
     
    