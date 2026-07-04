import {useState} from 'react'
import "./styles/Signin_Register_Selection_Comp.css"
import CartComp from './CartComp'
import SignUpComp from './RegisterComp'

function Signin_Register_Selection_Comp({setSigningIn, cart, setCart, cartQuantity, setCartQuantity, user, setUser, setIsSignedIn, isSignedIn, setIsAdmin}) {

    const [isInCart, setIsInCart] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)

    function handleRegister() {

        setIsRegistering(true)
    }

    function handleSignIn() {
        
        setSigningIn(true)
       
    }

    function handleSignOut() {

        setIsSignedIn(false)
        setUser(null)
        setCart([])
        setIsAdmin(false)
        setCartQuantity(0)
    }


    function goToCart() {

        setIsInCart(1)
    }

    


    return (
        <div className ="button-container">
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link> 
            
             
           
            <div className = "img-wrapper" onClick={goToCart}>
            <img src = "src/assets/Screenshot 2026-07-01 094123.png" alt ="cart" className ="cart-icon"/>
            <p className ="cart-quantity">{cartQuantity}</p>
            </div>
            
            
            
            <div className ="button-wrapper-1">
            <button className ="selection-button-1" onClick = {handleRegister}>Register</button>

            {isRegistering &&<SignUpComp/>}
            </div>
            
            <div className ="button-wrapper-2">
            {!isSignedIn &&<button className ="selection-button-2" onClick = {handleSignIn}>Sign In</button>}
            {isSignedIn &&<button className ="selection-button-2" onClick = {handleSignOut}>Log Out</button>}          
            </div>
             
             {isSignedIn &&
            <div className = "name-wrapper ">
                <p className ="name">welcome {user} </p>
            </div>
             }

            {isInCart && <CartComp setIsInCart = {setIsInCart} cart = {cart} setCart ={setCart} setCartQuantity = {setCartQuantity} cartQuantity = {cartQuantity}/> }
        </div>

        

        

    )
    
}

export default Signin_Register_Selection_Comp