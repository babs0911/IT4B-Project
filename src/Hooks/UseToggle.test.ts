import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useToggle from "./UseToggle";

describe("useToggle", () => {
  it("starts with its initial value and toggles it", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });
});
