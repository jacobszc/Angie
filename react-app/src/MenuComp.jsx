import "./styles/MenuComp.css"
import ContactUsComp from "./ContactUsComp";
import { useState  } from "react";
function MenuComp() {
  
    const [isSendingMessage, setIsSendingMessage] = useState(false)


    return (

        <div className = "menu-container">
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link>
           <div className="menu-option"><h6>Home</h6></div>
           <div className="menu-option"><h6>Animals</h6></div>
           <div className="menu-option" onClick = {() => setIsSendingMessage(true)}><h6>Contact Us</h6></div>
           <div className="menu-option"><h6>Helpful Care Tips</h6></div>
           {isSendingMessage && <ContactUsComp setIsSendingMessage = {setIsSendingMessage}/>}   
   </div>



    )
}

export default MenuComp;