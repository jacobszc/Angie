import { useEffect } from "react"
import "./styles/SuccessPageComp.css"

function SuccessPageComp({setRenderPaymentSuccessComp}) {
      
      

    
      setTimeout(()=> {
         setRenderPaymentSuccessComp(false)
      },3000)



    
    
    
    return (
        <div className = "overlay">
        <div className ="success-page-container">
            <div className= "success-text-container">
                <h2 className ="success-text">Purchace Successful!</h2>
            </div>
        </div>
        </div>
    )
}

export default SuccessPageComp