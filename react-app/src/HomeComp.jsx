import {useState, useEffect, useRef} from "react";
import EnterCaptionComp from "./EnterCaptionComp";



import "./styles/HomeComp.css"

function HomeComp({isadmin, setCart, cart, setCartQuantity, cartQuantity, isSignedIn, user}){
    
  
    const [NewListing, setNewListing] = useState({})
    const [listings, setListings] = useState([])
    const [newImgFile, setNewImgFile] = useState("");
    const [newStripeListing, setNewStripeListing] = useState({})
    
    
    const hasRun = useRef(false)
    const firstRenderForUploadImages = useRef(true);
    const firstRenderForUpdateCart = useRef(true);
    const firstRenderForCreateStripeProduct = useRef(true);
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    
    function handleAddCart(listing) {

      console.log("this is what a listing shape looks like: " , listing)

      setCart(prev => [...prev, listing])
      setCartQuantity(cartQuantity +1)
      
    }
    
    
    
    /// load images wil be first use effect run ///

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

        },[]) // end use effect, ohnly runs on init render
           
        
     ////////// 2nd useEffect which shuld only run when a new image is dropped and caption is complete

     useEffect(() => {
         
          
          if(firstRenderForUploadImages.current) {
            firstRenderForUploadImages.current = false
            return
          }

           
           
          const formData = new FormData();
          
          formData.append("file", newImgFile)
          formData.append("newListing", JSON.stringify(NewListing))

          console.log("new Listing :" , NewListing)
          console.log("stringified new Listing :" , JSON.stringify(NewListing))

          
         
          
           
           
           fetch('http://127.0.0.1:8000/uploadlisting', {
            method: "POST",
            body: formData
            }).then(resp => {
              const obj = resp.json();
              if(!resp.ok) {
              throw new Error(obj.status)
             }
            return obj;
             }).then(data => {
            console.log("this is the url retuned by backend: " , data) // data shhould be the url to the newly created image
             setListings(prev => ([...prev , data]))
             setNewStripeListing(data) //<--- prep a listing with db created id to be sent to stripe
             
             // need to extract id from data and send it along with stripe entry as meta data
           }).catch(err => {
           console.log(err)
         })

        

        

         //////////////////////////////////////////////////////////////
        
          
        

        

       
          


        }, [NewListing])
      
 /////////////////////////////// end 2nd use effect /////////////////////////////////
       

        useEffect(() =>{

          if(firstRenderForCreateStripeProduct.current) {
            firstRenderForCreateStripeProduct.current = false
            return
          }


           fetch('http://127.0.0.1:8000/create-new-stripe-product', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newStripeListing)
          }).then(resp => {
            if(!resp.ok) {
              throw new Error("error creating new stripe product!", resp.status)
            }

            return resp.json()
          }).then(data => {
            console.log("stripe product created succesfully: " , JSON.stringify(data))

            fetch('http://127.0.0.1:8000/add_stripeID_db_entry' , {
              method: "POST",
              headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

            }).then(resp => {
              if(!resp.ok) {
                throw new Error(resp.status)
              }

              return resp.text()
            }).then(data => {
              console.log(data)
            }).catch(err => {
              console.log(err)
            })
            return data
            

          }).catch(err => {
            console.log(err)
          })

          ///////////////////////////////////////////////



          





         



        },[newStripeListing])






   useEffect(() => {

  if(firstRenderForUpdateCart.current) {
       firstRenderForUpdateCart.current = false;
       return;

  } 
    
  
        const body = {
          cart: cart,
          username: user
        }

        console.log("body: ", body)

    

    fetch('http://127.0.0.1:8000/UpdateCart', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)

    }
  
  ).then(resp => {
      
       if(!resp.ok) {
          throw new Error( resp.status)
       }

       return resp.text()
    }).then(data => {
      console.log(data) // here well retrun a json list and setCart = that list
    }).catch(err => {

      console.log(err)
    })



   },[cart])
    

  
    ///////////////////////////////////////////////////////
    
   function dragOverHandler () {
      event.preventDefault();
    }

    
///////////////////////////////////////////////////////////
   


    function dropHandler(event){
      event.preventDefault();

      if(!isadmin) {
        return
      }
    const imgfile = event.dataTransfer.files[0];
    
    setNewImgFile(imgfile)
   
    setHasDroppedImg(true);


    
   } 

   function removeListing(listing) {

      console.log("this is the lsiting" , listing)
      
      const obj = {
        id: listing.id,
        img_url: listing.img_url
      }
      
      
      
       
    fetch('http://127.0.0.1:8000/remove_img' , {
      method: "POST",
      headers: {

       "Content-Type": "application/json" 

      },
      body: JSON.stringify(obj)
    }).then(resp => {
      if(!resp.ok) {
        throw new Error(resp.status)
      }

      return resp.json()
    }).then(data => {

      console.log("retruned stripe id: " , data)
      fetch('http://127.0.0.1:8000/archive-stripe-product', {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)

    }).then(resp => {
        if(!resp.ok) {
          throw new Error(resp.status)
        }

        return resp.text()

    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    
  
  
  
  }).catch(err => {

        console.log(err)
    })

    
    //remove image based on id from state array
     setListings(prev =>
    prev.filter((item) => item.id !== listing.id)
  );
  

    




   }

    /////////////////////////////////////////////////////

   
        ////////////////////////////////////////////////


        
      
       //console.log(listings)

   

    return (

      
      
     <div className = "comp-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
           <div className="scroll-container">
            


            <div className = "group">
             
            {listings.length > 0 && listings.map((listing, index) => (
             <div className = "img-container" key = {index}>
              <img
              src = {listing.img_url}
              key = {index}
              alt ="no image"
              className = "scrolling-img"
              ></img>

             </div>

            ))}

            </div>
             <div aria-hidden = "true" className = "group">
            {listings.map((listing, index) => (
              <div className = "img-container" key = {index}>
              <img
              src = {listing.img_url}
              key = {index}
              alt ="no image"
              className = "scrolling-img"
              ></img>

             </div>
            ))}

            </div>
          
            
          </div> {/* end scroll container */}
          
          
          <div className = "listings-banner">
            < link rel = "style-sheet" href ="https://googleapis.com/css2?family=Alfa+Slab+One"></link>
            <p className ="banner-text"> Below are all of our current animals looking for new homes. Make ure to email us, check avalibilty and click the "intrested button" to let us know your intrested and be first in line if more people are interested!


            </p>
            
         
          </div>

          <div></div>


          <div className = "listing-container">
         {listings.length > 0 ? listings.map((listing) => (
             
            <div className = "listing" key = {listing.id} >
               <img
               src = {listing.img_url} // <-- need to now gran imurl from obj that contains imgurl and caption string
               key = {listing.id}
               alt="image not found"
               className="listing-img"
               
            />
            
            
            
            <div className = "caption-wrapper">
            
            <textarea  name = "caption" className = "listing-caption" value ={listing.caption} disabled > </textarea>
          
            {isSignedIn && <button className ="add-to-cart-button" onClick={()=> handleAddCart(listing)}>Add to Cart <i className="fa-solid fa-cart-shopping cart-icon"></i></button>}
           { isadmin && <button className ="listing-remove-button" onClick= {() => removeListing(listing)}>remove</button>}
         </div>
           
            
            
             </div>
           )) : <p>drag and drop new posting here...</p>}  

           {(isadmin &&hasDroppedImg) && <EnterCaptionComp setHasDroppedImg = {setHasDroppedImg} setNewListing = {setNewListing}/>}
       </div>

       </div>

       ///// above returns each image that exists in state Array, which on load will be all
      
        
    )
}

export default HomeComp