import React from 'react';

interface SortPanelProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  sortBy: 'name' | 'population';
  setSortBy: (sortBy: 'name' | 'population') => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (sortDirection: 'asc' | 'desc') => void;
}

const SortPanel: React.FC<SortPanelProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}) => {
  return (
    <div className="max-w-[1024px] mx-auto flex flex-row justify-between gap-[20px]">
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
        <option value="Antarctic">Antarctic</option>
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
  );
};

export default SortPanel;
