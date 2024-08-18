import { useState, useEffect, RefObject, forwardRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./CountryAutocomplete.scss";

interface CountryAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  func?: RefObject<HTMLInputElement>;
  placeholder?: string;
}

const CountryAutocomplete = forwardRef<
  HTMLInputElement,
  CountryAutocompleteProps
>(({ value, onChange, func, placeholder = "Select a country" }, ref) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const countries = useSelector((state: RootState) => state.form.countries);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) onChange(value);

    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCountries(filtered);
      setIsDropdownVisible(true);
    } else {
      setFilteredCountries([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSelectCountry = (country: string) => {
    setInputValue(country);
    if (onChange) onChange(country);
    setIsDropdownVisible(false);
  };

  return (
    <div className="container">
      <input
        type="text"
        ref={func || ref}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="inputField"
      />
      {isDropdownVisible && (
        <ul className="dropdown">
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              className="dropdownItem"
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

CountryAutocomplete.displayName = "CountryAutocomplete";
export default CountryAutocomplete;
