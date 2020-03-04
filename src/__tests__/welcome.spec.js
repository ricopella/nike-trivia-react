import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Welcome from "../components/welcome";

describe("<Welcome />", () => {
  it("should handle setGameStatus", () => {
    const spy = jest.fn();
    const { getByText } = render(<Welcome setGameStatus={spy} />);

    fireEvent.click(getByText(/Just Do It/i));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
