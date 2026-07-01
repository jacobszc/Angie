import "./styles/SignInComp.css"

function SignInComp({setIsAdmin, setSigningIn, setUser, setIsSignedIn}) {


     function handleSubmit(event) {

        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password = form.password.value;
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        console.log(username, " ", password)

        const SignIn = async () => {
        
        try{
          const resp = await fetch('http://127.0.0.1:8000/SignIn' , {
            method: "POST",
            body: formData
          })

          const data = await resp.json()
        

          if(!resp.ok) {
            throw new Error("error caught: ",resp.stauts)
          }

          if(data === "admin") {
            
            setUser(username)
            console.log("succesful log in! username set to: ", username)
            setIsAdmin(true)
            setIsSignedIn(true)
            setSigningIn(false)
           
          }
          else{
            setUser(username)
            setIsSignedIn(true)
            console.log("succesful log in! username set to: ", username)
            setSigningIn(false)
            
        }
           
          console.log(data)
        }

        catch(err) {
          console.log(err)
        }


    }

    SignIn()
    
    
    }

    function handleClick() {
        setSigningIn(false)
    }



    return (
         
         

        <div className="overlay"> {/* container for sign in box */}
                <div
                className="bg-white p-4 rounded shadow"
                style={{ width: "70%", maxWidth: "400px" }}> 
                    <button className = "close-button" onClick ={handleClick}>x</button>
                    
                    <h2 className="text-center mb-4">Sign In</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>

                        <input
                            name = "username"
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                        />
                        </div>

                        <div className="mb-4">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            name = "password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        />
                         </div>

                   
                        <div className="d-grid mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Sign In
                        </button>
                        </div>

                    </form>

               
                    <div className="text-center">

                    <div className="mb-2">
                        <a href="#">
                            Forgot Password?
                        </a>
                    </div>

                    <div>
                        Don't have an account?{" "}
                        <a href="#">
                            Sign Up
                        </a>
                    </div>

                    

                </div> {/*end of bottom most container div */}

                
                

            </div> 
            
           
        
       
   </div>

        
   
    )
}

export default SignInComp