import { personalize } from './EmailPreview';

test('personalize swaps tags like the server and escapes names', () => {
  expect(personalize('<p>@You gifts @FRIEND</p>', 'Al', '<b>Ben</b>')).toBe(
    '<p>Al gifts &lt;b&gt;Ben&lt;/b&gt;</p>',
  );
});
