import { guid, pipe } from '../util';

test('Generate GUID', function() {
  expect(guid()).toBeTruthy();
});

test('Pipe', function() {
  expect(pipe('100')).toBe('100');
  expect(pipe('100', () => 0)).toBe(0);
  expect(pipe('100', (a) => a + 1)).toBe('1001');
});

