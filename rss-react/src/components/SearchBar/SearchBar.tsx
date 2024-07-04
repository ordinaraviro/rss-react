import React, { Component } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchTerm: localStorage.getItem("searchTerm") || "",
    };
  }

  componentWillUnmount() {
    localStorage.setItem("searchTerm", this.state.searchTerm);
  }

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
