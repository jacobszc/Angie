import "./styles/ContactUsComp.css"
import monkey from "./assets/monkey.png"
function ContactUsComp() {
    

    function handleSubmit(event) {

        event.preventDefault();
        
        
        const form = event.target; 
        
        const name = form.name.value
        const email = form.email.value
        const phone = form.phone.value
        const subject = form.subject.value
        const message = form.message.value
        
        
        const formData = new FormData();
        formData.append("name" , name)
        formData.append("email" , email)
        formData.append("phone" , phone)
        formData.append("subject" , subject)
        formData.append("message" , message)


        fetch("http://127.0.0.1:8000/SubmitContact", {
            method : "POST",
            body: formData
        }).then(resp => {
            if(!resp.ok) {
               throw new Error(resp.status)
            }

            return resp.text()
        }).then(data => {
            console.log(data)
        }).catch(err=> {
            console.log(err)
        })
        

      
         console.log(formData.get("message"))
    }

return (

    <div className = "contact-us-container">
        <form className = "input-container"  type ="input" name = "contact-us-form" onSubmit={handleSubmit}>
      
       
        <input type="text" name ="name" placeholder="Enter Your Name..." />
        <input type="text" name="email" placeholder="Enter email" />
        <input type="text" name="phone"  placeholder="Enter Phone #"/>
        <input type="text" name="subject" placeholder="Enter Subject" />
        <textarea autoCorrect="on" name ="message" className ="message-area" rows= "50" columns = "100" placeholder="Enter Message Here"></textarea>
        <button type = "submit" className = "contact-us-button" name = "contact-us-button" >Submit</button>
        
       
       </form>

       <div className = "image-container">

        <div className = "image-frame">

         
            
        </div>


       </div>


    </div>
)

}

export default ContactUsComp