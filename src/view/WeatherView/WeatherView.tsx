import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $weather, $location, $forecast, requestLocation } from "./model";
import { fetchWeatherByCity, fetchForecast } from "../../services/api";
import { Search } from "../../components/Search/Search";
import { CurrentWeather } from "../../components/CurrentWeather/CurrentWeather";
import { Forecast } from "../../components/Forecast/Forecast";

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
    fetchWeatherByCity({ city });
    fetchForecast({ city });
  };

  return (
    <div>
      <Search onSubmit={handleSearchSubmit} />
      {weatherData ? <CurrentWeather data={weatherData} /> : <p>Загрузка...</p>}
      {forecastData ? <Forecast data={forecastData} /> : <p>Загрузка...</p>}
    </div>
  );
};
