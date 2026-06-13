import "./styles/TitleComp.css"


function TitleComp() {




    return (

        <div className = "title-container" >
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sofia"></link>

    
    <img className = "title-img" src = "src/assets/birds.png" alt = "landscape"></img>
     
     <div className = "title-words">
        
        <h2 style = {{textAlign: "center",width: "70%",fontFamily: "Sofia", borderRadius: "8px"}}>Martins Feathers and Furs </h2>
    </div>


   </div>
    )
}

export default TitleComp;