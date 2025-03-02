import { render, screen, fireEvent } from '@testing-library/react';
import CardDetails from './CardDetails';
import { describe, it, expect, vi } from 'vitest';
import { mockData } from '../../../tests/mockData';

vi.mock('next/navigation', () => {
  return {
    usePathname: vi.fn(() => '/books/details'),
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

describe('CardDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders book details correctly', () => {
    render(<CardDetails data={mockData} />);

    expect(
      screen.getByText('Title: The lord of the rings')
    ).toBeInTheDocument();
  });

  it('hides card details when the close button is clicked', () => {
    render(<CardDetails data={mockData} />);

    const closeButton = screen.getByText('Close details');
    fireEvent.click(closeButton);

    expect(
      screen.queryByText('Title: The lord of the rings')
    ).not.toBeInTheDocument();
  });
});
