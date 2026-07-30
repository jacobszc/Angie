import "./styles/FilterComp.css"

function FilterComp({setIsFiltering, setFilter, DEFAULT_FILTER}) {

    function filterListings(event) {
    
          event.preventDefault();
    
          const mappings = {
            0 : "cat",
            1 : "dog",
            2 : "bird",
            3 : "reptile",
            4 : "fish"
          }
            
          const newfilter = []
         
           
          console.log(event.currentTarget.elements)
    
          const checkList = Array.from(event.currentTarget.elements)
    
          
          
          
          
          
          checkList.map((element, index) => {
    
            if(element.type === "checkbox" && element.checked) {
               
              newfilter.push(mappings[index])
              
            }
          })
    
           
          if(newfilter.length > 0) {
          setFilter(newfilter)
          }
          else {
            setFilter(DEFAULT_FILTER)
            
          }
        
          
          setIsFiltering(false)
    
          
          
    
          
        }
        




    return (

       <div className = "filter-container">
      <div className = "filter-custom-overlay">
        <div className ="check-box-container">
          <h2 className ="filter-title">Filter By Type...</h2>
          
            <form onSubmit={filterListings}>
                <div className = "checkbox-row-1">
                  <label htmlFor ="checkbox-1">cat</label>
                  <input className ="checkbox-1" type = "checkbox"></input>
                </div>
                <div className = "checkbox-row-2">
                  <label htmlFor ="checkbox-2">dog</label>
                  <input className ="checkbox-2" type = "checkbox"></input>
                </div>
                <div className = "checkbox-row-3">
                  <label htmlFor ="checkbox-3">bird</label>
                  <input className ="checkbox-3" type = "checkbox"></input>
                </div>
                <div className = "checkbox-row-4">
                  <label htmlFor ="checkbox-4">reptile</label>
                  <input className ="checkbox-4" type = "checkbox"></input>
                </div>
                <div className = "checkbox-row-5">
                  <label htmlFor ="checkbox-5">fish</label>
                  <input className ="checkbox-5" type = "checkbox"></input>
                  
                </div>
                <div className = "filter-button-container">
                <button className = "submit-filters-button "type="submit">apply</button>
                <button className = "submit-filters-button "type="button" onClick={() =>setIsFiltering(false)}>cancel</button>
                </div>
                </form>

                
             </div>


       </div>
       </div>

    )
}

export default FilterComp