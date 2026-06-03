function GalleryPostingComp(  ) {

     function handleSubmit(event) {
      event.preventDefault;
      const file = event.target.files[0] 
      const formData = new FormData;
      formData.append("file",file)
   }
    
    
    
    
    <div className = "image-caption-conatiner">
          
          
          <img
            
            
            alt="uploaded"
            className="gallery-image"
          />
          <form onSubmit = {handleSubmit} >
          <textarea className="caption-area" rows = "5" cols= "50" placeholder = "describe animal here..." >

          </textarea>

          </form>
        </div>



}

export default GalleryPostingComp;