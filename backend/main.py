from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware


from routes import UploadImages, Contact, Register, SignIn, UpdateCart, InitPayment





app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://martinsfeathersandfurs.com",
    "https://api.martinsfeathersandfurs.com",
    "https://react-app-8n4d.onrender.com/",
    "https://backend-i1pl.onrender.com/"

    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UploadImages.router)
app.include_router(Contact.router)
app.include_router(Register.router)
app.include_router(SignIn.router)
app.include_router(UpdateCart.router)
app.include_router(InitPayment.router)
