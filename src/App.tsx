import React, { useState, useEffect } from 'react';
import { fetchCountries, Country } from './api';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Countries List</h1>
      <div>
        {countries.map((country) => (
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
