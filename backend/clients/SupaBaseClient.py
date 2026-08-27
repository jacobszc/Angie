import os
from supabase import create_client, Client
from dotenv import load_dotenv
# import boto3
# from botocore.client import Config



class SupaBaseClient: 

    

    def __init__(self):
        load_dotenv()

        self.SUPABASE_URL = os.getenv("SUPABASE_URL")
        self.SUPABASE_KEY = os.getenv("SUPABASE_KEY")
        self.SUPABASE_ADMIN_UUID = os.getenv("SUPABASE_ADMIN_UUID")
         
        self.supabase = create_client(self.SUPABASE_URL, self.SUPABASE_KEY)


# class SupaBaseStorageClient:

#     def __init__(self):
#         load_dotenv()

#         self.ENDPOINT_URL = os.getenv("S3_BUCKET_ENDPOINT")
#         self.AWS_ACCESS_KEY_ID = os.getenv("SUPABASE_S3_ACCESS_KEY_ ID")
#         self.AWS_SECRET_ACCESS_KEY = os.getenv("SUPABASE_S3_SECRET_ACCESS_KEY")
#         self.region = os.getenv("S3_BUCKET_REGION")
       

#         self.s3bucket = boto3.client(
            
#             region = self.region,
#             endpoint_url = self.ENDPOINT_URL,
#             aws_access_key_id= self.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
#             config=Config(signature_version='s3v4')

#         )
        

    


