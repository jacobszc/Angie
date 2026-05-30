import {useState, useEffect} from "react";
import { supabaseClient } from "./supabaseClientConfig";
import { SupabaseClient } from "@supabase/supabase-js";


function ImagePostingComp(){

    const [images, setImages] = useState([]);

    
    
    
    
    function dragOverHandler () {


        event.preventDefault();
    }


    async function dropHandler(){

     const file = event.dataTransfer.files[0];
    
     const formData = new FormData();

     formData.append("file", file);

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
    
     
    
    
    
    
    
 

    
}





      useEffect(()=> {

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

          


        }

        

         

      fetchImages()

     
       
       

      },[])

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         

         
         { images.length > 0 ? images.map((img, index) => (
          
          <img
            key={index}
            src={img}
            alt="uploaded"
            className="gallery-image"
          />
         
          
        )) : <p>{images.length}</p>} 
        
     </div>
    )
}

export default ImagePostingComp