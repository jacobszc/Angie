async function sendEmailVerificationCode(email) {

        console.log(email)
      
    try {

        const resp = await fetch(`http://127.0.0.1:8000/send_verification_code/${JSON.stringify(email)}`)
        
        const data = await resp.json()
        
        if(data.sent_success === true && data.otvc) {

            // setIsEnteringVerificationCode(true)
            // otvc.current = data.otvc

            return data 
          
        }
     
    }

    catch(error) {
           console.log(error)
           return {"sent_sucess" : false, "otvc" : null}
        
    }
       
    
       
};

export default sendEmailVerificationCode