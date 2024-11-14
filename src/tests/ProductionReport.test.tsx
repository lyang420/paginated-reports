/* This unit test was placed here after much difficulty with import statements.
This was by far the most cumbersome of the Vitest unit tests. */

import React 												from "react";
import { ProductionReport }                  	from "@/components/ProductionReport"
import { render, screen }              from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Handle URL Parameters", () => {
	vi.clearAllMocks();
	vi.mock("next/navigation", () => ({
		useSearchParams: () => ({
			get: (key: string) => {
				switch (key) {
					case "devices":
						return "device1,device2";
					  case "startDate":
						 return "2024-10-01";
					  case "endDate":
						 return "2024-10-31";
					  default:
						 return null;
				}
			},
		}),
	}));
	it("should load the page with parameters from URL", async () => {
		render(<ProductionReport />);
		expect (
			(screen.getByLabelText('device1') as HTMLInputElement).checked
		).toBe(true);
		expect (
			(screen.getByLabelText('device2') as HTMLInputElement).checked
		).toBe(true);
		expect (
			(screen.getByLabelText('Start Date') as HTMLInputElement).value
		).toBe('2024-10-01');
		expect (
			(screen.getByLabelText('End Date') as HTMLInputElement).value
		).toBe('2024-10-31');
	});
	vi.clearAllMocks();
});
	