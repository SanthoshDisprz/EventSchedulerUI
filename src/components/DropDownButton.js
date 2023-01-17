import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../styles/DropDownButton.scss";
// //dropdown button for changing analytics and insights data duration
// const DropDownButton = ({ option, onChange }) => {
//   return (
//     <select value={option} onChange={onChange} className="drop-down-button">
//       <option value="Week">Current Week</option>
//       <option value="Month">Current Month</option>
//       <option value="Year">Current Year</option>
//     </select>
//   );
// };

// export default DropDownButton;

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
