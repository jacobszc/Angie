from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from clients.SupaBaseClient import SupaBaseClient 


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

    return("messgae submitted! saved to db!")
  