import { describe, it, expect } from 'vitest'
import { tryParseDateString, parseDateString } from '@/lib/utils'
import { getDeviceChartData } from '@/components/ProductionReport'

/* Note for date parsing: consider also testing months that are single digit, or
ambiguously written dates. */

describe("tryParseDateString", () => {
   it("should correctly parse dates in the five listed formats", () => {
		const ans = tryParseDateString("2024-10-27")?.toISOString();
      expect(tryParseDateString("2024-10-27")?.toISOString()).toBe(ans);
      expect(tryParseDateString("10/27/2024")?.toISOString()).toBe(ans);
      expect(tryParseDateString("10-27-2024")?.toISOString()).toBe(ans);
   });
   it("should return null for invalid strings", () => {
      expect(tryParseDateString("invalid")).toBeNull();
   });
});

describe("parseDateString", () => {
	it("should correctly parse date strings by calling tryParseDateString()", () => {
		const ans = parseDateString("2024-10-27")?.toISOString();
      expect(parseDateString("2024-10-27")?.toISOString()).toBe(ans);
      expect(parseDateString("10/27/2024")?.toISOString()).toBe(ans);
      expect(parseDateString("10-27-2024")?.toISOString()).toBe(ans);
  	});
   it("should throw an error for invalid strings", () => {
      expect(() => parseDateString("invalid")).toThrowError("Invalid date string: invalid");
   });
});

/* Note for data transformation: coonsider also testing number rounding and
converting to different units (hours), empty input, etc. */

describe("getDeviceChartData", () => {
	it("should transform a given data record into chart format for the page", () => {
		const summary = {
			"active": {good: 100, reject: 200, duration: 10800 },
			"inactive": { good: 50, reject: 150, duration: 7200 }
		};
		const ans = getDeviceChartData(summary);
		expect(ans).toEqual([
			{ state: 'active', good: 100, reject: 200, duration: 3.0 },
			{ state: 'inactive', good: 50, reject: 150, duration: 2.0 }
		]);
	});
});
