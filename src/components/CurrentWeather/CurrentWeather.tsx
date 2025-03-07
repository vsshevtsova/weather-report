import { WeatherData } from "../../services/api";

export const CurrentWeather: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div>
      <h3>{data.city}</h3>
      <h2>{data.temperature}</h2>
      <p>{data.description}</p>
    </div>
  );
};
