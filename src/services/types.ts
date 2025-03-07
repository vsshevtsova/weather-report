


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
