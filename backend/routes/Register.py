from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from clients.SupaBaseClient import SupaBaseClient
from dataclasses import dataclass

router = APIRouter()
supabase_client = SupaBaseClient()

@dataclass
class RegistrationModel:
    username : str = ""
    success_status: bool = False
    success_status_reason: str = ""




@router.post("/Register")
def Register(password: str = Form(...), username : str = Form(...)):

    Registration = RegistrationModel()
    
    

    result =  supabase_client.supabase.table("Users").select("username").eq("username", username).execute()
   
    
    if result.data != []:
        print(result)
        Registration.username = username
        Registration.success_status = False # redunant but jsut to make sure
        Registration.success_status_reason = "username exists"
        return(Registration) # fail if user already exists
    
    hashedpass = passhash(password)
    print("hashedpass:" , hashedpass)
    
    supabase_client.supabase.table("Users").insert({
        "username" : username,
        "password" : hashedpass,
        "user_id" : supabase_client.SUPABASE_ADMIN_UUID
        

    }).execute()

  
   
    Registration.success_status = True
    Registration.username = username
    
    return(Registration)


def passhash(password: str):
    
    hasher = PasswordHasher()
    hashedpass = hasher.hash(password)

    
    return hashedpass