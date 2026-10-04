import "./styles/RegisterComp.css"
import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import OtvcCodeComp from './OtvcCodeComp';

function RegisterComp({setIsRegistering, setUser, setIsSignedIn}) {

    const [isValidUserName, setIsValidUserName] = useState(true)
    const [isvalidPass, setIsValidPass] = useState(true)
    const [isPassMatch, setIsPassMatch] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true)
    const[isEnteringVerificationCode ,setIsEnteringVerificationCode] = useState(false)
    
    const [otvcVerfied, setOtvcVerfied] = useState(false) 
    const newUserData = useRef([])
    const otvc = useRef(0)
    const firstRender = useRef(true)
/////////////////////////////////////////////////////////////////////////////////////////

    async function RegisterNewUser() {

        const formData = new FormData()
       formData.append("username", newUserData.current[0])
       formData.append("email", newUserData.current[1])
       formData.append("password", newUserData.current[2])
       
       console.log(newUserData.current[0])
    
     fetch('http://127.0.0.1:8000/Register', {
        method: "POST",
        body: formData
     }).then(resp => {
        if(!resp.ok) {
            throw new Error(resp.status)
        }
        return resp.text()
     }).then(data => {
        console.log(data)
     }).catch(err => {
        console.log(err)
       
     })

        
    


    }



async function CheckIfUserAndEmailAvalible(email, username) {
          const userEmailJsonObj = {
            "email" : email,
            "username" : username
          }

        let x = false

        try {

        const resp = await fetch(`http://127.0.0.1:8000/check_if_username_email_avalible/${JSON.stringify(userEmailJsonObj)}`)
         
        if(!resp.ok) {
            throw new Error(resp.status)
        }
        const data = await resp.json()

        if(data.success_status === true) {
            
             x = true
        }
    }
        
        catch(err) {

            console.log("EEERRRPP EEERRRPPP ERRRORRR!!! " ,err)

        }

        return x
    } /// end CheckIfUserAndEmailAvalible
 
    ///////////////////////////////////////////////////////////////////////////////////////
    
    async function sendEmailVerificationCode(email) {

        console.log(email)
      
    try {

        const resp = await fetch(`http://127.0.0.1:8000/send_verification_code/${JSON.stringify(email)}`)
        
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
    
    
 ////////////////////////////////////////////////////////////////////////////////////////////   
    

    function validateUserName(username)  {
           
            
           if(username.length < 8) {
            console.log("username is: ",  username.length , " characters which is not valid!")
            setIsValidUserName(false)
            return false
           }


           console.log("username is: ",  username.length , " characters which is valid!")
           return true
         
        } 

    /////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    function validatePassword(password, confirmpassword)  {
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

    function validateEmail(email)  {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValidEmail = emailRegex.test(email);

        

        if(!isValidEmail) {
            setIsValidEmail(false)
            return false
        }

       

       

        return true


       }

    /////////////////////////////////////////////////////////////////////////////////////////////
       



    /////////////////////////////////////////////////////////////////////////////////////////////

    async function handleSubmit(event) {
        
        
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password.value
        const confirmpassword = event.target.confirmpassword.value
        const email = event.target.email.value
        event.target.username.value = ""
        event.target.password.value = ""
        event.target.confirmpassword.value = ""
        event.target.email.value =""
        
       //////////////////////////////////////////////////////////////////////////


      //1.) run basic validation checks for length and required characters 
    if(!validateEmail(email) || !validatePassword(password,  confirmpassword) || !validateUserName(username)) {
        console.log("failed string compatiblty checks")
        return
    }
     //2.) if all vlaid format, well fetch the db and see if the username and emial are both avalible
    if(!CheckIfUserAndEmailAvalible(email, username)) {
         console.log("failed email and uername avali checks")
        return

    }

    /// here well premtivly store the new user info in some global satate so later we can submit it after scope is left and empty it later for safety
 

    newUserData.current.push(username, email, password)
    
        
    ////send otvc to emial after is proven valid string
    console.log(`sending emial verification code now.... to${email} `)
    sendEmailVerificationCode(email) 
    
     
    }


    useEffect(() => {

        if(firstRender.current) {
             firstRender.current = false
            return
        }
        
        console.log(`about to register new user ${newUserData.current[0]} with password ${newUserData.current[1]} and email  ${newUserData.current[2]}` )
        
        const register = async() => {

             await RegisterNewUser()

             console.log("done awaiting register and username is: ",newUserData.current[0])

        }

        
        console.log("new user registered")
///////////////////////////////// sign in after register awaited/////
        const signin = async() => {

             const formData = new FormData()
        formData.append("username", newUserData.current[0])
        formData.append("password", newUserData.current[2])

        await fetch( "http://127.0.0.1:8000/SignIn", {
            method: "POST",
            body: formData
            
        }).then(resp => {
            if(!resp.ok) {
                throw new Error(resp.status)
            }

            return resp.json()
        }).then(data => {
            console.log(data)
           /////////////////////////////// should not need admin check as new user will never be admin right after regsiter
           // admin has to be set manualy by me

        //    if(data.role === "admin") {
            
        //     setUser(username)
        //     console.log("succesful log in! username set to: ", username)
        //     setIsAdmin(true)
        //     setIsSignedIn(true)
        //     setSigningIn(false)
            
           
        //   }

        
            console.log("setting state username to: " , newUserData.current[0])
            setUser(newUserData.current[0])
            setIsSignedIn(true)
            //setCart(data.cart) //////////////////////////// <------ new user shouldnt have cart
            
            //setIsStripeApproved(data.stripe_approved)
            //setCartQuantity(data.cart.length)
            console.log("succesful log in! username set to: ", newUserData.current[0] )
           // setSigningIn(false)
            
        



            // set some state vars
        }).catch(err => {
            console.log(err)
        })


        }
       
       
       register()
       signin()
       console.log("new user signed in", newUserData.current[0])

       setIsEnteringVerificationCode(false)
       setIsRegistering(false)

        

    },[otvcVerfied])

    if(otvcVerfied) {
        console.log("code verified!")
        /// all good and registered so we can jsut sign in right away
        
       

       



       
        
    }

      
    


    return (
        
       
    <div className="overlay">
     {isEnteringVerificationCode && <OtvcCodeComp otvc = {otvc}  setOtvcVerfied = {setOtvcVerfied}/>}
     
     <form onSubmit={handleSubmit}>
        
       

        <div className="sign-up-container">

            <button
                type="button"
                className="exit-button"
                onClick={() => setIsRegistering(false)}
            >
                X
            </button>

            <h3 className="title">Register</h3>

            <div className="row1">
                <p className="input-label">UserName</p>

                 <input
                    autoComplete="off"
                    type="text"
                    name="username"
                    className="username-input"
                    placeholder= {isValidUserName ? "username...." : "invalid username..."}
                         
                    />
                
            </div>


            <div className="row2">
                <p className="input-label">Password</p>

                {isPassMatch ? (
                    <div className="password-input-wrapper">

                        <input
                            type = {showPassword ? "text" : "password"}
                            name="password"
                             autoComplete="off"
                            className="password-input"
                            placeholder="password...."
                             
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
                        
                    />
                )}
            </div>


            <div className="row3">
                <p className="input-label">Confirm Password</p>
              
                <div className="password-input-wrapper">
                <input
                     type = {showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    
                    className="confirm-password-input"
                    placeholder="confirm password"
                   
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
           
            className="email-input"
            placeholder= {isValidEmail ?"enter email" : "invalid email format. try again.."} 
            
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