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

        console.log(data) // data shhould be the url to the newly created image
       // setImages(prev => [...prev, data]) // this will append any new images added after app is loaded

     }).catch(err => {
        console.log(err)
     })
    
     
    
    
    
    
    
 

    
}





    // useEffect(()=> {

    //     fetch("http://127.0.0.1:8000/load_images", {

    //         method: "GET"

    //     }).then(resp => {

    //         const text = resp.text()
            
    //         if(!resp.ok) {
    //             throw new Error(text)
    //         }
            
    //         return text
    //     }).then(data => {
    //         console.log(data)
             
    //         setImages(data)
            

             
             
           
    //     }).catch(err => {

    //         console.log(err)
    //     })


    // },[])

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         
         {images.map((img, index) => (
          
          <img
            key={index}
            src={img}
            alt="uploaded"
            className="gallery-image"
          />
         
          
        ))}
        
     </div>
    )
}

export default ImagePostingComp