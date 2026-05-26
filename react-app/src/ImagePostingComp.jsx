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
    
     const imageUrl = URL.createObjectURL(file);

     const formData = new FormData();

     const testString = "this is a test";

     formData.append("file", file);

    fetch('http://127.0.0.1:8000/querydb', {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: testString
        
     }).then( resp => {
        const text = resp.text();
        if(!resp.ok) {
            throw new Error(text)
        }
        return text;
     }).then(data => {

        console.log(data)
     }).catch(err => {
        console.log(err)
     })
    
    // setImages(prev => [...prev, imageUrl])
    
    
    
    
    
 

    
}





    useEffect(()=> {

        images.map((image,index) => {

            console.log(image)
        })


    },[images])

   

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