import "./styles/SecondaryImagesComp.css"

function SecondaryImagesComp({setDisplayingSecondaries, currentlyDisplayedSecondaries, currentId, listingId}) {



   function handleMouseOver(event) {

      
      event.target.style.inset = 0
      event.target.style.width = "100%";
      event.target.style.height = "100%";
      event.target.style.zIndex = "4"
      

   }


   function handleMouseLeave(event) {

      event.target.style.width = "50%";
      event.target.style.height = "20%";
      event.target.style.position = "";
       event.target.style.zIndex = "";
       event.target.style.inset = 0;

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





        <div className ="secondary-images-wrapper" onClick = {() => setDisplayingSecondaries(false)}>

          {currentlyDisplayedSecondaries.map((image, index) => (
             
            
            
           
           <img className =
           "secondary-image" 
           key ={index} 
           onMouseOver={ handleMouseOver } 
           onMouseLeave={ handleMouseLeave}
            alt = "no image found"
            src = {image}
           
            
            ></img>
            


           ))}

        
            
    </div>
    )
}

export default SecondaryImagesComp;