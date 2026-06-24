import { useState } from "react"
import "./styles/CartComp.css"

function CartComp({cart}) {
    

    const [sampleCart, setSampleCart] = useState([{price: "200", name: "bob", id: "1"}, {price: "300", name: "bill" , id: "2"}, {price: "100", name: "charlie" , id: "3"}])


    return (
        <div className = "cart-container">
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
    )
}

export default CartComp