import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button'; 
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

describe('Button', () => {
  it('applies the correct class based on the theme', () => {
    render(
      <ThemeProvider>
        <Button handleClick={() => {}}>Click Me</Button>
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /click me/i });

    // Initial theme should be light
    expect(button).toHaveClass('btn');
    expect(button).not.toHaveClass('btn-dark');
  });

  it('applies the dark theme class when the theme is dark', async () => {
    render(
      <ThemeProvider>
        <ThemeToggler>
          <Button handleClick={() => {}}>Click Me</Button>
        </ThemeToggler>
      </ThemeProvider>
    );

    // Toggle theme to dark
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleButton);

    const button = screen.getByRole('button', { name: /click me/i });
    await waitFor(() => expect(button).toHaveClass('btn-dark'));
  });

  it('calls handleClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <Button handleClick={handleClick}>Click Me</Button>
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
