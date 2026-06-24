import "./styles/EnterCaptionComp.css";

function EnterCaptionComp({setHasDroppedImg, setNewCaption, setNewPrice}) {

async function handleSubmit(event) {
    event.preventDefault()
    const form = event.target;
    const caption = form.caption.value
    const price = form.price.value
    console.log(caption, price)
    setNewCaption(caption)
    setNewPrice(price)
    
    setHasDroppedImg(false) // this is to make comp de render each tome caption is entered

}

    return (

      <div className = "enter-caption-container" >
        
         <form onSubmit={handleSubmit}>
          <input name = "price" className ="price-input" type ="text" placeholder="enter price..."></input>
            <textarea name ="caption" className= "decription-text-area" rows = "17" columns = "50" placeholder="describe posting..."></textarea>
              <button type ="submit">submit</button>
        </form>
        
      </div>
    )
}

export default EnterCaptionComp