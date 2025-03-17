export interface Country {
  cca3: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    svg: string;
  };
}

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data;
};
