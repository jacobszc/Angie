import { useState } from 'react'
import TitleComp from './TitleComp';
import LogInComp from './LogInComp';
import MenuComp from './MenuComp';
import ImagePostingComp from './ImagePostingComp';
import SearchComp from './SearchComp';
import EnterCaptionComp from './EnterCaptionComp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {

  

  return (
   
   
 
   
   <div className = "place-holder-container">

    <TitleComp/>
    <MenuComp/>
    
    {/*<SearchComp/>*/}
    <ImagePostingComp />
    {/*<LogInComp/>*/}
    {/* <EnterCaptionComp/> */}
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
