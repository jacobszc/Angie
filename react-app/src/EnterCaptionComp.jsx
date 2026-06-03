import "./EnterCaptionComp.css";

function EnterCaptionComp({setHasDroppedImg}) {

function handleSubmit() {

    console.log("button clciked!")
    setHasDroppedImg(false)

}

    return (

      <div className = "enter-caption-container" >
         <form onSubmit={handleSubmit}>
        
         <textarea className= "decription-text-area" rows = "5" columns = "50" placeholder="describe posting..."></textarea>
        </form>
        <button onClick={handleSubmit}>submit</button>
      </div>
    )
}

export default EnterCaptionComp