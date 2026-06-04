import "./EnterCaptionComp.css";

function EnterCaptionComp({setHasDroppedImg, setNewCaption}) {

async function handleSubmit(event) {
    event.preventDefault()
    const form = event.target;
    const formData = new FormData(form);
    const caption = formData.get("caption")
    setNewCaption(caption)
    
    setHasDroppedImg(false) // this is to make comp de render each tome caption is entered

}

    return (

      <div className = "enter-caption-container" >
         <form onSubmit={handleSubmit}>
            <textarea name ="caption" className= "decription-text-area" rows = "5" columns = "50" placeholder="describe posting..."></textarea>
              <button type ="submit">submit</button>
        </form>
        
      </div>
    )
}

export default EnterCaptionComp