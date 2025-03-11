import { createEffect } from "effector";
import axios from "axios";
import { API_KEY, BASE_URL, FORECAST_URL } from "../../env.ts";
import { ForecastData, WeatherData } from "./types.ts";

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
    temperature: Math.round(response.data.main.temp),
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
    temperature: Math.round(response.data.main.temp),
    description: response.data.weather[0].description,
  };
});

export const fetchForecastFx = createEffect<
  { city?: string; lat?: number; lon?: number },
  ForecastData[],
  Error
>(async ({ city, lat, lon }) => {
  const params: any = { appid: API_KEY, units: "metric", lang: "ru" };
  if (city) params.q = city;
  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  const response = await axios.get(FORECAST_URL, { params });

  const forecast = response.data.list
    .filter((_: any, index: number) => index % 8 === 0)
    .slice(0, 5);

  return forecast.map((day: any) => {
    return {
      city: response.data.name,
      date: new Date(day.dt * 1000).toLocaleString("ru-RU", {
        month: "numeric",
        day: "numeric",
      }),
      temperature: Math.round(day.main.temp),
      description: day.weather[0].description,
    };
  });
});
