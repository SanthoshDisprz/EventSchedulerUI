import { useEffect, useState } from "react";
import "../../styles/WeatherIcon.scss";
//rendering different icons based on different weather datas
const WeatherIcon = ({ icon }) => {
  let [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    const setIcon = () => {
      if (icon === "01d") {
        setWeatherIcon("day.svg");
      }
      if (icon === "01n") {
        setWeatherIcon("night.svg");
      }
      if (icon === "02d") {
        setWeatherIcon("cloudy-day-1.svg");
      }
      if (icon === "02n") {
        setWeatherIcon("cloudy-night-1.svg");
      }
      if (
        icon === "03d" ||
        icon === "03n" ||
        icon === "04d" ||
        icon === "04n"
      ) {
        setWeatherIcon("cloudy.svg");
      }
      if (icon === "09d" || icon === "09n") {
        setWeatherIcon("rainy-6.svg");
      }
      if (icon === "10d" || icon === "10n") {
        setWeatherIcon("rainy-3.svg");
      }
      if (icon === "11d" || icon === "11n") {
        setWeatherIcon("thunder.svg");
      }
      if (icon === "13d" || icon === "13n") {
        setWeatherIcon("snowy-5.svg");
      }
      if (icon === "50d" || icon === "50n") {
        setWeatherIcon("mist-foggy.svg");
      }
    };
    setIcon();
  }, [icon]);

  return (
    <img
      src={`${window.location.origin}/weather-icons/${weatherIcon}`}
      alt="weather-icon"
      className="weather-icon"
    />
  );
};

export default WeatherIcon;
