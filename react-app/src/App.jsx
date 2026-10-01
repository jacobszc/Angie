import { useState, useMemo, useEffect, useRef } from 'react'
import TitleComp from './TitleComp';
import SignInComp from './SignInComp';
import MenuComp from './MenuComp';
import HomeComp from './HomeComp';

import SearchComp from './SearchComp';
import EnterCaptionComp from './EnterCaptionComp';
import CartComp from './CartComp';
import ContactUsComp from './ContactUsComp';
import CheckoutForm from './CheckoutForm'
import SuccessPageComp from './SuccessPageComp';
import Signin_Register_Selection_Comp from './Signin_Register_Selection_Comp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PaymentFailedComp from './PaymentFailedComp';




function App() {


  const [user, setUser] = useState(null)
  const [isadmin, setIsAdmin] = useState(false)
  const [signingin, setSigningIn] = useState(false)
  const [cart, setCart] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isStripeApproved, setIsStripeApproved] = useState(false)
  const [isPaymentComplete,  setIsPaymentComplete] = useState(false)
  const [sessionIdForPayConfirm, setSessionIdForPayConfirm] = useState("")
  const [renderPaymentSuccessComp,  setRenderPaymentSuccessComp] = useState(true)
  const[timeToCheckIfPaymentSuccesful,setTimeToCheckIfPaymentSuccesful] = useState(true)
  const firstRun = useRef(true)

  async function checkPaymentStatus(sessionId) {
    const response = await fetch(
        `http://127.0.0.1:8000/checkout-status/${sessionId}`
    );

    const data = await response.json();

    if (data.payment_status === "paid") {

      // payment was succesful so its time to clear out the cart. whenever cart is updted, update cart is called automaticly
        
        return true
        
        }

    return false
}

  
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const sessionId = urlParams.get('session_id');
   window.history.replaceState({}, "", "http://localhost:5173/");
     
    
   if(sessionId) {

    return(<div style={{"width" : "1000px" , "height" : "1000px"}}>

      {renderPaymentSuccessComp && <SuccessPageComp setRenderPaymentSuccessComp = {setRenderPaymentSuccessComp}/>}

   </div>)
   }
  
 
  
  return (
   
   <div id ="place-holder-container" className = "place-holder-container">
    
    
    <Signin_Register_Selection_Comp setSigningIn={setSigningIn} cart = {cart} setCart = {setCart} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} user ={user} setUser = {setUser}  setIsSignedIn = {setIsSignedIn} isSignedIn={isSignedIn} setIsAdmin = {setIsAdmin} setIsStripeApproved = {setIsStripeApproved} setIsPaymentComplete = {setIsPaymentComplete} setSessionIdForPayConfirm = {setSessionIdForPayConfirm} />
    <TitleComp setSigningIn = {setSigningIn}/>
    <MenuComp/>
    <HomeComp isadmin={isadmin} setCart = {setCart} cart ={cart} setCartQuantity = {setCartQuantity} cartQuantity ={cartQuantity} isSignedIn={isSignedIn} user ={user} isStripeApproved ={isStripeApproved}  />
  
    
    { signingin && <SignInComp setIsAdmin={setIsAdmin} setSigningIn = {setSigningIn} setUser = {setUser} setIsSignedIn = {setIsSignedIn} cart = {cart} setCart={setCart} setCartQuantity = {setCartQuantity} setIsStripeApproved={setIsStripeApproved}/> }
 
    
   
   </div> // end of placeholder container

   
  
  )
}



export default App
