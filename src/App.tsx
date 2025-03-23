import { useState, useEffect, useMemo } from 'react';
import { fetchCountries, Country } from './api';
import Footer from './components/Footer';
import Header from './components/Header';
import SortPanel from './components/SortPanel';
import CountryCard from './components/CounrtryCard';

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

  const filteredAndSortedCountries = useMemo(() => {
    const filteredCountries = countries.filter((country) => {
      const matchesRegion =
        selectedRegion === 'All' || country.region === selectedRegion;
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });

    return filteredCountries.sort((a, b) => {
      const compareValue =
        sortBy === 'name'
          ? a.name.common.localeCompare(b.name.common)
          : a.population - b.population;

      return sortDirection === 'asc' ? compareValue : -compareValue;
    });
  }, [countries, searchQuery, selectedRegion, sortBy, sortDirection]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gray-100">
      <Header />
      <SortPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <div className="flex flex-col gap-[5px] overflow-auto h-[70vh] w-[1024px] mx-auto p-2 bg-gray-200">
        {filteredAndSortedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
