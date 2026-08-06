
import "./styles/EnterCaptionComp.css";

function EnterCaptionComp({setHasDroppedImg, setNewListing}) {

  const NewListingDto = {
    "caption" : "",
    "name" : "",
    "price" : 0.00,
    "type" : "",
    "breed" : ""
  }

  function handleSubmit(event) {
    event.preventDefault()
    
    const form = event.target;
    NewListingDto.caption = form.caption.value
    NewListingDto.name = form.name.value
    NewListingDto.price = form.price.value
    NewListingDto.type = form.type.value
    NewListingDto.breed = form.breed.value

    

      console.log(NewListingDto)
     setNewListing(NewListingDto)
    setHasDroppedImg(false) // this is to make comp de render each tome caption is entered

}


// cuurent types ["cat", "dog", "bird", "reptile", "fish"]
    return (
   
      <div className = "enter-caption-container" >
        
         <form onSubmit={handleSubmit}>
          
          <div  className ="admin-input-container">
          
          <input name = "name" className ="name-input" type ="text" placeholder="enter name..."></input>
           <input name = "price" className ="price-input" type ="text" placeholder="enter price..."></input>
           <select name="type" id="pet-select" className ="type-dropdown">
              <option value="">--Choose Type--</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="fish">Fish</option>
              
</select>
           <input name = "breed" className ="breed-input" type ="text" placeholder="enter breed..."></input>
           
           </div>
           
           <textarea name ="caption" className= "decription-text-area" rows = "17" columns = "50" placeholder="describe posting..."></textarea>
              <button className ="caption-submit-button" type ="submit">submit</button>
              <button className ="caption-cancel-button" onClick={() => setHasDroppedImg(false)}>cancel</button>
        </form>
        
      </div>
    )
}

export default EnterCaptionComp