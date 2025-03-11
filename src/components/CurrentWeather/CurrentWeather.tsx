import { FC } from "react";
import "./CurrentWeather.scss";

export interface CurrentWeatherProps {
  city: string;
  temperature: number;
  description: string;
  className?: string;
}

export const CurrentWeather: FC<CurrentWeatherProps> = (props) => {
  const { city, description, temperature } = props;

  return (
    <div className="current-weather-item">
      <h1 className="city">{city}</h1>
      <p className="current-temperature fs-1">{temperature}°C</p>
      <p className="description fs-4">{description}</p>
    </div>
  );
};
