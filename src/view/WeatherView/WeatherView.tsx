import { useEffect } from "react";
import { useUnit } from "effector-react";
import {
  $weather,
  $location,
  $forecast,
  requestLocation,
  fetchForecast,
  fetchWeather,
} from "./model";
import { Search } from "../../components/Search/Search";
import { CurrentWeather } from "../../components/CurrentWeather/CurrentWeather";
import { ForecastSwiper } from "../../components/Swiper/ForecastSwiper";
import "./WeatherView.scss";

export const WeatherView: React.FC = () => {
  const weatherData = useUnit($weather);
  const locationData = useUnit($location);
  const forecastData = useUnit($forecast);

  useEffect(() => {
    if (!locationData) {
      requestLocation();
    }
  }, [locationData]);

  const handleSearchSubmit = (city: string) => {
    fetchWeather({ city });
    fetchForecast({ city });
  };

  return (
    <div className="grid-container">
      <Search onSubmit={handleSearchSubmit} className="search-item" />
      {weatherData ? (
        <CurrentWeather
          city={weatherData.city}
          description={weatherData.description}
          temperature={weatherData.temperature}
          className="current-weather-item"
        />
      ) : (
        <p>Загрузка...</p>
      )}
      {forecastData ? (
        <ForecastSwiper days={forecastData} className="swiper-item" />
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};
