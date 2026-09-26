import "./styles/OtvcCodeComp.css"
import { useState, useRef } from "react";

function OtvcCodeComp({otvc}) {
    const [digit, setDigit] = useState('');
     const input1 = useRef(null);
     const input2 = useRef(null);
     const input3 = useRef(null);
     const input4 = useRef(null);
     const input5 = useRef(null);
     const input6 = useRef(null);
      
     const [otvcPair, setOtvcPair] = useState({})
    
     
     function handleSubmit(event) {

        event.preventDefault()

        const str = `${input1.current.value}${input2.current.value}${input3.current.value}${input4.current.value}${input5.current.value}${input6.current.value}`

        const userSubmittedOTVC = parseInt(str, 10);

        console.log(userSubmittedOTVC)

        console.log("-->", otvc.current)

        const OTVCPair = {
           
            "gen_otvc" : otvc.current,
            "userSubmittedOTVC" : userSubmittedOTVC

        }

        console.log(typeof(otvc.current) , typeof(userSubmittedOTVC))

        

        
        fetch(`http://127.0.0.1:8000/check_verification_code/${JSON.stringify(OTVCPair)}`)
        .then(resp => {
            if(!resp.ok) {
                throw new Error(resp.status)
            }
            return resp.json()
        }).then(data => {
            console.log(data)
            

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
            <p className = "otvc-title">Enter 6-digit authentication code </p>
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