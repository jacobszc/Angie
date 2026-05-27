from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"you called the base api endppoint which does nothing"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)): # param name file of type UploadFile
    image_bytes = await file.read()

    print(type(image_bytes))   # <class 'bytes'>
    print(len(image_bytes))    # size in bytes


    
    return "u called query db!"
