import {useState} from 'react'
import "./styles/Signin_Register_Selection_Comp.css"


function Signin_Register_Selection_Comp({setSigningIn}) {


    function handleClick() {

        setSigningIn(true)
    }

    const [cartQuantity, setCartQuantity] = useState(0);


    return (
        <div className ="button-container">
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link> 
            
             <div className="button-wrapper-1">
            <button className ="selection-button-1"></button>
            <div className = "img-container">
            <img src = "src/assets/cart.jpg" alt ="cart" className ="cart-icon"/>
            </div>
            <p className ="cart-quantity">{cartQuantity}</p>
            </div>
            
            <div className ="button-wrapper-2">
            <button className ="selection-button-2">Register</button>
            </div>
            
            <div className ="button-wrapper-3">
            <button className ="selection-button-3" onClick = {handleClick}>Sign In</button>
            </div>
        </div>

    )
    
}

export default Signin_Register_Selection_Comp