import { useState } from 'react'
import TitleComp from './TitleComp';
import LogInComp from './LogInComp';
import MenuComp from './MenuComp';
import ImagePostingComp from './ImagePostingComp';
import SearchComp from './SearchComp';
import EnterCaptionComp from './EnterCaptionComp';
import ContactUsComp from './ContactUsComp';
import SignUpComp from './SignUpComp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';





function App() {

  const [isadmin, setIsAdmin] = useState(false)
  const [signingin, setSigningIn] = useState(false)

  

  return (
   



 
   
   <div className = "place-holder-container" style = {{backgroundColor: "hsl(11, 37%, 95%)"}}>
    
   

    <TitleComp setSigningIn = {setSigningIn}/>
    <MenuComp/>
    <ImagePostingComp isadmin={isadmin} />
  
    <ContactUsComp/> 
    { signingin && <LogInComp setIsAdmin={setIsAdmin} setSigningIn = {setSigningIn}/> }
  
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
