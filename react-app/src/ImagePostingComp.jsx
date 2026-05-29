import {useState, useEffect} from "react";
import { supabaseClient } from "./supabaseClientConfig";
import { SupabaseClient } from "@supabase/supabase-js";


function ImagePostingComp(){

    const [images, setImages] = useState([]);

    async function fetchImages() {

         const response = fetch("http://127.0.0.1:8000/load_images", {

            method: "GET"

        }).then(resp => {

            const text = resp.text()
            
            if(!resp.ok) {
                throw new Error(text)
            }
            
            return text
        }).then(data => {
            console.log("your fetch made it to second tehn and this is what data looks like: " , data)
             
            setImages(data)
            console.log("setImages was called on data anbd now images looks like this: " , images)
             
           // console.log(images, " length: " , images.length)
            

             
             
           
        }).catch(err => {

            console.log(err)
        })

       console.log("this is the response var u defined: " ,response)

    }
    
    
    
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





    //  useEffect(()=> {

    //      fetchImages()
       
       

    //  },[])

   

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