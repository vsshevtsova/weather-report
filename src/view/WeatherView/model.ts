import { createStore, createEvent } from "effector";
import { fetchForecastFx, fetchWeatherByCityFx, fetchWeatherByCoordsFx } from "../../services";
import { Coords, ForecastData, WeatherData } from "../../services/types.ts";




export const fetchWeatherByCity = createEvent<{ city: string }>();
export const fetchWeatherByCoords = createEvent<{ lat: number; lon: number }>();

// TODO: объединить fetchWeatherByCity и fetchWeatherByCoords в одну функцию, которая принимала бы либо те переменные либо другие, повторить с forecast

export const fetchForecast = createEvent<{ city: string }>();



fetchWeatherByCity.watch(({ city }) => {
  fetchWeatherByCityFx({ city });
});

fetchWeatherByCoords.watch(({ lat, lon }) => {
  fetchWeatherByCoordsFx({ lat, lon });
});

fetchForecast.watch(({ city }) => {
  fetchForecastFx({ city });
});

fetchWeatherByCoordsFx.fail.watch((error) => {
  console.log("Ошибка в fetchWeatherByCoords", error);
});

fetchWeatherByCoordsFx.fail.watch((error) => {
  console.log("Ошибка в fetchWeatherByCoords", error);
});

fetchForecastFx.fail.watch((error) => {
  console.log("Ошибка в fetchForecast", error);
});

fetchWeatherByCityFx.doneData.watch((data) => {
  console.log("Погода получена", data);
});

fetchForecastFx.doneData.watch((data) => {
  console.log("Прогноз получен", data);
});



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
