import { captureOwnerStack } from "react";
import "./styles/EnterCaptionComp.css";

function EnterCaptionComp({setHasDroppedImg, setNewCaptionObject}) {

  const captionDto = {
    "caption" : "",
    "price" : 0,
    "type" : "",
    "breed" : ""
  }

async function handleSubmit(event) {
    event.preventDefault()
    
    const form = event.target;
    captionDto.caption = form.caption.value
    captionDto.name = form.name.value
    captionDto.price = form.price.value
    captionDto.type = form.type.value
    captionDto.breed = form.breed.value

    

      console.log(captionDto)
     setNewCaptionObject(captionDto)
    setHasDroppedImg(false) // this is to make comp de render each tome caption is entered

}

    return (
   
      <div className = "enter-caption-container" >
        
         <form onSubmit={handleSubmit}>
          
          <div  className ="admin-input-container">
          
          <input name = "name" className ="name-input" type ="text" placeholder="enter name..."></input>
           <input name = "price" className ="price-input" type ="text" placeholder="enter price..."></input>
           <input name = "type" className ="type-input" type ="text" placeholder="enter type...(eg. cat/bird)"></input>
           <input name = "breed" className ="breed-input" type ="text" placeholder="enter breed..."></input>
           
           </div>
           
           <textarea name ="caption" className= "decription-text-area" rows = "17" columns = "50" placeholder="describe posting..."></textarea>
              <button className ="caption-submit-button" type ="submit">submit</button>
        </form>
        
      </div>
    )
}

export default EnterCaptionComp