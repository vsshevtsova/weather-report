import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $weather, $location, $forecast, requestLocation, fetchForecast, fetchWeatherByCity } from "./model";
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
    fetchWeatherByCity({city});
    fetchForecast({city});
  };

  return (
    <div>
      <Search onSubmit={ handleSearchSubmit } />
      {
        weatherData ?
          <CurrentWeather
            city={ weatherData.city }
            description={ weatherData.description }
            temperature={ weatherData.temperature }
          /> : <p>Загрузка...</p>
      }
      { forecastData ?
        <Forecast
          days={forecastData}
        /> : <p>Загрузка...</p> }
    </div>
  );
};
