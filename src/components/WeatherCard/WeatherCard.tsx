import { FC } from "react";
import { CurrentWeatherProps } from "../CurrentWeather/CurrentWeather.tsx";
import "./WeatherCard.scss";

interface WeatherCardProps extends Omit<CurrentWeatherProps, "city"> {
  date: string;
}

export const WeatherCard: FC<WeatherCardProps> = ({
  date,
  temperature,
  description,
}) => {
  return (
    <div className="card-container">
      <div className="card border-primary">
        <p className="date fs-6 text-muted">{date}</p>
        <p className="temperature fs-2">{temperature}°C</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};
