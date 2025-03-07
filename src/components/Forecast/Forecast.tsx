import { ForecastData } from "../../services/api";

export const Forecast: React.FC<{ data: ForecastData }> = ({ data }) => {
  return (
    <div>
      <h3>{data.date}</h3>
      <h2>{data.temperature}</h2>
      <p>{data.description}</p>
    </div>
  );
};
