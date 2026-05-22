import { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ImagePostingComp from './ImagePostingComp';

import './App.css'

function App() {
 

  return (
   <div className = "place-holder-container">
   
   
   <div className = "header-div" >

    
    <img className = "header-img-1 "src = "images/pink-flower-bird-hd.png"></img>
     <div className ="title-container">
    <h1 style ={{justifySelf: "center", font: "lucida-h andwriting"}}>Angies Bird Thing</h1>
    <h2>Mabey Licenced????</h2>

    </div>

     <img className = "header-img-2 "src = "images/rainbow-bird-hd.png"></img>

     
    


   </div>

   <div className = "description-container-top" style ={{width: "100%", height: "100px", backgroundColor: "greenyellow"}}>

   </div>

    <div className = "center-search-bar-div">
    <div className ="input-container" >
      <i className="fa-solid fa-magnifying-glass search-icon"></i>

    <input className ="search-input "type = "text" placeholder='Search...' />
    
    

    </div>

    </div>


    <ImagePostingComp/>
   
   
   
   </div> // end of placeholder container

   
  
  )
}

export default App
