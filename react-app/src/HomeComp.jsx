import {useState, useEffect, useRef} from "react";
import EnterCaptionComp from "./EnterCaptionComp";
import FilterComp from "./FilterComp";



import "./styles/HomeComp.css"
import ContactUsComp from "./ContactUsComp";
import SecondaryImagesComp from "./SecondaryImagesComp";


function HomeComp({isadmin, setCart, cart, setCartQuantity, cartQuantity, isSignedIn, user, isStripeApproved }){
    
    
    const [NewListing, setNewListing] = useState({})
    const [listings, setListings] = useState([])
    const [newImgFile, setNewImgFile] = useState("");
    const [newStripeListing, setNewStripeListing] = useState({})
    const buttonRef = useRef(null);
    
    const hasRun = useRef(false)
    const firstRenderForUploadImages = useRef(true);
    const firstRenderForUpdateCart = useRef(true);
    const firstRenderForCreateStripeProduct = useRef(true);
    const firstRenderForRequestAnim = useRef(true);
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    const[isHoveringImage, setIsHoveringImage] = useState(false)
    
    
    const DEFAULT_FILTER = ["cat", "dog", "bird", "reptile", "fish"]
    const [filter, setFilter] = useState(DEFAULT_FILTER)
    const [isFiltering, setIsFiltering] = useState(false)
    const[isRequesting,setIsRequesting] = useState(false)
    const ListingDivRef = useRef(null);
    
    
    function handleHoverEnter(listingDivRef, listing) {

      event.preventDefault();

      console.log(listingDivRef)
      console.log(listing)
      
     
       
      
     
      
      

    

    }

    // function handleHoverExit(event) {

    //   event.preventDefault();
      
    //   setIsHoveringImage(true)
      
      
    //   const currentListing = event.currentTarget
    // console.log("current listing --->" , currentListing )
    //   currentListing.appendChild(secondary)

    // }
    
    
    
    function handleAddCart(event ,listing) {
       
      event.preventDefault()

      const button = event.currentTarget
      button.disabled = true



      
      console.log("this is what a listing shape looks like: " , listing)

      setCart(prev => [...prev, listing])
      setCartQuantity(cartQuantity +1)


      /// run added to cart animation
       
        const rect = event.currentTarget.getBoundingClientRect();
        console.log("event: " ,event.currentTarget)
        console.log(rect.left, rect.top)
        let anim = document.createElement("div");
        let text = document.createElement("text")
          const body = document.body


        text.textContent = "hello"
        text.style.display = "flex"
        text.style.alignContent = "center"
        text.style.justifyContent = "center"


        let img = document.createElement("img")

        img.src = "src/assets/thumbs-up.png"
        img.style.width = "100%"
        img.style.height = "100%"

      
       
      
         anim.style.position = "fixed";
         anim.style.width = "50px";
         anim.style.height = "50px";
         anim.style.left = `${(rect.right) - 40}px`;
         anim.style.top = `${(rect.top) - 40}px`;

         
         anim.style.zIndex = "99999";
           body.appendChild(anim)
         anim.appendChild(img)

         img.style.animation = "rotate 0.5s"
        

         setTimeout(() => {
          anim.remove()
         }, 500)

         setTimeout(() => {
          button.disabled = false
         }, 2000)
 

        


// anim.classList.add("cart-animation");

// anim.style.position = "fixed";
// anim.style.left = `${rect.left}px`;
// anim.style.top = `${rect.top}px`;



 


      
     
     
      
    }

    useEffect(() => {

     if(firstRenderForRequestAnim.current || isRequesting)  {

      firstRenderForRequestAnim.current = false
      return;

     }

       
       
       
       
       let anim = document.createElement("div");
       let envelope = document.createElement("img")

       envelope.src = "src/assets/mail_box_open.png"
       envelope.style.width = "100%"
       envelope.style.height = "100%"

       

       anim.style.width = "50px";
       anim.style.height = "50px"
       anim.style.position = "fixed";
       anim.style.left = "50%"
       anim.style.top ="50%"
        
       anim.style.zIndex = "99999";
       document.body.appendChild(anim)
       anim.appendChild(envelope)

       setTimeout(()=> {
        envelope.src = "src/assets/mail_box_closed.png"
       },1000)

       setTimeout(()=> {
        anim.remove()
       },2000)

    },[isRequesting])
    
    
    
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

   function dropHandlerSecondaryImage(event, listing){
      event.preventDefault();

      if(!isadmin) {
        return
      }
    const imgfile = event.dataTransfer.files[0];
    const id = listing.id

    console.log(imgfile, "\n",  id)

    const formData = new FormData()

    formData.append("secondary_image", imgfile )
    formData.append("id", id)


    
    fetch('http://127.0.0.1:8000/add_secondary_image', {
      method: "POST",
      body: formData

    }).then(resp => {
      if(!resp.ok) {
        throw new Error(resp.status)
      }

      return resp.text()
    }).then(data => {
      console.log(data)
    }).catch(err =>  {
      console.log(err)
    })


    
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

      
      
     <div  id ="comp-container" className = "comp-container" onDrop = {dropHandler} onDragOver={dragOverHandler}>
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
            
          
            
          </div> {/* end scroll container */}
          
          
          <div className = "listings-banner" >
            < link rel = "style-sheet" href ="https://googleapis.com/css2?family=Alfa+Slab+One"></link>
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link>
            <h1 className ="banner-text">Avalible Pets!</h1>
             <h2></h2>
             
             
            
         
          </div>

          

           
          <div className = "listing-container">

            
            
            
            <button className ="filter-button" onClick = {() => setIsFiltering(true)}>filter -|-</button>
            
            
            
         {(listings.length > 0) ? listings.map((listing) => (
            
           
            (filter.includes(listing.type)) &&

            
            <div className = "listing" key = {listing.id}  >
              
              
              <div className ="price-tag-img-wrapper">
                <img className ="price-tag-img" src ="src/assets/price-tag.png"></img>
                <p className ="price-tag-display">${listing.price}</p>
              </div>

               
               
               <div  ref ={ListingDivRef} className ="listing-img-container" onClick={() => handleHoverEnter(ListingDivRef.current, listing) } onDrop = {() => dropHandlerSecondaryImage(event, listing)} onDragOver={() => dragOverHandler} > 
               
               <img
               src = {listing.img_url} // <-- need to now gran imurl from obj that contains imgurl and caption string
               key = {listing.id}
               alt="image not found"
               className="listing-img"
               
               
            />
            </div>
            
            
            
            <div id = "caption-wrapper" className = "caption-wrapper">
            
            <textarea name = "caption" className = "listing-caption" value ={listing.caption}> </textarea>
          
            {(isSignedIn && !isadmin && isStripeApproved) && <button id ="add-to-cart-button" className ="add-to-cart-button" onClick={(event)=> handleAddCart(event,listing)}>Add to Cart <i className="fa-solid fa-cart-shopping cart-icon"></i></button> }
            
            {(isSignedIn && !isadmin && !isStripeApproved) && <button ref ={buttonRef} className ="request-button" onClick={() => setIsRequesting(true)}>Request <i className="fa-regular fa-envelope"></i></button>}

           { isadmin && <button className ="listing-remove-button" onClick= {() => removeListing(listing)}>remove</button>}
         </div>
           
         
            
             </div>
           )) : <p>drag and drop new posting here...</p>}  

           {(isadmin &&hasDroppedImg) && <EnterCaptionComp setHasDroppedImg = {setHasDroppedImg} setNewListing = {setNewListing}/>}
       </div>


        {isFiltering && <FilterComp setIsFiltering = {setIsFiltering} setFilter = {setFilter} DEFAULT_FILTER = {DEFAULT_FILTER}/>}

        


          { isRequesting &&<ContactUsComp setIsRequesting = {setIsRequesting}/>}
       </div>

       ///// above returns each image that exists in state Array, which on load will be all
       
        
    )
}

export default HomeComp