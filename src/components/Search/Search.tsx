import { useState } from "react";

interface FormProps {
  onSubmit: (city: string) => void;
}

// TODO: вынести логику submit в пропс, убрать форму, оставить только инпут и кнопку, убрать стейт

export const Search: React.FC<FormProps> = ({onSubmit}) => {
  const [city, setCity] = useState<string>("");

  function handleSubmit () {
    if (city.trim()) {
      onSubmit(city);
    }
  }

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={ city }
        onChange={ handleInputChange }
        placeholder="Введите город..."
      />
      <button onClick={ handleSubmit }>Поиск</button>
    </div>
  );
};
