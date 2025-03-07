import { CurrentWeatherProps } from "../CurrentWeather/CurrentWeather.tsx";
import { FC } from "react";


interface Day extends Omit<CurrentWeatherProps, 'city'> {
  date: string
}

interface ForecastProps {
  days: Day[]
}


export const Forecast: FC<ForecastProps> = (props) => {
  return (
    <>
      {
        props.days.map(day =>
          <div>
            <h3>{day.date}</h3>
            <h2>{day.temperature}</h2>
            <p>{day.description}</p>
          </div>
        )
      }
    </>
  );
};
