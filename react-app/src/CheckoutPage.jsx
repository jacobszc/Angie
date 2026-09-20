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

    setIsPaymentComplete(true)
    setSessionIdForPayConfirm(checkoutState.checkout.id)
      
   checkoutState.checkout.confirm({formConfirmEvent : event})


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
            <CheckoutForm onConfirm = { (event) => { onConfirm(event)}}/>
        </div> 
      </div>


      )





  }

export default CheckoutPage