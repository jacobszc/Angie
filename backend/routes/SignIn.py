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
          return ({"role" : role , "cart" : cart, "stripe_approved": stripe_approved, "username" : username, "cart_string" : json.dumps(cart) })# store as cookeis on front end for state persist
     except VerifyMismatchError:
         return("username or pass invalid")
         
         
                           
     
@router.get("/send_verification_code/{email}")
def send_verification_code(email: str):

     print("WERE IN")
     SCALER = 1000000

     email = json.loads(email)

     print("email: " , email)

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

     print("response = " , response)

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
        return({"verified": True, "otvc" : otvcpair.gen_otvc })

    return {"verified" : False , "otvc" : otvcpair.userSubmittedOTVC }



@router.get("/verify_user/{forgotPassDto}")
def sendPasswordReset(forgotPassDto: str):
    data = json.loads(forgotPassDto)
    
    result =  supabase_client.supabase.table("Users").select().eq("username" , data["username"] ).eq("email" , data["email"]).execute()

    print("result ---->" , result)
    if result.data == []:
          return {"sucess_status" : False , "success_status_reason" : "username/email dont match or dont exist"}

    return {"sucess_status" : True, "success_status_reason" : "username email match"}

@router.get("/sendPasswordReset/{forgotPassDto}")
def sendPasswordReset(forgotPassDto: str):

    if not forgotPassDto:
        return {"sucess_status" : False , "success_status_reason" : "no username or email sent"}
       

    data = json.loads(forgotPassDto)

    if not data["username"] or not data["email"]:
         return {"sucess_status" : False , "success_status_reason" : "no username or email sent"}



    print(data["username"])
    print(data["email"])

    #send email with link to reset pass
    
    


    return {"success_status" : True}