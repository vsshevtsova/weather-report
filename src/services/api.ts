import { createEffect, createEvent } from "effector";
import axios from "axios";

const API_KEY = "b5f32516eabd87064424be661e472e15";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

export interface ForecastData {
  city: string;
  date: string;
  temperature: number;
  description: string;
}

export interface Coords {
  lat: number;
  lon: number;
}

export const fetchWeatherByCity = createEvent<{ city: string }>();
export const fetchWeatherByCoords = createEvent<{ lat: number; lon: number }>();
export const fetchForecast = createEvent<{ city: string }>();

export const fetchWeatherByCityFx = createEffect<
  { city: string },
  WeatherData,
  Error
>(async ({ city }) => {
  const response = await axios.get(BASE_URL, {
    params: { q: city, appid: API_KEY, units: "metric", lang: "ru" },
  });

  return {
    city: response.data.name,
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
  };
});

export const fetchWeatherByCoordsFx = createEffect<
  { lat: number; lon: number },
  WeatherData,
  Error
>(async ({ lat, lon }) => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
      lang: "ru",
    },
  });
  return {
    city: response.data.name,
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
  };
});

export const fetchForecastFx = createEffect<
  { city: string },
  ForecastData[],
  Error
>(async ({ city }) => {
  const response = await axios.get(FORECAST_URL, {
    params: { q: city, appid: API_KEY, units: "metric", lang: "ru" },
  });

  const forecast = response.data.list
    .filter((prediction: any, index: number) => index % 8 === 0)
    .slice(0, 5);

  return forecast.map((day: any) => {
    return {
      city: response.data.name,
      date: new Date(day.dt * 1000).toLocaleString("ru-RU"),
      temperature: day.main.temp,
      description: day.weather[0].description,
    };
  });
});

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
