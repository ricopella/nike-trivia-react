import React from "react";
import { fireEvent, render } from "@testing-library/react";
import FinalScore from "../components/finalScore";

describe("<FinalScore />", () => {
  it("should handle restarting game and show teh score", () => {
    const spy = jest.fn();
    const { getByText } = render(<FinalScore score={5} restartGame={spy} />);
    fireEvent.click(getByText(/Try Again/i));
    expect(getByText(/5 out of 10/i));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
