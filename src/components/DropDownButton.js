import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../styles/DropDownButton.scss";

const DropdownButton = ({ options, selectedOption, handleSelectedOption, isFromAppointmentsPage }) => {
  const [canShowMoreOptions, setCanShowMoreOptions] = useState(false);

  return (
    <div className={`dropdown-container ${isFromAppointmentsPage?`appointments-view-dropdown`:""}`} onClick={() => setCanShowMoreOptions(!canShowMoreOptions)}>
      <div
        className="dropdown-button"     
      >
        {selectedOption}
        {canShowMoreOptions?<FiChevronUp className="less-options-icon"/>:<FiChevronDown className="more-options-icon"/>}
      </div>
      <div className={`more-options ${canShowMoreOptions?`active`:""}`}>
        {options.map(option=><div className="dropdown-option" onClick={()=>{handleSelectedOption(option);setCanShowMoreOptions(!canShowMoreOptions)}}>{option}</div>)}
      </div>
    </div>
  );
};

export default DropdownButton;
