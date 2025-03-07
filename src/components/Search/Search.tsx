import { useState } from "react";

interface FormProps {
  onSubmit: (city: string) => void;
}

export const Search: React.FC<FormProps> = ({ onSubmit }) => {
  const [city, setCity] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (city.trim()) {
      onSubmit(city);
      setCity("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Введите город..."
        />
        <button type="submit">Поиск</button>
      </form>
    </div>
  );
};
