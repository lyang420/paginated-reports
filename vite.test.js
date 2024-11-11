import { test, expect } from 'vitest';
import { parseDateString, tryParseDateString } from './src/lib/utils.ts';

test('parseDateString default', () => {
   const dateString = '2024-10-27';
   const parsedDate = parseDateString(dateString);
   expect(parsedDate).toBeInstanceOf(Date);
   expect(parsedDate.getFullYear()).toBe(2024);
   expect(parsedDate.getMonth()).toBe(9);
   expect(parsedDate.getDate()).toBe(27);
});

test('tryParseDateString valid', () => {
   const validDateString = '2024-10-29';
 	const result = tryParseDateString(validDateString);
   expect(result).toBeInstanceOf(Date);
   expect(result?.getFullYear()).toBe(2024);
});

test('tryParseDateString invalid', () => {
   const invalidDateString = 'invalid-date';
   const result = tryParseDateString(invalidDateString);
   expect(result).toBeNull();
});
