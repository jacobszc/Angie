import os
from supabase import create_client, Client
from dotenv import load_dotenv



class SupaBaseClient: 

    

    def __init__(self):
        load_dotenv()

        self.SUPABASE_URL = os.getenv("SUPABASE_URL")
        self.SUPABASE_KEY = os.getenv("SUPABASE_KEY")
        self.SUPABASE_ADMIN_UUID = os.getenv("SUPABASE_ADMIN_UUID")
         
        self.supabase = create_client(self.SUPABASE_URL, self.SUPABASE_KEY)
        

    


