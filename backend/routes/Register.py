from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from clients.SupaBaseClient import SupaBaseClient

router = APIRouter()
supabase_client = SupaBaseClient()


@router.post("/Register")
def Register(password: str = Form(...), username : str = Form(...)):
    
    

    result =  supabase_client.supabase.table("Users").select("username").eq("username", username).execute()
   
    
    if result.data != []:
        print(result)
        return("username : ", username, " already exists")
    
    hashedpass = passhash(password)
    print("hashedpass:" , hashedpass)
    
    supabase_client.supabase.table("Users").insert({
        "username" : username,
        "password" : hashedpass,
        "user_id" : supabase_client.SUPABASE_ADMIN_UUID
        

    }).execute()

  
   
   
    return(username, " registered succesfully")


def passhash(password: str):
    
    hasher = PasswordHasher()
    hashedpass = hasher.hash(password)

    
    return hashedpass