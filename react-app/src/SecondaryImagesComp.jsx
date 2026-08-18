import "./styles/SecondaryImagesComp.css"
import {useRef} from "react"
function SecondaryImagesComp({currentlyDisplayedSecondaries, currentId, listingId}) {



   function handleMouseOver(event) {

      event.target.style.position = "absolute";
      event.target.style.inset = 0
      event.target.style.width = "100%";
      event.target.style.height = "100%";
      event.target.style.zIndex = "9999"
      

   }


   function handleMouseLeave(event) {

      event.target.style.width = "50%";
      event.target.style.height = "20%";
      event.target.style.position = "";
       event.target.style.zIndex = "";
       event.target.style.inset = "";

      console.log(event.target)

      

   }

    
     

     if(currentlyDisplayedSecondaries == null) {
        return
     }

     if(currentId == null) {
        return
     }

     if(currentId != listingId) {
        return
     }

    return (





        <div className ="secondary-images-wrapper">

          {currentlyDisplayedSecondaries.map((image, index) => (
             
            
            
           
           <img className =
           "secondary-image" 
           key ={index} 
           onMouseOver={() => handleMouseOver(event) } 
           onMouseLeave={()=> handleMouseLeave(event)}
            alt = "no image found"
            src = {image}
            key ={index}
            className ="secondary-image" 
            ></img>
            


           ))}

        
            
    </div>
    )
}

export default SecondaryImagesComp;