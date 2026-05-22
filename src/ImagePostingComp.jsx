import {useState, useEffect} from "react";

function ImagePostingComp(){

    const [images, setImages] = useState([]);

    function dragOverHandler () {


        event.preventDefault();
    }


    function dropHandler(event){

    
    const file = event.dataTransfer.files[0];
    
    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();

    formData.append("file", file);
    
    setImages(prev => [...prev, imageUrl])
    
    
    
    
    
 

    
}





    useEffect(()=> {

        images.map((image,index) => {

            console.log(image)
        })


    },[images])

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
         
         {images.map((img, index) => (
          <div className ="gallery-img-container" key ={index}>
          <img
            key={index}
            src={img}
            alt="uploaded"
            className="gallery-image"
          />
          </div>
        ))}
        
     </div>
    )
}

export default ImagePostingComp