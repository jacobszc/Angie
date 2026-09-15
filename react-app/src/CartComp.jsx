import { useState, useEffect,  } from "react"
import "./styles/CartComp.css"

import CheckoutPage from "./CheckoutPage";
import {CheckoutFormProvider, CheckoutForm, useCheckoutForm} from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51Tq0KLIzoQjAE2P1MjdVZGTQeIAmreDfONebl1B8GIEHeWnv3ZjUXOFsVl9LykZqWf4RxBMrsem92jFmYSD6m7lD00qe70z0yV") 


function CartComp({setIsInCart, setCart, cart, setCartQuantity, cartQuantity}) {

    const [isInCheckoutSession, setIsInCheckoutSession] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [subTotal, setSubtotal] = useState(0)
    
    function handleCheckout() {

        const body = {
            cart: cart
         }

        fetch("http://127.0.0.1:8000/create-checkout-session", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(body)
            
        }).then(resp => {
           
            if(!resp.ok) {
                throw new Error(resp.status)
            }

             return resp.json()
            
        }).then(data => {
             console.log("stripe returned data --->" , data)
            data.client_secret
            setClientSecret(data.client_secret)
            setIsInCheckoutSession(true)

            
        }).catch(err => {
            console.log(err)
        })
    }
    
   
    const handleRemoveItem = (itemToDelete) => {
    
        const newCart = cart.filter((item) =>  item.id !== itemToDelete.id)
        const finish = newCart.length
        setCartQuantity(finish)
        setCart(newCart)
}
    
    useEffect(() => {
         const initval = 0
         const newSubtotal = cart.reduce((sum, item) => {
        return sum + item.price;
    }, initval);

    setSubtotal(newSubtotal);

   },[cart])


/////////////////////////////////////////////////////////////////////////////////////////


return (
    <div className ="overlay">

    <div className = "cart-container">
            <h1 className = "cart-title">Shopping Cart</h1>
            
            
            <div className ="checkout-summary-container">
                <div className = "checkout-summary-text-container">
                    <h1 className ="summary-title">Summary</h1>
                    <h5>Subtotal ${subTotal}.00</h5>
                    <h5>Items ({cart.length})</h5>
                    
                    <h4 className = "balance">Balance  ${subTotal}.00 </h4>
                </div>
                <button className = "checkout-button" type ="submit" onClick={handleCheckout}>checkout</button>
            </div> {/* end summary container */}
            
            
            <button className ="exit-thing" onClick={()=> setIsInCart(false)}>X</button>
        

            {cart.map((item , index) => (
            
             <div className ="item" key = {index}> 
               
                <div className ="thumbnail-container">
                     <img src = {item.img_url} className = "thumbnail" alt ="img not found"></img>
                </div>

                
                < div className = "item-description-container">
                     <div className = "price"><p>Price: ${item.price}</p></div>
                     <div className = "avalible-payment-types">
                     <p>Venmo</p>
                     <p>Cash</p>
                     <p>Stripe(Card Only)</p>
                     </div>
                    
                    <div className = "name"><p>Name:  {item.name}</p></div>
                    <div className = "x" onClick = {() => handleRemoveItem(item)}><img className = "remove-image" src = "src/assets/garbage-can.png" alt = "X"></img></div>
                </div>
                
             </div> 

            

    ))}




          {isInCheckoutSession && 
          
          <CheckoutFormProvider 
                stripe = {stripePromise}
                options = {{clientSecret}}
                >
         
         
            <CheckoutPage />
          
          </CheckoutFormProvider>
          
          
          }

        </div> 

     

        </div>
       
    )



    






    
}

export default CartComp