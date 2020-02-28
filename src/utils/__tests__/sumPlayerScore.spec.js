import sumPlayerScore from "../sumPlayerScore";

describe("utils - sumPlayerScore", () => {
  it("should return the correct score", () => {
    const playersCache = [
      {
        correct: true
      },
      { correct: false },
      { correct: null },
      { correct: true },
      { correct: false }
    ];

    const actual = sumPlayerScore(playersCache);
    const expected = 2;

    expect(actual).toEqual(expected);
  });
});
