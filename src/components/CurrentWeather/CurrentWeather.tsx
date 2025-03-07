import { FC } from "react";


export interface CurrentWeatherProps {
  city: string,
  temperature: number,
  description: string
}


export const CurrentWeather: FC<CurrentWeatherProps> = (props) => {

  const {
    city,
    description,
    temperature
  } = props

  return (
    <>
      <h3>{city}</h3>
      <h2>{temperature}</h2>
      <p>{description}</p>
    </>
  );
};
