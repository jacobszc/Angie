import "./styles/SignUpComp.css"

function SignUpComp() {


    function handleSubmit(event) {

        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const confirmpassword = event.target.confirmpassword.value;
        
           const valdiated = (password, username, confirmpassword) => {
              let validity = true;
            if((password.length < 10) || (password != confirmpassword)) {
                validity = false
                return validity
            }
             
            const re = [/[A-Z]/ , /[0-9]/ , /[!@#$%^&*]/ ];
            

            for(const exp of re) {
               if(validity) {
                validity = exp.test(password)
                         }
                else {
                    
                    return false
                }
               }

           if(username.length < 8) {
            return false
           }

           return validity

         
        }

       console.log(valdiated(password, username, confirmpassword))


       // fetch backend

       if(valdiated) {

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
              <input type = "text" name = "username" className = "username-input" placeholder="username...."></input>
              </div>
              
              
              <div className ="row2">
              <p className = "password-label">Password</p>
              <input type = "text" name = "password" className = "password-input" placeholder="password...."></input>
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

export default SignUpComp;