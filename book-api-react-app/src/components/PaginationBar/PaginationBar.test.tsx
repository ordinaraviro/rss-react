import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationBar from './PaginationBar';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

function Location() {
  const [searchParams] = useSearchParams();
  return <>{searchParams.get('page')}</>;
}

describe('PaginationBar', () => {
  it('renders PaginationBar component', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <PaginationBar />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Next page →')).toBeInTheDocument();
    expect(screen.getByText('← Previous page')).toBeInTheDocument();
  });

  it('updates search params on button click', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <ThemeProvider>
          <PaginationBar />
          <Location />
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next page →'));
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('← Previous page'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
