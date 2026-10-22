import "./styles/SecondaryImagesComp.css"

function SecondaryImagesComp({listingForWhichTodisplaySecondaries, setDisplayingSecondaries}) {



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
       
       event.target.style.inset = 0;

      console.log(event.target)

      

   }

    
     

     if(listingForWhichTodisplaySecondaries.secondary_images == null) {
        return
     }

     

    return (





        <div className ="secondary-images-wrapper" onClick = {() => setDisplayingSecondaries(false)}>
              
          {listingForWhichTodisplaySecondaries.secondary_images.map((image, index) => (
             
            
         <div className="secondary-image-frame">
           
           
           <img className =
           "secondary-image" 
           key ={index} 
         //   onMouseOver={ handleMouseOver } 
         //   onMouseLeave={ handleMouseLeave}
            alt = "no image found"
            src = {image}
           
            
            ></img>

            
            

                     </div>
           ))}

        
            
    </div>
    )
}

export default SecondaryImagesComp;