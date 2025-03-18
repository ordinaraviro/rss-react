import { useEffect, useState } from 'react';
import { Country } from '../api';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    const storedCountries = localStorage.getItem('visitedCountries');
    if (storedCountries) {
      setVisitedCountries(JSON.parse(storedCountries));
    }
  }, []);

  const handleClick = () => {
    const storedCountries = localStorage.getItem('visitedCountries');
    const currentVisited = storedCountries ? JSON.parse(storedCountries) : [];

    if (!currentVisited.includes(country.cca3)) {
      const updatedVisitedCountries = [...currentVisited, country.cca3];
      setVisitedCountries(updatedVisitedCountries);
      localStorage.setItem(
        'visitedCountries',
        JSON.stringify(updatedVisitedCountries)
      );
    }
  };

  const isVisited = visitedCountries.includes(country.cca3);

  return (
    <div
      className={`flex flex-row gap-[10px] p-[5px] hover:bg-gray-100 hover:cursor-pointer transition-all duration-100 items-center ${
        isVisited ? 'bg-yellow-100' : ''
      }`}
      onClick={handleClick}
    >
      <img src={country.flags.svg} alt={country.name.common} width={50} />
      <h2>{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      {isVisited && <p className="italic ml-4 text-purple-400">Visited</p>}
    </div>
  );
};

export default CountryCard;
