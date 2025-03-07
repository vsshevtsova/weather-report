import { createStore, createEvent } from "effector";
import {
  fetchWeatherByCityFx,
  fetchWeatherByCoordsFx,
  fetchForecastFx,
  WeatherData,
  ForecastData,
  Coords,
} from "../../services/api";

export const setLocation = createEvent<Coords>();
export const requestLocation = createEvent();

export const $weather = createStore<WeatherData | null>(null)
  .on(fetchWeatherByCityFx.doneData, (_, weather) => weather)
  .on(fetchWeatherByCoordsFx.doneData, (_, weather) => weather);
export const $location = createStore<Coords | null>(null).on(
  setLocation,
  (_, coords) => coords
);
export const $forecast = createStore<ForecastData[]>([]).on(
  fetchForecastFx.doneData,
  (_, forecast) => forecast
);

requestLocation.watch(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setLocation(coords);
      fetchWeatherByCoordsFx(coords);
    },
    (error) => {
      console.error("Ошибка получения координат:", error);
    }
  );
});
