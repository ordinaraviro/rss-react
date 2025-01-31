import SearchBar from '../../components/SearchBar/SearchBar';
import React from 'react';
import Gallery from '../../components/Gallery/Gallery';

interface MainState {
  searchTerm: string;
}

class Main extends React.Component<
  React.ComponentPropsWithoutRef<'div'>,
  MainState
> {
  constructor(props: React.ComponentPropsWithoutRef<'div'>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchTerm: string) {
    this.setState({ searchTerm });
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <Gallery searchText={this.state.searchTerm} perPage={10} />
      </div>
    );
  }
}

export default Main;
