import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import "../styles/SearchButton.scss";
//location search component for weather
const SearchButton = ({
  isFromWeather,
  handleSearchLocation,
  searchInput,
  handleSearchInput,
  onSearch,
  placeholder,
  isFromSearchAppointments,
  handleSearchResults,
  handleSearchTitle
}) => {
  // const [searchLocation, setSearchLocation] = useState("")
  return (
    <div
      className={`search-input-container ${isFromSearchAppointments? `search-appointments-input-container`:""}`}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          if (!searchInput) return;
          isFromWeather&&handleSearchLocation(searchInput);
          isFromWeather&&onSearch(true);
          handleSearchResults(true)
        }
      }}
    >
            <SlMagnifier
        className="search-icon"
        onClick={() => {
          if (!searchInput) return;
          isFromWeather&&handleSearchLocation(searchInput);
          isFromWeather&&onSearch();
          handleSearchResults(true)
        }}    />
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          isFromWeather&&handleSearchInput(e.target.value);
          isFromSearchAppointments&&handleSearchTitle(e.target.value);
        }}
        spellCheck="false"
      />

  
    </div>
  );
};

export default SearchButton;
