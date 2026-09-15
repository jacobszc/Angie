import { useState } from "react";

function PaymentFailedComp() {

  function navigateToCheckout() {
    
    isInCheckoutSession(true)


  }
  

  return (
    <div className="payment-failed-container">
      <h1>Payment Failed</h1>

      <p>
        Something went wrong while processing your payment.
        Please try again.
      </p>

      <button onClick = {() => navigateToCheckout()}>
        Return to Checkout
      </button>
    </div>
  );
}

export default PaymentFailedComp;