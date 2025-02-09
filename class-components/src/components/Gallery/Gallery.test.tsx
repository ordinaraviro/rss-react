import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { fetchData } from '../../api/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './Gallery';
import { mockBook, mockData } from '../../tests/mockData';
import Card from './Card';

vi.mock('../../api/api', () => ({
  fetchData: vi.fn(),
}));

describe('Gallery', () => {
  it('shows loading while pending data request', async () => {
    (fetchData as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    ); // promise that never resolves to simulate a loading state

    render(
      <BrowserRouter>
        <Gallery searchText="test" perPage={10} />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('"Nothing found" is displayed if no cards are present', async () => {
    (fetchData as jest.Mock).mockResolvedValue({ numFound: 0, docs: [] });

    render(
      <BrowserRouter>
        <Gallery searchText="test" perPage={10} />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Nothing found')).toBeInTheDocument()
    );
  });

  it('renders the specified number of cards', async () => {
    (fetchData as jest.Mock).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <Gallery searchText="test" perPage={10} />
      </BrowserRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(11); // always has one link over list
    });
  });

  it('renders relevant card data', async () => {
    render(
      <BrowserRouter>
        <Card book={mockBook} link="/details/1" />
      </BrowserRouter>
    );

    expect(screen.getByText('The lord of the rings')).toBeInTheDocument();
    expect(screen.getByText('J.R.R. Tolkien')).toBeInTheDocument();
  });

  it('opens a detailed card component when clicked', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Card book={mockBook} link="/details/1" />}
          />
          <Route path="/details/1" element={<div>Detailed View</div>} />
        </Routes>
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);

    await waitFor(() => {
      expect(screen.getByText('Detailed View')).toBeInTheDocument();
    });
  });
});
