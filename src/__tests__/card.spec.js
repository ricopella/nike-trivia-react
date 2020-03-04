import React from "react";
import { render } from "@testing-library/react";
import Card from "../components/card";

describe("<Card />", () => {
  it("should render with className and children", () => {
    const { getByText } = render(
      <Card>
        <div>Im a test</div>
      </Card>
    );

    expect(getByText(/Im a test/i)).toBeTruthy();
  });
});
