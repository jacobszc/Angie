import { CheckoutForm, CheckoutFormProvider, useCheckoutForm } from "@stripe/react-stripe-js/checkout"

import { useState } from "react";
import SuccessPageComp from './SuccessPageComp';
import PaymentFailedComp from './PaymentFailedComp'

function CheckoutPage({setIsInCheckoutSession , stripePromise, clientSecret, setCart, setIsInCart, setIsPaymentComplete, setSessionIdForPayConfirm}) {
    
  
  const [ ErrorMessage ,setErrorMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const[renderPaymentSuccessComp, setRenderPaymentSuccessComp] = useState(false)
  const TIME = 3000;

  const checkoutState = useCheckoutForm();

  async function onConfirm(event)  {
   
console.log("ON CONFIRM FIRED");
    // somewhere here well updat the cart and clear the cart state
    

    
      
   await checkoutState.checkout.confirm({formConfirmEvent : event})

   setSessionIdForPayConfirm(checkoutState.checkout.id)
    console.log("setSessionIdForPayConfirm() called and set to ", checkoutState.checkout.id )
    setIsPaymentComplete(true)


  }

  
  
  if (checkoutState.type === "loading") {
    return <p>loading checout....</p>
  }

  if (checkoutState.type === "error") {
   return<p>error loadibng checkout...</p>
  }

  
  return (
      <div className = "overlay">
        <div className ="checkout-conatiner">
            <CheckoutForm onConfirm = { onConfirm}/>
        </div> 
      </div>


      )





  }

export default CheckoutPage