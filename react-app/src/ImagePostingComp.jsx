import {useState, useEffect, useRef} from "react";
import EnterCaptionComp from "./EnterCaptionComp";

function ImagePostingComp(){
    const listingDto = {img_url: "", caption: ""}
    const [listings, setListings] = useState([])
    const [newImg, setNewImg] = useState("");
    const [newCaption, setNewCaption] = useState("")
    const hasRun = useRef(false)
    const firstRender = useRef(true);
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    const [transferData, setTransferData] = useState({imgfile: null, caption: ""});

   
    

  
    ///////////////////////////////////////////////////////
    
   function dragOverHandler () {
      event.preventDefault();
    }

    
///////////////////////////////////////////////////////////

    function dropHandler(){
      // get image ready for db save
    console.log("dropHandler entered!")
    
    const imgfile = event.dataTransfer.files[0];
    
    setTransferData(prev => ({
      ...prev, imgfile : imgfile
    }))
   
    setHasDroppedImg(true);


  
    

  //   
    
    } /// end drop handler

    /////////////////////////////////////////////////////

   useEffect(()=> {
      
         if(hasRun.current) return;
         hasRun.current = false
         
         const fetchImages = async () => {
           
           try {
            const response = await fetch("http://127.0.0.1:8000/load_images", { method: "GET"});
            const data = await response.json();
            setListings(data) // <---- going to grab objects from backend now rather than string
            
           }

           catch (error) {
            console.log(error)

           }

          
         } // end fetch image defention 

        fetchImages()

        },[]) // end use effect
   
        ////////////////////////////////////////////////


        useEffect(() => {
          if(firstRender.current) {
           
            firstRender.current = false;
            
            return
          }

          

          setTransferData(prev =>( {
            ...prev , caption: newCaption
          }))
           
          const formData = new FormData();
          
          formData.append("file", transferData.imgfile)
          formData.append("caption", newCaption)
          

          for (const [key, value] of formData.entries()) {
           console.log(key, value);
 }
          
             fetch('http://127.0.0.1:8000/uploadlisting', {
              method: "POST",
             body: formData
             }).then( resp => {
              const text = resp.text();
              if(!resp.ok) {
              throw new Error(text)
             }
            return text;
             }).then(data => {
            console.log("this is the url retuned by backend: " , data) // data shhould be the url to the newly created image
           setNewImg(data.replaceAll('"', "")) // this will append any new images added after app is loaded
     
           }).catch(err => {
           console.log(err)
         })

          


        }, [newCaption])
      
      
      

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         {newImg.length > 0 ? newImg.map((listing, index) => (
            <div className = "image-caption-conatiner" key = {index}>
               <img
               src = {listing.img_url} // <-- need to now gran imurl from obj that contains imgurl and caption string
               key = {index}
               alt="uploaded"
               className="gallery-image"
            />
             </div>
           )) : <p>no images loaded!</p>}  

           {hasDroppedImg ? <EnterCaptionComp setHasDroppedImg = {setHasDroppedImg} setNewCaption = {setNewCaption}/> : <p>no caption</p>}
       </div>

       ///// above returns each image that exists in state Array, which on load will be all

        
    )
}

export default ImagePostingComp