import "./styles/SignUpComp.css"

function SignUpComp() {



    return (
        
        
        <div className = "overlay">
            
            <div className ="sign-up-container">
            
            <h3 className = "title">Sign Up</h3>

            <div className = "row1">
             <p className = "username-label">UserName</p>
              <input type = "text" name = "username" className = "username-input" placeholder="username...."></input>
              </div>
              
              
              <div className ="row2">
              <p className = "password-label">Password</p>
              <input type = "text" name = "password" className = "password-input" placeholder="password...."></input>
              </div>
              

              <div className = "row3">
              <p className = "confirm-password-label">Confirm Password</p>
              <input type = "text" name = "confirm-password" className = "confirm-password-input" placeholder="confirm-password"></input>
              </div>
             
             
             <button type ="submit" className = "sign-up-button">submit</button>
               
            </div>

        </div>
    )
}

export default SignUpComp;