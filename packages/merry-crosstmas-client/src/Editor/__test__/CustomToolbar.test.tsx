import { renderWithStore } from '../../test-utils';
import CustomToolbar from '../CustomToolbar';

test('CustomToolbar renders the Quill toolbar container', () => {
  const { container } = renderWithStore(<CustomToolbar />);
  const toolbar = container.querySelector('#toolbar');
  expect(toolbar).not.toBeNull();
  expect(toolbar!.querySelector('.ql-bold')).not.toBeNull();
  expect(toolbar!.querySelectorAll('.ql-size option')).toHaveLength(4);
});
