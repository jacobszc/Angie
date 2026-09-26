import "./styles/RegisterComp.css"
import { useState, useRef } from "react";
import { supabase } from "./supabaseClient";
import OtvcCodeComp from './OtvcCodeComp';

function RegisterComp({setIsRegistering}) {

     const [isValidUserName, setIsValidUserName] = useState(true)
     const [isvalidPass, setIsValidPass] = useState(true)
     const [isPassMatch, setIsPassMatch] = useState(true)
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true)
    const[isEnteringVerificationCode ,setIsEnteringVerificationCode] = useState(false)
    const otvc = useRef(0)
    const email = "jacobms23@outlook.com"

    
    
    
    async function sendEmailVerificationCode(email) {
      
        try {

        const resp = await fetch(`http://127.0.0.1:8000/send_verification_code/${email}`)
        
        const data = await resp.json()
        
        
        
        if(data.sent_success === true && data.otvc) {

            setIsEnteringVerificationCode(true)
            otvc.current = data.otvc

            
        }
     }

        catch(error) {
           console.log(error)
           return
        
        }
       
        

       
};
    
    
    
    

    function handleSubmit(event) {
        
        
        event.preventDefault();
         
        const username = event.target.username.value
        const password = event.target.password.value
        const confirmpassword = event.target.confirmpassword.value
        const email = event.target.email.value
        
        event.target.username.value = ""
        event.target.password.value = ""
        event.target.confirmpassword.value = ""
        event.target.email.value =""
        
        const validateUserName = (username)  => {
           let isvalid = true
            
           if(username.length < 8) {
            console.log("username is: ",  username.length , " characters which is not valid!")
            setIsValidUserName(false)
            return false
           }


           console.log("username is: ",  username.length , " characters which is valid!")
           return isvalid
         
        } 


        const validatePassword = (password, confirmpassword) => {
             let isvalid = true
           // check is pass and confirm pass match and is proper length
           
           
           if(password !== confirmpassword) {
                setIsPassMatch(false)
                console.log("passwords dont match!!!!")
                return false
            }

           if(password.length < 10) {
            setIsValidPass(false)
                console.log("password must be atleast 10 characters!!!")
                return false
            }

         
             
             
          // check is password includes atleast 1 of each required char
             let regex = [/[A-Z]/ , /[0-9]/ , /[!@#$%^&*]/]

             for(const exp of regex) {
                if(isvalid) {
                    isvalid = exp.test(password)
                }

                else {
                    setIsValidPass(false)
                    console.log("password must contain 1 of each valid characters!!!")
                    return false
                }
             }





             return isvalid
        }
        
        
       const validateEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValidEmail = emailRegex.test(email);

        if(!isValidEmail) {
            setIsValidEmail(false)
            return false
        }

        setIsValidEmail(true)

        return true


       }
        
    ////send otvc to emial after is proven valid string

     

        
    
        
      


       // fetch backend

       if(validateEmail(email) && validateUserName(username) && validatePassword(password, confirmpassword) )  {
       
       // supabase client fetch temp code for email validate

       sendEmailVerificationCode(email) 




       const formData = new FormData()
       formData.append("username", username)
       formData.append("password", password)

    
     fetch('http://127.0.0.1:8000/Register', {
        method: "POST",
        body: formData
     }).then(resp => {
        if(!resp.ok) {
            throw new Error(resp.status)
        }
        return resp.json()
     }).then(data => {
        console.log(data.success_status)
        if(data.success_status) {
            setIsRegistering(false)
        }
     }).catch(err => {
        console.log(err)
       
     })

    }// check validted 

    }


    return (
        
       
    <div className="overlay">
     {isEnteringVerificationCode && <OtvcCodeComp otvc = {otvc}/>}
     
     <form onSubmit={handleSubmit}>
        
       

        <div className="sign-up-container">

            <button
                type="button"
                className="exit-button"
                onClick={() => setIsRegistering(false)}
            >
                X
            </button>

            <h3 className="title">Sign Up</h3>

            <div className="row1">
                <p className="input-label">UserName</p>

                {isValidUserName ? (
                    <input
                        type="text"
                        name="username"
                        value ="billytester"
                        className="username-input"
                        placeholder="username...."
                         readOnly ={true}
                    />
                ) : (
                    <input
                        type="text"
                        name="username"
                        className="username-input-invalid"
                        placeholder="must be at least 8 characters..."
                         readOnly ={true}
                    />
                )}
            </div>


            <div className="row2">
                <p className="input-label">Password</p>

                {isPassMatch ? (
                    <div className="password-input-wrapper">

                        <input
                            type = {showPassword ? "text" : "password"}
                            name="password"
                            value = "Volgin2300!"
                            className="password-input"
                            placeholder="password...."
                             readOnly ={true}
                        />

                        <img
                            className="eye-ball-img"
                            src="/src/assets/eye-ball.png"
                            alt="Show password"
                             onClick={() => setShowPassword(!showPassword)}
                        />

                    </div>
                ) : (
                    <input
                        type="text"
                        name="password"
                        className="password-input-invalid"
                        placeholder="passwords don't match"
                         readOnly ={true}
                    />
                )}
            </div>


            <div className="row3">
                <p className="input-label">Confirm Password</p>
              
                <div className="password-input-wrapper">
                <input
                     type = {showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    value = "Volgin2300!"
                    className="confirm-password-input"
                    placeholder="confirm password"
                    readOnly ={true}
                />
                  <img
            className="eye-ball-img"
            src="/src/assets/eye-ball.png"
            alt="Show confirm password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
            </div>
        </div>


        <div className = "row4">
            <p className ="Email">Email</p>
            <input
            type = "text"
            name = "email"
            value = "jacobms23@outlook.com"
            className="email-input"
            placeholder= {isValidEmail ?"enter email" : "invalid email format. try again.."} 
             readOnly ={true}
            >

            </input> 
        </div>

            <button
                type="submit"
                className="sign-up-button"
            >
                Submit
            </button>

        </div>
     </form>
    </div>


    )
}

export default RegisterComp