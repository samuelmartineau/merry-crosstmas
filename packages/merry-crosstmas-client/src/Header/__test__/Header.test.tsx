import { screen } from '@testing-library/react';
import { renderWithStore } from '../../test-utils';
import Header from '../Header';

test('Header renders the brand, title and tagline', () => {
  renderWithStore(<Header />);
  expect(screen.getByText('Merry Crosstmas')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 1, name: /Draw names/ }),
  ).toBeInTheDocument();
  expect(screen.getByText(/secret match/)).toBeInTheDocument();
});
