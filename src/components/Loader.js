import "../styles/Loader.scss";
import ReactDOM from "react-dom";
//loader screen for weather data
const Loader = ({isFromWeather}) => {
  return (
    ReactDOM.createPortal(<div className={`loader-background ${isFromWeather?"weather-loader":""}`}><div className="loader">
      <div></div>
      <div></div>
    </div></div>, document.getElementById("portal"))
  )
};

export default Loader;
