import {useState, useEffect, useRef} from "react";
import { supabase } from "./supabaseClient";
import EnterCaptionComp from "./EnterCaptionComp";
import FilterComp from "./FilterComp";
import anims  from "./utils/animations.js"
import "./styles/HomeComp.css"
import ContactUsComp from "./ContactUsComp";
import SecondaryImagesComp from "./SecondaryImagesComp";


function HomeComp({isadmin, setCart, cart, setCartQuantity, cartQuantity, setIsSignedIn, isSignedIn, user, setUser, setIsStripeApproved, isStripeApproved }){
    
    
    const [NewListing, setNewListing] = useState({})
    const [listings, setListings] = useState([])
    const [newImgFile, setNewImgFile] = useState("");
    const [newStripeListing, setNewStripeListing] = useState({})
    const[currentSecondariesListing, setCurrentSecondariesListing] = useState({})
    const[currentId , setCurrentId] = useState(null)
    const buttonRef = useRef(null);
    const hasRun = useRef(false)
    const firstRenderForUploadImages = useRef(true);
    const firstRenderForCreateStripeProduct = useRef(true);
    const firstRenderForRequestAnim = useRef(true);
    const [hasDroppedImg, setHasDroppedImg] = useState(false)
    const DEFAULT_FILTER = ["cat", "dog", "bird", "reptile", "fish"]
    const [filter, setFilter] = useState(DEFAULT_FILTER)
    const [isFiltering, setIsFiltering] = useState(false)
    const[isRequesting,setIsRequesting] = useState(false)
    const ListingDivRef = useRef(null);
    
    
    function handleClickShowSecondary(listing) {

      setCurrentSecondariesListing(listing)
      setCurrentId(listing.id)
    
    }

   
    function handleAddCart(event ,listing) {
      event.preventDefault()
      setCart(prev => [...prev, listing])
      setCartQuantity(cartQuantity +1)
      anims.drawThumbsUpOnAddtoCart()


  } 

    function dragOverHandler (event) {
      event.preventDefault();
    }

    function dropHandler(event){
      event.preventDefault();

      if(!isadmin) { /// only admin can drop imgs
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
        return resp.json()
      }).then(data => {
     
         const updatedListings = listings.map((listing) => {

         if(listing.id == data.id) {return data}

      })

         setListings(updatedListings)

      }).catch(err =>  {
      console.log(err)
      })

      } 

    function removeListing(listing) {

      console.log("this is the lsiting" , listing)
      
      const RemoveImgDto = {
        id: listing.id,
        img_url : listing.img_url
      }
      
      
      fetch('http://127.0.0.1:8000/remove_img' , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(RemoveImgDto)
      }).then(resp => {
      if(!resp.ok) {
         throw new Error(resp.status)
      }

      return resp.json()
      }).then(data => {
     
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

    console.log("here it is!" , data)
    }).catch(err => {

        console.log(err)
    })

    setListings(prev =>
    prev.filter((item) => item.id !== listing.id)
    );
  
    }

//////////////////////////////////////////////////////// useEffects //////////////////////////////////////////////////////////

    useEffect(() => {

      console.log(document.cookie)
      const cookies = document.cookie.split("; ")
      console.log(cookies)
      let username = ""
      let cart = []
      let stripe_approved = false

      cookies.forEach(cookie => {

      if(cookie.startsWith("username=")) {
      username = cookie.substring(9)
      }

      if(cookie.startsWith("cart=")) {
      cart = JSON.parse(cookie.substring(5))
      }

      if(cookie.startsWith("stripe_approved=")){
       
      if(cookie.substring(16) === "true")
      stripe_approved = true
      }
    
      });

      if(username === "" || cart == []) {
        return
      }
   
      setUser(username)
      setCart(cart)
      setCartQuantity(cart.length)
      setIsSignedIn(true)
      setIsStripeApproved(stripe_approved)

    },[])


   

    useEffect(() => {

      if(firstRenderForRequestAnim.current || isRequesting)  {

      firstRenderForRequestAnim.current = false
      return;

     }

      anims.drawMailboxOnConfirm()
       
    },[isRequesting])
    
    
    useEffect(()=> {
      
         if(hasRun.current) return;
          hasRun.current = true

         const fetchImages = async () => {
            try {
              const response = await fetch("http://127.0.0.1:8000/load_images", { method: "GET"});
              const data = await response.json();

               console.log("load images return = " , data.img_url )
               setListings(data) // <---- going to grab objects from backend now rather than string
             
            }
            catch (error) {
              console.log(error)
            }

            } 

          fetchImages()

    },[]) // end use effect, ohnly runs on init render
          
        
        
    useEffect(() => {
         
        if(firstRenderForUploadImages.current) {
            firstRenderForUploadImages.current = false
            return
        }

        const formData = new FormData();
        formData.append("file", newImgFile)
        formData.append("newListing", JSON.stringify(NewListing))

        fetch('http://127.0.0.1:8000/uploadlisting', {
            method: "POST",
            body: formData
        }).then(resp => {
            if(!resp.ok) {
              throw new Error(resp.status)
             }
            return resp.json()
            
        }).then(data => {

             setListings(prev => ([...prev , data]))
              setNewStripeListing(data) 
        
        }).catch(err => {
           console.log(err)
         })

    }, [NewListing])
      

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

      },[newStripeListing])


      useEffect(() => {
        
        if(user) {
       
        const body = {   // id like to refactor this and just send json
          cart: cart,
          username: user
         }

       
        fetch('http://127.0.0.1:8000/UpdateCart', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)

        }).then(resp => {
           if(!resp.ok) {
             throw new Error( resp.status)
           }

           return resp.json()
        }).then(data => {
      
              document.cookie = `cart=${data.cart_data}`

        }).catch(err => {

            console.log(err)
        })

        }

    },[cart])
    

  //////////////////////////////////////////////////////////// return /////////////////////////////////////////////////////
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

{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}         
          
        
        <div className = "listings-banner" >
            < link rel = "style-sheet" href ="https://googleapis.com/css2?family=Alfa+Slab+One"></link>
             <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link>
             <h1 className ="banner-text">Avalible Pets!</h1>
        </div>

{/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}         

           
        <div className = "listing-container">

            <button className ="filter-button" onClick = {() => setIsFiltering(true)}>filter -|-</button>
            {(listings.length > 0) ? listings.map((listing) => (
                (filter.includes(listing.type)) &&

            <div className = "listing" key = {listing.id}>
                <div className ="price-tag-img-wrapper">
                  <img className ="price-tag-img" src ="src/assets/price-tag.png"></img>
                  <p className ="price-tag-display">${listing.price}</p>
                  </div>
              
                  {<SecondaryImagesComp currentlyDisplayedSecondaries = {currentSecondariesListing.secondary_images} currentId = {currentId} listingId = {listing.id}/>}
                  <div  ref ={ListingDivRef} className ="listing-img-container" onClick={() => handleClickShowSecondary(listing) } onDrop = {() => dropHandlerSecondaryImage(event, listing)} onDragOver={() => dragOverHandler} > 
               
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

      
       )
}

export default HomeComp