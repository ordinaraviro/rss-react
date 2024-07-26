import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LinkButton from './LinkButton';
import { ThemeProvider, useTheme } from '../ThemeContext/ThemeContext';
import { ReactNode } from 'react';

// Helper component to toggle the theme for testing
const ThemeToggler = ({ children }: { children: ReactNode }) => {
  const { toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
    </div>
  );
};

describe('LinkButton', () => {
  it('applies the correct class based on the theme', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <LinkButton path="/test">Test Link</LinkButton>
        </MemoryRouter>
      </ThemeProvider>
    );

    const linkButton = screen.getByRole('link', { name: /test link/i });

    // Initial theme should be light
    expect(linkButton).toHaveClass('link-btn');
    expect(linkButton).not.toHaveClass('link-btn-dark');
  });

  it('applies the dark theme class when the theme is dark', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <ThemeToggler>
            <LinkButton path="/test">Test Link</LinkButton>
          </ThemeToggler>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Toggle theme to dark
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleButton);

    const linkButton = screen.getByRole('link', { name: /test link/i });
    await waitFor(() => expect(linkButton).toHaveClass('link-btn-dark'));
  });

  it('navigates to the correct path', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<LinkButton path="/test">Test Link</LinkButton>} />
            <Route path="/test" element={<div>Test Page</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    const linkButton = screen.getByRole('link', { name: /test link/i });
    fireEvent.click(linkButton);

    // Verify the path change
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });
});
