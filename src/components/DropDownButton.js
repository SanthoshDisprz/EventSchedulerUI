import "../styles/DropDownButton.scss";
//dropdown button for changing analytics and insights data duration
const DropDownButton = ({ option, onChange }) => {
  return (
    <select value={option} onChange={onChange} className="drop-down-button">
      <option value="Week">Current Week</option>
      <option value="Month">Current Month</option>
      <option value="Year">Current Year</option>    
    </select>
  );
};

export default DropDownButton;
