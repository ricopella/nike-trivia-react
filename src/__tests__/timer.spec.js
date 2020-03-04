import React from "react";
import { render } from "@testing-library/react";
import Timer from "../components/timer";

describe("<Timer />", () => {
  it("should show the time left", () => {
    const { getByText } = render(<Timer timeLeft={10} />);

    expect(getByText(/10/i)).toBeTruthy();
  });
});
