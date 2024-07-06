import React from 'react';
import { fetchData, BooksResponse } from '../../api/api';
import './Gallery.scss';

interface Props {
  searchText: string;
  perPage: number;
}

interface State {
  data: BooksResponse | null;
}

class Gallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.searchText !== this.props.searchText) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.setState({ data: null });
    const { searchText, perPage } = this.props;
    const data = await fetchData(searchText, perPage);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <div className="loading">Loading...</div>;
    }

    if (!data.numFound) {
      return <div className="loading">Nothing found</div>;
    }

    const books = data.docs;

    return (
      <div className="gallery">
        {books.map((book) => (
          <div className="card" key={book.cover_edition_key}>
            { book.cover_edition_key ? 
            <img
              src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
              alt={book.title}
            /> :
            <div className='no-img-title'>{book.title}</div>
            }
            
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">
                <small className="text-muted">{book.author_name ? book.author_name[0] : 'Unknown'}</small>
              </p>
              {/* <p className="card-text">
                <small className="text-muted">Views: {book.subject}</small>
              </p> */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Gallery;