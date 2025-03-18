import { useState, useEffect } from 'react';
import { fetchCountries, Country } from './api';
import Footer from './components/Footer';
import Header from './components/Header';

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
    <div className="w-full h-full flex flex-col justify-between bg-gray-100">
      <Header />
      <div className="max-w-[1024px] mx-auto flex flex-row justify-between gap-[20px]">
        {' '}
        <input
          className="border border-gray-600 rounded-sm px-5"
          type="text"
          placeholder="Search by country name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedRegion(e.target.value)}
          value={selectedRegion}
          className="border border-gray-600 rounded-sm px-5"
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          className="border border-gray-600 rounded-sm px-5"
          onChange={(e) => setSortBy(e.target.value as 'name' | 'population')}
          value={sortBy}
        >
          <option value="name">Sort by Name</option>
          <option value="population">Sort by Population</option>
        </select>
        <button
          className="w-[120px] rounded-lg border border-transparent px-3 py-2.5 text-base font-medium font-inherit bg-gray-900 cursor-pointer transition-border duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 hover:border-blue-500"
          onClick={() =>
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
          }
        >
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <div className="flex flex-col gap-[5px] overflow-auto h-[70vh] w-[1024px] mx-auto p-2 bg-gray-200">
        {sortedCountries.map((country) => (
          <div
            className="flex flex-row gap-[10px] p-[5px] hover:bg-gray-100 hover:cursor-pointer transition-all duration-100 items-center"
            key={country.cca3}
          >
            <img src={country.flags.svg} alt={country.name.common} width={50} />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
