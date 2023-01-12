import "../styles/Sidebar.scss";
import { RxCalendar } from "react-icons/rx";
import MenuOption from "./MenuOption";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <MenuOption icon={<RxCalendar size={"20px"} />} option={"Scheduler"} />
    </div>
  );
};

export default Sidebar;
