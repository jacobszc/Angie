import "./styles/RegisterComp.css"
import { useState } from "react";

function RegisterComp() {

     const [isValidUserName, setIsValidUserName] = useState(true)
     const [isvalidPass, setIsValidPass] = useState(true)
     const [isPassMatch, setIsPassMatch] = useState(true)
     
      

    function handleSubmit(event) {
        
        
        event.preventDefault();
         
        const username = event.target.username.value
        const password = event.target.password.value
        const confirmpassword = event.target.confirmpassword.value
        
        event.target.username.value = ""
        event.target.password.value = ""
        event.target.confirmpassword.value = ""
        
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
        
        
        
        
        
        
      


       // fetch backend

       if(validateUserName(username) && validatePassword(password, confirmpassword)) {
       
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
        return resp.text()
     }).then(data => {
        console.log(data)
     }).catch(err => {
        console.log(err)
       
     })

    }// check validted 

    }


    return (
        
        <form onSubmit = {handleSubmit}>
        <div className = "overlay">
            
            <div className ="sign-up-container">
            
             <h3 className = "title">Sign Up</h3>

            <div className = "row1">
             <p className = "username-label">UserName</p>
              { isValidUserName ? <input type = "text" name = "username" className = "username-input" placeholder="username...."></input> : <input type = "text" name = "username" className = "username-input-invalid"  placeholder=" must be atleast 8 characters..."></input>}
              </div>
              
              
              <div className ="row2">
              <p className = "password-label">Password</p>
              {isPassMatch ? <input type = "text" name = "password" className = "password-input" placeholder="password...."></input> : <input type = "text" name = "password" className = "password-input-invalid" placeholder="passwords dont match"></input> }
              </div>
              

              <div className = "row3">
              <p className = "confirm-password-label">Confirm Password</p>
              <input type = "text" name = "confirmpassword" className = "confirm-password-input" placeholder="confirm-password"></input>
              </div>
             
             
             <button type ="submit" className = "sign-up-button">submit</button>
              
            </div>
            

        </div>
        </form>
    )
}

export default RegisterComp;