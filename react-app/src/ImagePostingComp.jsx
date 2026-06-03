import {useState, useEffect, useRef} from "react";
import GalleryPostingComp from "./GalleryPostingComp";
import EnterCaptionComp from "./EnterCaptionComp";

function ImagePostingComp(){

    const [images, setImages] = useState([]);
    const hasRun = useRef(false)
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    

   function handleSubmit(event) {
      event.preventDefault;
      const file = event.target.files[0] 
      const formData = new FormData;
      formData.append("file",file)
   }
    

  
    ///////////////////////////////////////////////////////
    
   function dragOverHandler () {
      event.preventDefault();
    }
///////////////////////////////////////////////////////////

    async function dropHandler(){
     /// get image ready for db save
     setHasDroppedImg(true);
     const file = event.dataTransfer.files[0];
     const formData = new FormData();
     formData.append("file", file);

     //// prompt for caption and get caption ready for save 



     

     fetch('http://127.0.0.1:8000/uploadimage', {
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
        setImages(prev => [...prev, data.replaceAll('"', "")]) // this will append any new images added after app is loaded
        console.log("this is the string in array sub 0" , images[0]);
     }).catch(err => {
        console.log(err)
     })
    
    } /// end drop handler

    /////////////////////////////////////////////////////

   useEffect(()=> {
      
         if(hasRun.current) return;
         hasRun.current = false
         
         const fetchImages = async () => {
           
           try {
            const response = await fetch("http://127.0.0.1:8000/load_images", { method: "GET"});
            const data = await response.json();
            setImages(data)
            console.log("images: ", images)
           }

           catch (error) {
            console.log(error)

           }

          
         } // end fetch image defention 

        fetchImages()

        },[]) // end use effect
   
        ////////////////////////////////////////////////

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         {images.length > 0 ? images.map((img, index) => (
            <div className = "image-caption-conatiner" key = {index}>
               <img
               src = {img}
               key = {index}
               alt="uploaded"
               className="gallery-image"
            />
             </div>
           )) : <p>no images loaded!</p>}  

           {hasDroppedImg ? <EnterCaptionComp setHasDroppedImg = {setHasDroppedImg}/> : <p>no image dropped yet</p>}
       </div>

       ///// above returns each image that exists in state Array, which on load will be all

        
    )
}

export default ImagePostingComp