import { useState, useMemo } from 'react'
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



function App() {




  const [user, setUser] = useState(null)
  const [isadmin, setIsAdmin] = useState(false)
  const [signingin, setSigningIn] = useState(false)
  const [cart, setCart] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isStripeApproved, setIsStripeApproved] = useState(false)


  
  

  return (
   



 
   
   <div id ="place-holder-container" className = "place-holder-container">
    
    
    <Signin_Register_Selection_Comp setSigningIn={setSigningIn} cart = {cart} setCart = {setCart} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} user ={user} setUser = {setUser}  setIsSignedIn = {setIsSignedIn} isSignedIn={isSignedIn} setIsAdmin = {setIsAdmin} setIsStripeApproved = {setIsStripeApproved}/>
    <TitleComp setSigningIn = {setSigningIn}/>
    <MenuComp/>
    <HomeComp isadmin={isadmin} setCart = {setCart} cart ={cart} setCartQuantity = {setCartQuantity} cartQuantity ={cartQuantity} isSignedIn={isSignedIn} user ={user} isStripeApproved ={isStripeApproved}  />
  
    
    { signingin && <SignInComp setIsAdmin={setIsAdmin} setSigningIn = {setSigningIn} setUser = {setUser} setIsSignedIn = {setIsSignedIn} cart = {cart} setCart={setCart} setCartQuantity = {setCartQuantity} setIsStripeApproved={setIsStripeApproved}/> }
  
   <SuccessPageComp/>
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
