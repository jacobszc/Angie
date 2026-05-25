import {useState, useEffect} from "react";
import { supabaseClient } from "./supabaseClientConfig";
import { SupabaseClient } from "@supabase/supabase-js";


function ImagePostingComp(){

    const [images, setImages] = useState([]);

    function dragOverHandler () {


        event.preventDefault();
    }


    async function dropHandler(){

     const { error } = await supabaseClient
     .from('Animals')
     .insert({  img_url: 'pink-flower-bird-hd.png', caption: "this is an image of a bird for sale", price:200})

   
    // const file = event.dataTransfer.files[0];
    
    // const imageUrl = URL.createObjectURL(file);

    // const formData = new FormData();

    // formData.append("file", file);
    
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