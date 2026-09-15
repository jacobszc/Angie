import { CheckoutForm, CheckoutFormProvider, useCheckoutForm } from "@stripe/react-stripe-js/checkout"
import { useState } from "react";
import SuccessPageComp from './SuccessPageComp';
import PaymentFailedComp from './PaymentFailedComp'

function CheckoutPage({setIsInCheckoutSession ,stripePromise, clientSecret}) {
    
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)


    const checkoutState = useCheckoutForm();

    if (checkoutState.type === 'error') {
    return <div>Error: {checkoutState.error.message}</div>;
  }


  const onConfirm = (event) => {
    if (checkoutState.type === 'success') {
         setPaymentSuccessful(true)
       checkoutState.checkout.confirm({formConfirmEvent: event});
      
    }
  };

    
    


    return (
      <div className = "overlay">

        {paymentSuccessful ? <SuccessPageComp/>

         : <div className ="checkout-conatiner">
               
                        <CheckoutForm onConfirm = {onConfirm}/>
              
    
    </div> }

    </div>


    )





}

export default CheckoutPage