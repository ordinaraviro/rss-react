import { useState, useEffect } from 'react';
import { fetchCountries, Country } from './api';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  if (loading) return <p>Loading...</p>;

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const sortedCountries = filteredCountries.sort((a, b) => {
    const compareValue =
      sortBy === 'name'
        ? a.name.common.localeCompare(b.name.common)
        : a.population - b.population;

    return sortDirection === 'asc' ? compareValue : -compareValue;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Countries List</h1>

      <input
        type="text"
        placeholder="Search by country name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        onChange={(e) => setSelectedRegion(e.target.value)}
        value={selectedRegion}
      >
        <option value="All">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        onChange={(e) => setSortBy(e.target.value as 'name' | 'population')}
        value={sortBy}
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
      </select>

      <button
        onClick={() =>
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        }
      >
        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      </button>

      <div>
        {sortedCountries.map((country) => (
          <div key={country.cca3}>
            <img src={country.flags.svg} alt={country.name.common} width={50} />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
