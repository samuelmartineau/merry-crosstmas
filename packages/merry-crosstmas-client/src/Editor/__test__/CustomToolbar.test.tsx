import { render } from '@testing-library/react';
import CustomToolbar from '../CustomToolbar';

test('CustomToolbar renders the Quill toolbar container', () => {
  const { container } = render(<CustomToolbar />);
  const toolbar = container.querySelector('#toolbar');
  expect(toolbar).not.toBeNull();
  expect(toolbar!.querySelector('.ql-bold')).not.toBeNull();
  expect(toolbar!.querySelectorAll('.ql-size option')).toHaveLength(4);
});
