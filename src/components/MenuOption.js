import "../styles/MenuOption.scss";
const MenuOption = ({ icon, option }) => {
  return (
    <div className="menu-option-container">
      <div className="menu-icon">{icon}</div>
      <div className="menu-option">{option}</div>
    </div>
  );
};

export default MenuOption;
