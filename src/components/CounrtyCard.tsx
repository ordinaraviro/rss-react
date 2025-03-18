import { Country } from '../api';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="flex flex-row gap-[10px] p-[5px] hover:bg-gray-100 hover:cursor-pointer transition-all duration-100 items-center">
      <img src={country.flags.svg} alt={country.name.common} width={50} />
      <h2>{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
    </div>
  );
};

export default CountryCard;
