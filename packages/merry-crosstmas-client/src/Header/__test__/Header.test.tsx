import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('Header renders the brand, title and tagline', () => {
  render(<Header />);
  expect(screen.getByText('Merry Crosstmas')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 1, name: /Draw names/ }),
  ).toBeInTheDocument();
  expect(screen.getByText(/secret match/)).toBeInTheDocument();
});
