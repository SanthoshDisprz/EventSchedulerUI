import { TbRefresh } from "react-icons/tb";
import svg from "../assets/something-went-wrong.svg";
import "../styles/WeatherErrorMessage.scss";
//error message component
const WeatherErrorMessage = ({ handleError }) => {
  return (
    <div className="error-message-refresh-icon-container">
      <div className="weather-error-message-container">
        <div className="error-message">No data found</div>
        <img src={svg} className="error-image" alt="error" />
      </div>
      <TbRefresh onClick={() => handleError()} className="refresh-icon" />
    </div>
  );
};

export default WeatherErrorMessage;
