from fastapi import APIRouter, UploadFile, File, HTTPException, Form

from clients.SupaBaseClient import SupaBaseClient

router = APIRouter()
supabase_client = SupaBaseClient()


@router.post("/Register")
def Register(password: str = Form(...), username : str = Form(...)):
    
    

    result =  supabase_client.supabase.table("Users").select("username").eq("username", username).execute()
   
    
    if result.data != []:
        print(result)
        return("username : ", username, " already exists")
    
    supabase_client.supabase.table("Users").insert({
        "username" : username,
        "password" : password
        

    }).execute()

  
   
   
    return(username, " registered succesfully")