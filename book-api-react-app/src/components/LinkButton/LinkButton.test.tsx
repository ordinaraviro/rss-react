import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../ThemeContext/ThemeProvider';
import { render, screen } from '@testing-library/react';
import LinkButton from './LinkButton';

describe('LinkButton', () => {
  it('renders LinkButton component', () => {
    render(
      <ThemeProvider>
        <LinkButton path="/">test</LinkButton>
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
