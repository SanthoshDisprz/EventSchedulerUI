import { useEffect, useState } from "react";
import "../styles/Weather.scss";
import Loader from "./Loader";
import SearchButton from "./SearchButton";
import WeatherErrorMessage from "./WeatherErrorMessage";
import WeatherIcon from "./WeatherIcon";
import { TfiLocationPin } from "react-icons/tfi";
//weather component
const Weather = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [canShowSearchLocation, setCanShowSearchLocation] = useState(false);
  const [canShowCurrentLocation, setCanShowCurrentLocation] = useState(true);
  //function to store latitude and longitude of current locstion
  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  //function for switching to current location
  const handleCurrentLocation = () => {
    setCanShowCurrentLocation(false);
  };
  //function for fetching weather data from api (openweather)
  const fetchWeather = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(savePositionToState);
      if (latitude && longitude) {
        await fetch(
          canShowSearchLocation
            ? `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=9148dbf29001ddfa296838f78e282a70&units=metric`
            : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9148dbf29001ddfa296838f78e282a70&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            setTemperature(Math.floor(data.main.temp));
            setLocation(data.name);
            setWeather(data.weather[0].main);
            setIcon(data.weather[0].icon);
          });
      }
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };
  //function to store search location to state
  const handleSearchLocation = (location) => {
    setSearchLocation(location);
  };
  //function to update states while search is triggered
  const onSearch = () => {
    setCanShowSearchLocation(true);
    setCanShowCurrentLocation(false);
  };
  const handleError = () => {
    setError(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude, onSearch, canShowCurrentLocation]);
  return (
    <div className="weather">
      <SearchButton
        onSearch={onSearch}
        location={location}
        handleSearchLocation={handleSearchLocation}
        handleCurrentLocation={handleCurrentLocation}
      />

      {error ? (
        <WeatherErrorMessage handleError={handleError} />
      ) : !temperature || !weather || !location ? (
        <Loader />
      ) : (
        // {error ? <WeatherErrorMessage /> :
        <div className="weather-details-container">
          <div className="location-weather-container">
            <div className="location-name-icon">
              <div className="location">{location}</div>
              <TfiLocationPin
                className="current-location-icon"
                text="Search for current location"
                onClick={() => {
                  setCanShowCurrentLocation(true);
                  setCanShowSearchLocation(false);
                  setSearchLocation("");
                }}
              />
            </div>
            <div className="temperature">{temperature}ºC</div>
            <div className="weather-data">{weather}</div>
          </div>
          <div className="icon-container">
            <WeatherIcon icon={icon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
