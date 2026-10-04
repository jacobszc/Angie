

  function drawMailboxOnConfirm() {


    let anim = document.createElement("div");
           let envelope = document.createElement("img")
    
           envelope.src = "src/assets/mail_box_open.png"
           envelope.style.width = "100%"
           envelope.style.height = "100%"
    
           
    
           anim.style.width = "50px";
           anim.style.height = "50px"
           anim.style.position = "fixed";
           anim.style.left = "50%"
           anim.style.top ="50%"
            
           anim.style.zIndex = "99999";
           document.body.appendChild(anim)
           anim.appendChild(envelope)
    
           setTimeout(()=> {
            envelope.src = "src/assets/mail_box_closed.png"
           },1000)
    
           setTimeout(()=> {
            anim.remove()
           },2000)
}




 function drawThumbsUpOnAddtoCart(event) {


    const rect = event.currentTarget.getBoundingClientRect();

     const button = event.currentTarget
      button.disabled = true
        console.log("event: " ,event.currentTarget)
        console.log(rect.left, rect.top)
        let anim = document.createElement("div");
        let text = document.createElement("text")
          const body = document.body


        text.textContent = "hello"
        text.style.display = "flex"
        text.style.alignContent = "center"
        text.style.justifyContent = "center"


        let img = document.createElement("img")

        img.src = "src/assets/thumbs-up.png"
        img.style.width = "100%"
        img.style.height = "100%"

      
       
      
         anim.style.position = "fixed";
         anim.style.width = "50px";
         anim.style.height = "50px";
         anim.style.left = `${(rect.right) - 40}px`;
         anim.style.top = `${(rect.top) - 40}px`;

         
         anim.style.zIndex = "99999";
           body.appendChild(anim)
         anim.appendChild(img)

         img.style.animation = "rotate 0.5s"
        

         setTimeout(() => {
          anim.remove()
         }, 500)

         setTimeout(() => {
          button.disabled = false
         }, 2000)
 

}


export default {

     drawThumbsUpOnAddtoCart, drawMailboxOnConfirm

}