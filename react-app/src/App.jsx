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

  

  return (
   



 
   
   <div className = "place-holder-container" style = {{backgroundColor: "hsl(11, 37%, 95%)"}}>
    
    <SignUpComp/>

    {/* <TitleComp/>
    <MenuComp/>
    <ImagePostingComp />
    <LogInComp/>
    <ContactUsComp/> */}
    {/*<LogInComp/>*/}
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
