

function ForgotPasswordComp() {

  function handleSendPasswordReset(event) {

    event.preventDefault()

   console.log(event.target)


   const forgotPassDto = {
    username : `${event.target.username.value}`,
    email : `${event.target.email.value}`
   }


   fetch(`http://127.0.0.1:8000/sendPasswordReset/${JSON.stringify(forgotPassDto)}`)
   .then(resp => {
    if(!resp.ok) {
        throw new Error(resp.status)
    }
      return resp.json()
   }).then(data => {
    console.log(data)
   }).catch(err => {
    console.log(err)
   })
  }


    return (

        <div  
                className="bg-white p-4 rounded shadow"
                style={{ width: "70%", maxWidth: "400px" }}> 
                    <button className = "close-button">x</button>
                    
                    <h2 className="text-center mb-4">Ooops.. Forgot Password?</h2>
                    <form  type ="submit" onSubmit={handleSendPasswordReset}>
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
                           Email
                        </label>

                        <input
                            name = "email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                         </div>

                   
                        <div className="d-grid mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            
                        >
                            Send Password Reset
                        </button>
                        </div>

                    </form>

               
                    <div className="text-center">

                    

                    

                </div> {/*end of bottom most container div */}

                
                

            </div> 
            
    )
}

export default ForgotPasswordComp