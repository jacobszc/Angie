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
    img_url : str
    caption: str
    id: int
    name: str
    price: int
    type: str
    breed: str

class Items(BaseModel):
    
    cart: list[CartItem]






@router.post("/create-checkout-session")
def create_checkout_session(cart : Items):



    # product = client.products.create(
    #     {"name" : "doggy"}
    # )

    # price = client.prices.create({
    #     "unit_amount" : 500000,   # $5000.00
    #     "currency": "usd",
    #     "product" : product.id,

    # })

    # print("price id: " , price.id)
    
    # cart_data = [item.model_dump() for item in cart.cart]
    # item_price = cart_data[0].price
    # print(cart_data)
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






@router.post("/testStripe")
def testStripe():

    

    
   
    return("success!")

    

    