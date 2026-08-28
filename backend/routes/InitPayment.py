from stripe import StripeClient
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from fastapi.responses import RedirectResponse
import os
from pydantic import BaseModel
from decimal import Decimal
router = APIRouter()

# list customers

YOUR_DOMAIN =  'http://localhost:5173/'
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY")

client = StripeClient(STRIPE_API_KEY)

class CartItem(BaseModel):
    img_url : str | None = None
    caption: str | None = None
    id: int  
    name: str
    price: float
    type: str | None = None
    breed: str | None = None
    stripe_ID: str | None = None
    stripe_price_ID: str | None = None

class StripeId(BaseModel):

    stripe_ID : str



class Items(BaseModel):
    cart: list[CartItem]

@router.post("/create-checkout-session")
def create_checkout_session(cart : Items):
    for item in cart.cart:
        print(item)

    items = []

    for item in cart.cart:
        items.append({'price' : item.stripe_price_ID,
                    'quantity' : 1})
    
    try:
        checkout_session = client.v1.checkout.sessions.create(params={
            'ui_mode' : "elements", 
            'line_items': items,
            'mode': 'payment',
            'return_url' : YOUR_DOMAIN
        })
    except Exception as e:
        return str(e)

    print("secret ----->" ,checkout_session.client_secret)
    return ({"client_secret" : checkout_session.client_secret}) # client secret needed on front end for react to render comp
    
    
#############################################################################################


@router.post("/create-new-stripe-product")
async def create_new_stripe_product(product: CartItem):

     client = StripeClient(STRIPE_API_KEY)
     new_product = client.v1.products.create(
         { 
            "name" : product.name,
            "metadata" : {
            "db_id" : product.id
         },})
     
     new_price = client.v1.prices.create({
         "currency" : "usd",
         "product" : new_product.id,
         "unit_amount" : round(product.price * 100 )

     })

     return({"stripe_ID" : new_product.id , "stripe_price_ID" : new_price.id, "id" : product.id})


################################################################################################################



@router.post("/archive-stripe-product")
def archive_stripe_product(stripeID: StripeId):

     client = StripeClient(STRIPE_API_KEY)
     archived_product = client.v1.products.update(stripeID.stripe_ID, {"active" : False })

     return("product archived succesfully")


    

    