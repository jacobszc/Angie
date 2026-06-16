from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from clients.SupaBaseClient import SupaBaseClient 
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
import resend


router = APIRouter()
supabase_client = SupaBaseClient()



@router.post("/SubmitContact")
def SubmitContact(name : str = Form(...), email : str = Form(...), phone : str = Form(...), subject : str = Form(...), message : str = Form(...)):
     
    


    supabase_client.supabase.table("Messages").insert({
          "name": name,
          "email": email,
          "phone": phone,
          "subject": subject,
          "message": message
     }).execute()
    # extract 5 values from file

    send_email(name, email, phone, subject, message)

    return("messgae submitted! saved to db!")
  

def send_email(name , email, phone, subject, message :str):
      
     resend.api_key = os.getenv("RESEND_API_KEY")

     r = resend.Emails.send({
     "from": "contact@martinsfeathersandfurs.com",
     "to": "jacobms23@hotmail.com",
     "subject": subject,
     "text": f"""
      Name: {name}
      Email: {email}
      Phone: {phone}
       
      {message}
   


  """
})

     
     


     
     return("email sent succesfully")
