import { useState } from "react"
import "./styles/CartComp.css"

function CartComp({setIsInCart, setCart, cart, setCartQuantity}) {
    
    

    const [sampleCart, setSampleCart] = useState([{price: "100", name: "charlie" , id: "3"}])
    const [subTotal, setSubtotal] = useState(0)
    

    const handleRemoveItem = (itemToDelete) => {
    
        
   const newCart = cart.filter((item) =>  item.id !== itemToDelete.id)
   const finish = newCart.length

   setCartQuantity(finish)

   
   setCart(newCart)
   

    }
    return (

        <div className ="overlay">

        <div className = "cart-container">
            <h1 className = "cart-title">Shopping Cart</h1>
            
            
            <div className ="checkout-summary-container">
                <div className = "checkout-summary-text-container">
                    <h1 className ="summary-title">Summary</h1>
                    <h5>Subtotal ${subTotal}.00</h5>
                    <h5>Items ({cart.length})</h5>
                    
                    <h4 className = "balance">Balance  ${subTotal}.00 </h4>
                </div>
                <button className = "checkout-button" type ="submit">checkout</button>
            </div> {/* end summary container */}
            
            
            <button className ="exit-thing" onClick={()=> setIsInCart(false)}>X</button>
        

            {cart.map((item , index) => (
            
             <div className ="item" key = {index}> 
               
                <div className ="thumbnail-container">
                     <img src = {item.img_url} className = "thumbnail" alt ="img not found"></img>
                </div>

                
                < div className = "item-description-container">
                     <div className = "price"><p>$: {item.price}</p></div>
                    <div className = "id"><p>id: {item.id}</p></div>
                    <div className = "name"><p>name: cat</p></div>
                    <div className = "x" onClick = {() => handleRemoveItem(item)}><p>X</p></div> 
                </div>
                
             </div>

    ))}




     

        </div>

        </div>
    )
}

export default CartComp