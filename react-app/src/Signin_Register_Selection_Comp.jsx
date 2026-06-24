import {useState} from 'react'
import "./styles/Signin_Register_Selection_Comp.css"


function Signin_Register_Selection_Comp({setSigningIn}) {


    function handleClick() {

        setSigningIn(true)
    }


    return (
        <div className ="button-container">
            <link rel ="style-sheet" href = "https://googleapis.com/css2?family=Fira+Sans"></link> 
            <button className ="selection-button">Register</button>
            <button className ="selection-button" onClick = {handleClick}>Sign In</button>
        </div>

    )
    
}

export default Signin_Register_Selection_Comp