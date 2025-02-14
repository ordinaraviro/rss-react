import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Gallery from './Gallery';
import { renderWithProviders } from '../../tests/testReduxStore';
import { mockData } from '../../tests/mockData';

export const handlers = [
  http.get('https://openlibrary.org/search.json', async () => {
    await delay(150);
    return HttpResponse.json(mockData);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Gallery', () => {
  it('renders Gallery component', () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Gallery />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows Gallery after fetching data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details?page=1&bookId=0']}>
        <ThemeProvider>
          <Gallery />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Brian Sibley')).toBeInTheDocument();
    });
  });
});
