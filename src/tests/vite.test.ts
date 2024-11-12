import { describe, it, expect } from "vitest";
import { tryParseDateString, parseDateString } from "@/lib/utils";

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
