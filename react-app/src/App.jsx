import { useState } from 'react'
import TitleComp from './TitleComp';
import LogInComp from './LogInComp';
import HeaderDescriptionComp from './HeaderDescriptionComp';
import ImagePostingComp from './ImagePostingComp';
import SearchComp from './SearchComp';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {
 

  return (
   
   
 
   
   <div className = "place-holder-container">

    <TitleComp/>
    <HeaderDescriptionComp/>
    <SearchComp/>
    <ImagePostingComp/>
    <LogInComp/>
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
