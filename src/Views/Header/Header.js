import "../../styles/Header.scss";
import { FiChevronDown } from "react-icons/fi";
import userImage from "../../assets/user-image.jpg";
import SchedulerIcon from "../../assets/image (2).svg";
import SearchButton from "../../components/SearchButton";
//header component which will be having website's name and profile image
const Header = ({searchTitle, handleSearchTitle, onSearch}) => {
  return (
    <nav className="navbar">
      <div className="website-icon-name-container">
        <img src={SchedulerIcon} className="scheduler-icon" />
        <div className="website-name">Scheduler</div>
      </div>
      <div className="profile-container">
        <SearchButton searchInput={searchTitle} handleSearchTitle={handleSearchTitle} handleSearchResults={onSearch} placeholder="Search appointments" isFromSearchAppointments={true}/>
        <img src={userImage} className="user-image" alt="user" />
      </div>
    </nav>
  );
};

export default Header;
