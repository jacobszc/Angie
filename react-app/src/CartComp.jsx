import { useState } from "react"
import "./styles/CartComp.css"

function CartComp({setIsInCart, cart}) {
    

    const [sampleCart, setSampleCart] = useState([{price: "100", name: "charlie" , id: "3"}])


    return (

        <div className ="overlay">
        <div className = "cart-container">
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