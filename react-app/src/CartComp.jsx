import { useState } from "react"
import "./styles/CartComp.css"

function CartComp({setIsInCart}) {
    

    const [sampleCart, setSampleCart] = useState([{price: "100", name: "charlie" , id: "3"}])


    return (

        <div className ="overlay">
        <div className = "cart-container">
            <button className ="exit-thing" onClick={()=> setIsInCart(false)}>X</button>
        <div className="items-container">

            {sampleCart.map((item , index) => (
            
             <div className ="item" key = {index}> 
                <div className = "item-description-container">name: {item.name}</div>
                <div className = "item-description-container">price: {item.price}</div>
                <div className = "item-description-container">id: {item.id}</div>
             </div>

    ))}




        </div>
     

        </div>

        </div>
    )
}

export default CartComp