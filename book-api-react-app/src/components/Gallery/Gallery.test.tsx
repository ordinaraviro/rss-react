import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from './Gallery';
import { vi } from 'vitest';
import { mockData } from '../../tests/mockData';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import { renderWithProviders } from '../../tests/testReduxStore';

vi.mock('next/navigation', () => {
  return {
    usePathname: vi.fn(() => '/books'),
    useSearchParams: vi.fn(() => ({
      get: vi.fn((key: string) => {
        if (key === 'bookId') return '0';
        if (key === 'page') return '1';
        if (key === 'q') return 'test';
        return null;
      }),
    })),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

vi.mock('next/link', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

const mockOneData = {
  numFound: 741,
  start: 0,
  numFoundExact: true,
  docs: [
    {
      author_name: ['Wayne G. Hammond', 'Christina Scull'],
      cover_edition_key: 'OL3410671M',
      edition_key: ['OL26236284M', 'OL26236285M', 'OL21363237M', 'OL3410671M'],
      first_publish_year: 2005,
      first_sentence: ['When Mr. Bilbo Baggins in Hobbiton.'],
      key: '/works/OL548432W',
      title: 'The lord of the rings',
    },
  ],
  q: 'the lord of the rings',
  offset: false,
};

describe('Gallery Component', () => {
  const mockSetLoading = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader when loading is true', () => {
    render(
      <Gallery data={mockData} loading={true} setLoading={mockSetLoading}>
        <div></div>
      </Gallery>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders gallery with books when loading is false', () => {
    renderWithProviders(
      <ThemeProvider>
        <Gallery data={mockData} loading={false} setLoading={mockSetLoading}>
          <div />
        </Gallery>
      </ThemeProvider>
    );

    expect(screen.getByText('Brian Sibley')).toBeInTheDocument();
  });

  it('handles book card click to show details', () => {
    renderWithProviders(
      <ThemeProvider>
        <Gallery data={mockOneData} loading={false} setLoading={mockSetLoading}>
          <div />
        </Gallery>
      </ThemeProvider>
    );

    const firstCardLink = screen.getByText('Details');

    fireEvent.click(firstCardLink!);

    expect(mockSetLoading).toHaveBeenCalled();
  });

  it('calls setLoading(false) when data is available', () => {
    render(
      <Gallery data={mockData} loading={true} setLoading={mockSetLoading}>
        <div />
      </Gallery>
    );

    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
