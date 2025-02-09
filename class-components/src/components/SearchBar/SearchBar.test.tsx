import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, expect, it } from 'vitest';

describe('SearchBar', () => {
  it('renders SearchBar', () => {
    render(<SearchBar onSearch={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Generate error')).toBeInTheDocument();
  });
});
