import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('Footer renders a link to the author', () => {
  render(<Footer />);
  const link = screen.getByRole('link', { name: /Samuel Martineau/ });
  expect(link).toHaveAttribute('href', 'http://samuelmartineau.com');
  expect(link).toHaveAttribute('target', '_blank');
});
