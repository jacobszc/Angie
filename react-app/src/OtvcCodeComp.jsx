import "./styles/OtvcCodeComp.css"
import { useState, useRef, use } from "react";
import sendEmailVerificationCode from "./utils/otvc";
function OtvcCodeComp({setSendNewOtvc, setOtvc, otvc,  setOtvcVerfied, setIsEnteringVerificationCode, currentEmail}) {
    const [digit, setDigit] = useState('');
     const input1 = useRef(null);
     const input2 = useRef(null);
     const input3 = useRef(null);
     const input4 = useRef(null);
     const input5 = useRef(null);
     const input6 = useRef(null);
     

     
      
     const [otvcPair, setOtvcPair] = useState({})


     async function handleSendNewCode(event) {

        const resendButton = event.target

        resendButton.disabled = true

        console.log("-----++++----", resendButton)

        


        setTimeout(() => {
          resendButton.disabled = false
         }, 10000)

         const data = await sendEmailVerificationCode(currentEmail.current)

         if(data.sent_success === true) {
            setOtvc(data.otvc) // now otvc should be set to new code and everything else should fall in line
         }

         if(data.sent_success === false) {
            console.log("error sending new code")
            return
         }


         return
         
        
         


     }
      

     
function handleSubmit(event) {

        event.preventDefault()

        

        const str = `${input1.current.value}${input2.current.value}${input3.current.value}${input4.current.value}${input5.current.value}${input6.current.value}`

        const userSubmittedOTVC = parseInt(str, 10);

        console.log(userSubmittedOTVC)

        console.log("-->", otvc)

        const OTVCPair = {
           
            "gen_otvc" : otvc,
            "userSubmittedOTVC" : userSubmittedOTVC

        }

        console.log(typeof(otvc) , typeof(userSubmittedOTVC))

        

        
        fetch(`http://127.0.0.1:8000/check_verification_code/${JSON.stringify(OTVCPair)}`)
        .then(resp => {
            if(!resp.ok) {
                throw new Error(resp.status)
            }
            return resp.json()
        }).then(data => {
            if(data.verified === true) {

                console.log("treterte",data)
                 setOtvcVerfied(true)
                 setIsEnteringVerificationCode(false)
                
            }

            else{
                 setOtvcVerfied(false)
                 setIsEnteringVerificationCode(false)
            }
            

        }).catch(err =>{
            console.log(err)
        })
     }

    function handleChange(currentInput, nextInput) {

        
         const reg = /^[0-9]?$/
        const entry = currentInput.current.value

       

        if(!reg.test(entry)) {
            
           currentInput.current.value = ""
           

        }

        else {

        nextInput.current.focus()
        }


    }

    return (
        <div className="overlay">
            
        <div className = "otvc-container">
            <p  className="exit-button" onClick={() => setIsEnteringVerificationCode(false)}>X</p>
            <p className = "otvc-title">Enter 6-digit authentication code </p>
            <button name = "resend" className="resend" onClick={handleSendNewCode}>didnt get code? click to resend.</button>
            <form className = "otvc-form" onSubmit={handleSubmit}>
            <input   ref={input1} className="otvc-input" name = "input-1" type="text" maxLength="1" pattern="[0-9]" onChange={() => handleChange(input1, input2)}  />
            <input   ref={input2} className="otvc-input" name = "input-2" type="text" maxLength="1" pattern="[0-9]" onChange={() => handleChange(input2,input3)}  />
            <input   ref={input3} className="otvc-input" name = "input-3" type="text" maxLength="1" pattern="[0-9]"  onChange={() => handleChange(input3,input4)}   />
            <input   ref={input4} className="otvc-input" name = "input-4" type="text" maxLength="1" pattern="[0-9]"  onChange={() => handleChange(input4, input5)} />
            <input   ref={input5} className="otvc-input" name = "input-5" type="text" maxLength="1" pattern="[0-9]"  onChange={() => handleChange(input5,input6)} />
            <input   ref={input6} className="otvc-input" name = "input-6" type="text" maxLength="1" pattern="[0-9]"  onChange={() => handleChange(input6,input6)} />

            <input className ="verify-otvc-button" type = "submit" value="Verify"></input>
            
            </form>
        </div>
        
        </div>
    )
}

export default OtvcCodeComp;