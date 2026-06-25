import { useState } from 'react'
import TitleComp from './TitleComp';
import SignInComp from './SignInComp';
import MenuComp from './MenuComp';
import ImagePostingComp from './ImagePostingComp';
import SearchComp from './SearchComp';
import EnterCaptionComp from './EnterCaptionComp';
import CartComp from './CartComp';
import ContactUsComp from './ContactUsComp';
import Signin_Register_Selection_Comp from './Signin_Register_Selection_Comp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';





function App() {

  const [isadmin, setIsAdmin] = useState(false)
  const [signingin, setSigningIn] = useState(false)

  

  return (
   



 
   
   <div className = "place-holder-container" style = {{backgroundColor: "hsl(11, 37%, 95%)"}}>
    
    
    < Signin_Register_Selection_Comp setSigningIn={setSigningIn}/>
    <TitleComp setSigningIn = {setSigningIn}/>
    <MenuComp/>
    <ImagePostingComp isadmin={isadmin} />
  
    <ContactUsComp/> 
    { signingin && <SignInComp setIsAdmin={setIsAdmin} setSigningIn = {setSigningIn}/> }
  
  

   
   </div> // end of placeholder container

   
  
  )
}

export default App
