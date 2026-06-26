import { useState } from "react"
import "./styles/CartComp.css"

function CartComp({setIsInCart, cart}) {
    

    const [sampleCart, setSampleCart] = useState([{price: "100", name: "charlie" , id: "3"}])


    return (

        <div className ="overlay">

        <div className = "cart-container">
            <h1 className = "cart-title">Shopping Cart</h1>
            
            
            <div className ="checkout-summary-container">
                <div className = "checkout-summary-text-container">
                    <h1 className ="summary-title">Summary</h1>
                    <h5>Subtotal :</h5>
                    <h5># of Items :</h5>
                    <div className ="divider-line"></div>
                </div>
                <button className = "checkout-button" type ="submit">checkout</button>
            </div> {/* end summary container */}
            
            
            <button className ="exit-thing" onClick={()=> setIsInCart(false)}>X</button>
        

            {cart.map((item , index) => (
            
             <div className ="item" key = {index}> 
                <div className ="thumbnail-container">
                 <img src = {item.img_url} className = "thumbnail" alt ="img not found"></img>
                </div>
                <div className = "item-description-container">price: {item.price}</div>
                <div className = "item-description-container">id: {item.id}</div>
             </div>

    ))}




     

        </div>

        </div>
    )
}

export default CartComp