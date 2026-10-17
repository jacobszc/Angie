from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from clients.SupaBaseClient import SupaBaseClient
from dataclasses import dataclass, field
import json
from enum import Enum

router = APIRouter()
supabase_client = SupaBaseClient()


@dataclass
class userEmailJsonObjdto:
    username : str = ""
    email : str = ""

@dataclass
class RegistrationModel:
    
    username : str = ""
    email : str = ""
    success_status: bool = False
    #success_status_reasons: list[str] = field(default_factory=list)
    Failure_Reason: str = ""
         



@router.post("/Register")
def Register(password: str = Form(...), username : str = Form(...), email : str = Form(...)):

    Registration = RegistrationModel()
    
    

    
    
    hashedpass = passhash(password)
    print("hashedpass:" , hashedpass)
    
    supabase_client.supabase.table("Users").insert({
        "username" : username,
        "password" : hashedpass,
        "email" : email,
        "user_id" : supabase_client.SUPABASE_ADMIN_UUID,
        "user_cart" : [] ## this is a new user so can init an empty cart
        

    }).execute()

  
   
    Registration.success_status = True
    Registration.username = username
    
    return(Registration)

@router.get("/check_if_username_avalible/{username}")
def check_if_username_avalible(username : str):

    Registration = RegistrationModel()

    print("--------------------" , username )
    
    userNameResult =  supabase_client.supabase.table("Users").select("username").eq("username", username).execute()

    if  userNameResult.data == []:
       
        Registration.success_status = True
        Registration.username = username
        return Registration
       

    
    print("---------" , userNameResult.data[0])   
    activeUsername = userNameResult.data[0]["username"]
    Registration.username = activeUsername
    Registration.success_status = False
    Registration.Failure_Reason = "USERNAME"
    
        
        
    return Registration



@router.get("/check_if_email_avalible/{email}")
def check_if_email_avalible(email : str):

     Registration = RegistrationModel()

     emailResult =   supabase_client.supabase.table("Users").select("email").eq("email", email).execute()

     if emailResult.data == []:

         Registration.success_status = True
         Registration.email = email
         return Registration

     activeEmail = emailResult.data[0]["email"]
     Registration.success_status = False
     Registration.email = activeEmail
     Registration.Failure_Reason = "EMAIL"

     return Registration




def passhash(password: str):
    
    hasher = PasswordHasher()
    hashedpass = hasher.hash(password)

    
    return hashedpass