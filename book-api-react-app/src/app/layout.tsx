import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import type { Metadata } from 'next';
import StoreProvider from '../redux/storeProvider';
import { ThemeProvider } from '@/components/ThemeContext/ThemeProvider';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <StoreProvider>
            <ThemeProvider> {children}</ThemeProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
