import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('Header renders the title and tagline', () => {
  render(<Header />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Merry Crosstmas' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/organize a Secret Santa with your friends/),
  ).toBeInTheDocument();
});
