from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from clients.SupaBaseClient import SupaBaseClient
from dataclasses import dataclass, field
import json

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
    success_status_reasons: list[str] = field(default_factory=list)




@router.post("/Register")
def Register(password: str = Form(...), username : str = Form(...), email : str = Form(...)):

    Registration = RegistrationModel()
    
    

    
    
    hashedpass = passhash(password)
    print("hashedpass:" , hashedpass)
    
    supabase_client.supabase.table("Users").insert({
        "username" : username,
        "password" : hashedpass,
        "email" : email,
        "user_id" : supabase_client.SUPABASE_ADMIN_UUID
        

    }).execute()

  
   
    Registration.success_status = True
    Registration.username = username
    
    return(Registration)

@router.get("/check_if_username_email_avalible/{userEmailJsonObj}")
def check_if_username_email_avalible(userEmailJsonObj):

    Registration = RegistrationModel()

    data = json.loads(userEmailJsonObj)

    userNameandEmailobj = userEmailJsonObjdto(**data)

    print(userNameandEmailobj.username)

    userNameResult =  supabase_client.supabase.table("Users").select("username").eq("username",  userNameandEmailobj.username).execute()

    emailResult =   supabase_client.supabase.table("Users").select("email").eq("email",  userNameandEmailobj.email).execute()
    
    print( userNameResult,emailResult )
    # print(userNameResult.data ,  emailResult.data)  
        
    if  userNameResult.data == [] and emailResult.data == []: # username and emial are both new so were good to retrun

        Registration.success_status = True
        Registration.success_status_reasons.append(f"username {userNameandEmailobj.username} and email {userNameandEmailobj.email} are both avalible")
        return Registration

        
    if userNameResult.data:
           activeUsername = userNameResult.data[0]["username"]
           Registration. success_status_reasons.append(f"username {activeUsername} is unavalible")
           Registration.success_status = False
    
    if emailResult.data:

            activeEmail = emailResult.data[0]["email"]
            Registration.success_status_reasons.append(f"email {activeEmail} is already in use")
            Registration.success_status = False
                

    return Registration





def passhash(password: str):
    
    hasher = PasswordHasher()
    hashedpass = hasher.hash(password)

    
    return hashedpass