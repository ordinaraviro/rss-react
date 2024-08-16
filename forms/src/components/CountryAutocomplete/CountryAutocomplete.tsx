import { useState, useRef } from "react";

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "India",
  "China",
  "Japan",
];

function CountryAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

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
    setIsDropdownVisible(false);
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Select a country"
      />
      {isDropdownVisible && (
        <ul
          style={{
            border: "1px solid #ccc",
            marginTop: "0",
            padding: "0",
            listStyle: "none",
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryAutocomplete;
