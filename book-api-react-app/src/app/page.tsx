import type { Metadata } from 'next'
import { BooksResponse } from 'redux/books';
 
export const metadata: Metadata = {
  title: 'Books Api App',
}
export default async function Page() {
    const res = await fetch(`https://openlibrary.org/search.json?q=harry&page=1&limit=10&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key`, { cache: 'no-store' })
    const data: BooksResponse = await res.json();
  return (
    <>
      <div className="card">
        {data.docs[0].cover_edition_key ? (
          <img
            src={`https://covers.openlibrary.org/b/olid/${data.docs[0].cover_edition_key}-M.jpg`}
            alt={data.docs[0].title}
          />
        ) : (
          <div className="no-img-title">{data.docs[0].title}</div>
        )}

        <div className="card-body">
          <h5 className="card-title">{data.docs[0].title}</h5>
          <p className="card-text">
            <small className="text-muted">
              {data.docs[0].author_name ? data.docs[0].author_name[0] : 'Unknown'}
            </small>
          </p>
        </div>
      </div>
    </>
  );
  }
