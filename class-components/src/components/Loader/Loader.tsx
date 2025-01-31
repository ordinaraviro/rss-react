import React from 'react';
import './Loader.scss';

export class Loader extends React.Component {
  render() {
    return (
      <div className="loading">
        Loading<div className="spinner"></div>
      </div>
    );
  }
}

export default Loader;
