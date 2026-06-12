import "./styles/TitleComp.css"

function TitleComp() {




    return (

        <div className = "title-container" >

    
    <img className = "title-img" src = "src/assets/birds.png" alt = "landscape"></img>
     
     <div className = "title-words">
        <h2 style = {{width: "70%",fontFamily: "ui-serif", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)" , backgroundColor: "hsl(151, 30%, 87%)" }}>Martins Feathers and Furs </h2>
    </div>


   </div>
    )
}

export default TitleComp;