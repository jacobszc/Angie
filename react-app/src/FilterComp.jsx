import "./styles/FilterComp.css"
import { useEffect, useState, useRef } from "react";


function FilterComp({setIsFiltering, setFilter, filter, DEFAULT_FILTER}) {

  const [numberAppliedFilters, setnumberAppliedFilters] = useState(0) 
  const input1ref = useRef(null)
  const input2ref = useRef(null)
  const input3ref = useRef(null)
  const input4ref = useRef(null)
  const input5ref = useRef(null)

  

  
  function translateSessionStorageString(currentRef) {

    console.log("translateSessionStorageString called!")

    console.log(currentRef)

    //check session storage for ke with currentRef.name and translate string value to boolean

    const truthValueString = sessionStorage.getItem(currentRef.current.name)

    if(truthValueString === "true") {
      
    }

    if(truthValueString === "false") {
     return false
    }
    

  
  }
  
  
  function filterListings() {

    return
  }


  function handleCheck(event) {

    console.log("handleCheck called!")

    if(event.target.checked) {
      setnumberAppliedFilters(numberAppliedFilters +1)
      sessionStorage.setItem(`${event.target.name}` , "true")
    }

    if(!event.target.checked) {
       
      if(numberAppliedFilters >=0 ) {
      setnumberAppliedFilters(numberAppliedFilters -1)

      }
       sessionStorage.setItem(`${event.target.name}` , "false")
    }

    console.log(sessionStorage)


    ////////////////////////////////////

    


  }


  useEffect(() => {

    // load checkbox inital states from session storage on mount

    // for(const member in inputRefArray) {
       
    //   console.log(member)

    // }

    input1ref.current.checked = sessionStorage.getItem("cat")
    input2ref.current.checked = sessionStorage.getItem("dog")
    input3ref.current.checked = sessionStorage.getItem("bird")
    input4ref.current.checked = sessionStorage.getItem("reptile")
    input5ref.current.checked = sessionStorage.getItem("fish")



  },[])

   
  
  
  
  return (

       
      <div className = "filter-custom-overlay">
        <div className ="check-box-container">
          <h2 className ="filter-title">Filter By Type...</h2>
          <button className = "exit-button" onClick={() => setIsFiltering(false)}>X</button>
          
            <form onSubmit={filterListings} className = "filter-form">
             <div className = "row-container">
                <div className = "checkbox-row-1">
                  <label htmlFor ="checkbox-1">cat</label>
                
                  <input  ref = {input1ref} name ="cat" className ="checkbox-1" type = "checkbox" onClick={(event) => {handleCheck(event); translateSessionStorageString(input1ref)} }   ></input>
                  
                </div>
                <div className = "checkbox-row-2">
                  <label htmlFor ="checkbox-2">dog</label>
                 
                  <input ref = {input2ref} name = "dog" className ="checkbox-2" type = "checkbox" onClick={(event) => {handleCheck(event); translateSessionStorageString(input2ref)} }  ></input>
                 
                </div>
                <div className = "checkbox-row-3">
                  <label htmlFor ="checkbox-3">bird</label>
                 
                  <input ref = {input3ref} name = "bird" className ="checkbox-3" type = "checkbox" onClick={(event) => {handleCheck(event); translateSessionStorageString(input3ref)} }  ></input>
                 
                </div>
                <div className = "checkbox-row-4">
                  <label htmlFor ="checkbox-4">reptile</label>
                 
                  <input ref = {input4ref} name = "reptile" className ="checkbox-4" type = "checkbox" onClick={(event) => {handleCheck(event); translateSessionStorageString(input4ref)} } ></input>
                
                </div>
                <div className = "checkbox-row-5">
                  <label htmlFor ="checkbox-5">fish</label>
                  
                  <input ref = {input5ref} name = "fish" className ="checkbox-5" type = "checkbox" onClick={(event) => {handleCheck(event); translateSessionStorageString(input5ref)} }  ></input>
                  
                </div>
                </div>
                <div className = "filter-button-container">
                
                <button className = "submit-filters-button "type="submit">Apply Filters ({numberAppliedFilters})</button>
                
                <button className = "remove-filters-button" >Remove all Filters</button>
                {/* <button className = "submit-filters-button "type="button" onClick={() =>setIsFiltering(false)}>cancel</button> */}
                </div>
                </form>

                
             </div>


       </div>
       

    )
}

export default FilterComp