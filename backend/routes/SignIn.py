from clients.SupaBaseClient import SupaBaseClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import resend
from email.message import EmailMessage
import smtplib
import random, os, math
from dataclasses import dataclass
import json



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
         
         
                           
     
@router.get("/send_verification_code/{email}")
def send_verification_code(email: str):
     SCALER = 1000000

     OTVC = math.trunc((random.random() * SCALER))

     
     resend.api_key = os.getenv("RESEND_API_KEY")
     
     response = resend.Emails.send({
          "from": "contact@martinsfeathersandfurs.com",
          "to": email,
          "template" : {
              "id" : "otvc_template",
              "variables" : {
                  "OTVC" : OTVC
              }
          }
          
     })

     if(response["id"]): 
         return {"sent_success" : True, "otvc" : OTVC}
     
     return({"sent_success" : True, "otvc" : OTVC})





@dataclass
class OTVCPairdto:

    gen_otvc : int 
    userSubmittedOTVC : int 
     
  
@router.get("/check_verification_code/{OTVCPair}")
def check_verification_code(OTVCPair):

# logic to verify code
    data = json.loads(OTVCPair)

    otvcpair = OTVCPairdto(**data)

    print("genreated code : ", otvcpair.gen_otvc, '\n' , "user submitted code: ", otvcpair.userSubmittedOTVC)

    if otvcpair.userSubmittedOTVC == otvcpair.gen_otvc:
        return({"verified": True})

    return {"verified" : False}