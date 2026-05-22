import {useState, useEffect} from "react";

function ImagePostingComp(){

    const [images, setImages] = useState([]);

    function dragOverHandler () {


        event.preventDefault();
    }


    function dropHandler(event){

    
    const file = event.dataTransfer.files[0];

    const formData = new FormData();

    formData.append("file", file);
    
    setImages(prev => [...prev, file])
    
    
    
    
    
 

    
}





    useEffect(()=> {

        images.map((image,index) => {

            console.log(image)
        })


    },[images])

   

    return (

     <div className = "image-posting-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>

        
     </div>
    )
}

export default ImagePostingComp