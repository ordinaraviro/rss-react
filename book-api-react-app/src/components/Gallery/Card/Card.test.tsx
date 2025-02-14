import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../ThemeContext/ThemeProvider';
import { renderWithProviders } from '../../../tests/testReduxStore';
import { mockBook } from '../../../tests/mockData';
import Card from './Card';

describe('Card', () => {
  it('renders Card component', () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Card book={mockBook} link={'/test'} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('The lord of the rings')).toBeInTheDocument();
    expect(screen.getByText('J.R.R. Tolkien')).toBeInTheDocument();
  });
});
