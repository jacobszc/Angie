import {EmbeddedCheckoutProvider,EmbeddedCheckout} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
function EmbeddedCheckoutComp({sessionId}) {



 const [status, setStatus] = useState("")
    // soon as page is rendered well fetch status and conditionaly check for complete

    async function checkPaymentStatus(sessionId) {
    const response = await fetch(
        `http://127.0.0.1:8000/checkout-status/${sessionId}`
    );

    const data = await response.json();

    setStatus(data.payment_status)



    
}
    
    
    
    useEffect(() => {
    
       checkPaymentStatus(sessionId);
       
       

       
     




    }, [])

    if(status === 'complete') {
  
      return (
        <p>order complete! thank you for order!</p>
      )


    }



    return (

        <div className='embedded-checkout-wrapper' style = {{width: "50%", height: "50%"}}>
       
           <EmbeddedCheckout onConfirm = { () => {


           }}/>

        </div>
    )
}

export default EmbeddedCheckoutComp