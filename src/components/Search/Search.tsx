import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Search.scss";

interface FormProps {
  onSubmit: (city: string) => void;
}

interface SearchProps extends FormProps {
  className?: string;
}

export const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  let city = "";

  function handleSubmit() {
    if (city.trim()) {
      onSubmit(city);
    }
  }
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    city = event.target.value;
  }

  return (
    <div className="search-item">
      <Form.Control
        type="text"
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
        placeholder="Введите город..."
      />
      <Button onClick={handleSubmit}>Поиск</Button>
    </div>
  );
};
