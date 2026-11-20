import "./styles/FilterComp.css"
import { useEffect, useState } from "react";


function FilterComp({setIsFiltering, setFilter, filter, DEFAULT_FILTER}) {

  let numberAppliedFilters =0;
  
  const [appliedFilters, setAppliedFilters] = useState(0);

  

  
  function translateSessionStorageString(currentRef) {

    console.log("translateSessionStorageString called!")

    console.log(currentRef)

    //check session storage for ke with currentRef.name and translate string value to boolean

    const truthValueString = sessionStorage.getItem(currentRef.current.name)

    if(truthValueString === "true") {

      return true
      
    }

    if(truthValueString === "false") {
     return false
    }
    

  
  }
  
  
  function filterListings() {

    let returnFilter = [];

    for (const key of Object.keys(sessionStorage)) {

      if(sessionStorage[key] === true) {

      returnFilter.push(key)

      }
    }

    console.log("filter im sending back: " , returnFilter)

    setFilter(returnFilter)

     

    return
  }


  function handleUserClick(event) {

    console.log("handleUserClick called!")

    sessionStorage.setItem(event.target.name, String(event.target.checked));

    console.log( "swtich ---> ", event.target.checked);

    switch(event.target.checked) {

      

      case true: 
      console.log("made it in case 1")
      setAppliedFilters(appliedFilters + 1);
      break;

      case false:
      console.log("made it in case 2")
      if(appliedFilters >0) {
      setAppliedFilters(appliedFilters -1);
      break;
      }

    }

   
    console.log("---->" , sessionStorage)


    //////////////////////////////////

    


  }


  useEffect(() => {

    

    for(const member of Object.keys(sessionStorage)) {

    if(sessionStorage[member] === "true") {

     const ref = document.getElementById(member);
     ref.checked = true;



      numberAppliedFilters ++;
    }

    if(sessionStorage[member] === "false") {

      const ref = document.getElementById(member);
     ref.checked = false;

      if(numberAppliedFilters >0) {

      numberAppliedFilters --;
      }

      }
    
    
    

    }
    

   
  setAppliedFilters(numberAppliedFilters);

  console.log(numberAppliedFilters);


  },[])

   
  
  
  
  return (

       
      <div className = "filter-custom-overlay">
        <div className ="check-box-container">
          <h2 className ="filter-title">Filter By Type...</h2>
          <button className = "exit-button" onClick={() => setIsFiltering(false)}>X</button>
           <form>
           
             <div className = "row-container">
                <div className = "checkbox-row-1">
                  <label htmlFor ="checkbox-1">cat</label>
                
                  <input  id = "cat"  name ="cat" className ="checkbox-1" type = "checkbox" onClick={(event) => handleUserClick(event)}   ></input>
                  
                </div>
                <div className = "checkbox-row-2">
                  <label htmlFor ="checkbox-2">dog</label>
                 
                  <input id = "dog"  name = "dog" className ="checkbox-2" type = "checkbox" onClick={(event) => handleUserClick(event) }  ></input>
                 
                </div>
                <div className = "checkbox-row-3">
                  <label htmlFor ="checkbox-3">bird</label>
                 
                  <input id = "bird"  name = "bird" className ="checkbox-3" type = "checkbox" onClick={(event) => handleUserClick(event) }  ></input>
                 
                </div>
                <div className = "checkbox-row-4">
                  <label htmlFor ="checkbox-4">reptile</label>
                 
                  <input id = "reptile"  name = "reptile" className ="checkbox-4" type = "checkbox" onClick={(event) => handleUserClick(event) } ></input>
                
                </div>
                <div className = "checkbox-row-5">
                  <label htmlFor ="checkbox-5">fish</label>
                  
                  <input id = "fish"  name = "fish" className ="checkbox-5" type = "checkbox" onClick={(event) => handleUserClick(event) }  ></input>
                  
                </div>
                </div>
                <div className = "filter-button-container">
                
                <button className = "submit-filters-button" onClick={filterListings}>Apply Filters ({appliedFilters})</button>
                
                <button className = "remove-filters-button" >Remove all Filters</button>
                {/* <button className = "submit-filters-button "type="button" onClick={() =>setIsFiltering(false)}>cancel</button> */}
                </div>
               </form>

                
             </div>


       </div>
       

    )
}

export default FilterComp