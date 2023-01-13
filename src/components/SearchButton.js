import { useState } from "react";
import {FaSearch} from "react-icons/fa"
import { SlMagnifier } from "react-icons/sl";
import "../styles/SearchButton.scss"
//location search component for weather
const SearchButton = ({ handleSearchLocation, handleSearchResult, handleCurrentLocation, onSearch}) => {
  const [searchLocation, setSearchLocation] = useState("")
    return ( 
    <div className="search-input-container" onKeyUp={(e)=>{if(e.key==="Enter"){if(!searchLocation) return;handleSearchLocation(searchLocation); onSearch(true)}}}>
      <input className="search-input" type="text" placeholder='Search City' value={searchLocation} onChange={(e)=>{setSearchLocation(e.target.value) }} spellCheck="false"/>
      <SlMagnifier className="search-icon" onClick={()=>{if(!searchLocation) return;handleSearchLocation(searchLocation); onSearch()}}/>
    </div>
 );
}
 
export default SearchButton;