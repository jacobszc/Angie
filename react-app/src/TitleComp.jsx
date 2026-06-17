import "./styles/TitleComp.css"
import { useState } from "react";


function TitleComp() {


     
     const [signInClicked, setSignInClicked] = useState(false)

     function handleClick() {
         
        setSignInClicked(true)


     }
  


    return (

        <div className = "title-container" >
            <button className ="sign-in" name = "sign-in" onClick={handleClick}>
                <p className = "signin-text">Sign-in</p>
            </button>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sofia"></link>

    
    <img className = "title-img" src = "src/assets/birds.png" alt = "landscape"></img>
     
     <div className = "title-words">
        
        <h2 style = {{textAlign: "center",width: "70%",fontFamily: "Sofia", borderRadius: "8px"}}>Martins Feathers and Furs </h2>
    </div>


   </div>
    )
}

export default TitleComp;