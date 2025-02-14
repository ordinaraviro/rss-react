import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import { fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { renderWithProviders } from '../../tests/testReduxStore';

describe('SearchBar', () => {
  it('renders SearchBar component', () => {
    renderWithProviders(
      <ThemeProvider>
        <SearchBar />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.click(screen.getByText('Search'));
    fireEvent.click(screen.getByText('Toggle theme'));
    fireEvent.change(input, { target: { value: 'Good Day' } });
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });
});
