from stripe import StripeClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from fastapi.responses import RedirectResponse
import os
from pydantic import BaseModel
router = APIRouter()

# list customers

YOUR_DOMAIN =  'http://localhost:5173/'
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY")

client = StripeClient(STRIPE_API_KEY)

class CartItem(BaseModel):
    img_url : str | None = None
    caption: str | None = None
    id: int | None = None
    name: str
    price: int
    type: str | None = None
    breed: str | None = None

class Items(BaseModel):
    
    cart: list[CartItem]






@router.post("/create-checkout-session")
def create_checkout_session(cart : Items):
    for item in cart.cart:
        print(item)
    
    try:
        checkout_session = client.v1.checkout.sessions.create(params={
            'line_items': [
                {
                    # Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    'price': 'price_1Tt5h4IzoQjAE2P1TAdYf99Z',
                    'quantity': 1,
                },
            ],
            'mode': 'payment',
            'success_url': YOUR_DOMAIN + '/success.html',
        })
    except Exception as e:
        return str(e)
    
    return ({ "checkout_session_url" : checkout_session.url})




@router.post("/create-new-stripe-product")
def create_new_stripe_product(product: CartItem):

     client = StripeClient(STRIPE_API_KEY)

     products = client.v1.products.list({"limit" : 99})

     for item in products:
         if item.name == product.name:
             return("stripe product already exists!")
    
    
    
     new_product = client.v1.products.create({"name" : product.name
                                              

                                              
                                              })




     return("product created succesfully")


    

    