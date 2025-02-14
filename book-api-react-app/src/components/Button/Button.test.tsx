import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import Button from './Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders Button component', () => {
    render(
      <ThemeProvider>
        <Button
          handleClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          test
        </Button>
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
