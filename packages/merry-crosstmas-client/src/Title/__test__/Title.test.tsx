import { render, screen } from '@testing-library/react';
import Title from '../Title';

test('Title renders an empty heading', () => {
  render(<Title />);
  expect(screen.getByRole('heading', { level: 2 })).toBeEmptyDOMElement();
});

test('Title renders its content', () => {
  render(<Title>Children test</Title>);
  expect(
    screen.getByRole('heading', { level: 2, name: 'Children test' }),
  ).toBeInTheDocument();
});
