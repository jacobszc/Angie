import { useEffect } from "react"
import "./styles/SuccessPageComp.css"

function SuccessPageComp({setRenderPaymentSuccessComp, TIME}) {


      

    // useEffect(() => {

    //      setTimeout(() => {
         
    //         setRenderPaymentSuccessComp(false)

    //     }, TIME);

    // }, []);
    
    
    
    return (
        <div className ="success-page-container">
            <div className= "success-text-container">
                <h2 className ="success-text">Purchace Successful!</h2>
            </div>
        </div>
    )
}

export default SuccessPageComp