import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ShoeBox from "../components/shoebox";

describe("<Shoebox />", () => {
  const spy = jest.fn();
  const props = {
    handleClick: spy,
    index: 1,
    isAnswered: false,
    number: 2,
    selected: false
  };
  it("should display the number", () => {
    const { getByText } = render(<ShoeBox {...props} />);

    expect(getByText(/2/i)).toBeTruthy();
  });

  it("should handle clicking when not selected", () => {
    const { getByTestId } = render(<ShoeBox {...props} />);

    fireEvent.click(getByTestId("shoebox_container"));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("should not handle clicking when selected", () => {
    const newSpy = jest.fn();
    const { getByTestId } = render(
      <ShoeBox {...props} handleClick={newSpy} selected={true} />
    );

    fireEvent.click(getByTestId("shoebox_container"));

    expect(newSpy).not.toHaveBeenCalled();
  });
});
