import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
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
  handleSearchTitle,
  closeSearch,
}) => {
  return (
    <div
      className={`search-input-container ${
        isFromSearchAppointments ? `search-appointments-input-container` : ""
      }`}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          if (!searchInput) return;
          isFromWeather && handleSearchLocation(searchInput);
          isFromWeather && onSearch(true);
          handleSearchResults(true);
        }
      }}
    >
      <SlMagnifier
        title="Search"
        className="search-icon"
        onClick={() => {
          if (!searchInput) return;
          isFromWeather && handleSearchLocation(searchInput);
          isFromWeather && onSearch();
          handleSearchResults(true);
        }}
      />
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          isFromWeather && handleSearchInput(e.target.value);
          isFromSearchAppointments && handleSearchTitle(e.target.value);
        }}
        spellCheck="false"
      />
      {searchInput && (
        <MdOutlineClose
          className="close-icon"
          onClick={closeSearch}
          title="Clear"
        />
      )}
    </div>
  );
};

export default SearchButton;
