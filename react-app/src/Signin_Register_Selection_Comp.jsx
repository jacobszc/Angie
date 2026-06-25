import {useState} from 'react'
import "./styles/Signin_Register_Selection_Comp.css"
import CartComp from './CartComp'

function Signin_Register_Selection_Comp({setSigningIn}) {

    const [isInCart, setIsInCart] = useState(0)

    function handleClick() {

        setSigningIn(true)
    }


    function goToCart() {

        setIsInCart(1)
    }

    const [cartQuantity, setCartQuantity] = useState(0);


    return (
        <div className ="button-container">
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link> 
            
             
           
            <div className = "img-wrapper" onClick={goToCart}>
            <img src = "src/assets/cart.jpg" alt ="cart" className ="cart-icon"/>
            <p className ="cart-quantity">{cartQuantity}</p>
            </div>
            
            
            
            <div className ="button-wrapper-1">
            <button className ="selection-button-1">Register</button>
            </div>
            
            <div className ="button-wrapper-2">
            <button className ="selection-button-2" onClick = {handleClick}>Sign In</button>
            </div>
            {isInCart && <CartComp setIsInCart = {setIsInCart}/> }
        </div>

        

    )
    
}

export default Signin_Register_Selection_Comp