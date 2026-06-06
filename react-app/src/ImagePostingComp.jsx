import {useState, useEffect, useRef} from "react";
import EnterCaptionComp from "./EnterCaptionComp";

function ImagePostingComp(){
    
    const [listings, setListings] = useState([])
    const [newImgFile, setNewImgFile] = useState("");
    const [newCaption, setNewCaption] = useState("")
    const hasRun = useRef(false)
    const firstRender = useRef(true);
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    

   
    

  
    ///////////////////////////////////////////////////////
    
   function dragOverHandler () {
      event.preventDefault();
    }

    
///////////////////////////////////////////////////////////

    function dropHandler(){
    const imgfile = event.dataTransfer.files[0];
    
    setNewImgFile(imgfile)
   
    setHasDroppedImg(true);


    
   } 

    /////////////////////////////////////////////////////

   useEffect(()=> {
      
         if(hasRun.current) return;
        
         hasRun.current = true
         
         const fetchImages = async () => {
            try {
              const response = await fetch("http://127.0.0.1:8000/load_images", { method: "GET"});
              const data = await response.json();
              setListings(data) // <---- going to grab objects from backend now rather than string
             
            }
            catch (error) {
              console.log(error)

           }

         } 

        fetchImages()

        },[]) // end use effect
   
        ////////////////////////////////////////////////


        useEffect(() => {
         
          
          if(firstRender.current) {
            firstRender.current = false
            return
          }

           
           
          const formData = new FormData();
          
          formData.append("file", newImgFile)
          formData.append("caption", newCaption)
          

          fetch('http://127.0.0.1:8000/uploadlisting', {
            method: "POST",
            body: formData
            }).then(resp => {
              const obj = resp.json();
              if(!resp.ok) {
              throw new Error(obj)
             }
            return obj;
             }).then(data => {
            console.log("this is the url retuned by backend: " , data) // data shhould be the url to the newly created image
             setListings(prev => ([...prev , data])) // this will append any new images added after app is loaded
     
           }).catch(err => {
           console.log(err)
         })

          


        }, [newCaption])
      
      
       //console.log(listings)

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         {listings.length > 0 ? listings.map((listing, index) => (
            <div className = "image-caption-conatiner" key = {index}>
               <img
               src = {listing.img_url} // <-- need to now gran imurl from obj that contains imgurl and caption string
               key = {index}
               alt="uploaded"
               className="gallery-image"
            />
            <textarea className = "caption-area" value ={listing.caption} disabled>
             
            </textarea>
            
            
             </div>
           )) : <p>no images loaded!</p>}  

           {hasDroppedImg ? <EnterCaptionComp setHasDroppedImg = {setHasDroppedImg} setNewCaption = {setNewCaption}/> : <p>no caption</p>}
       </div>

       ///// above returns each image that exists in state Array, which on load will be all

        
    )
}

export default ImagePostingComp