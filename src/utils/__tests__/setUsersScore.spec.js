import setUsersScore from "../setUsersScore";

describe("util - setUsersScore", () => {
  const buildDefaultPlayerCache = () => [
    {
      correct: null,
      selected: null
    },
    {
      correct: null,
      selected: null
    },
    {
      correct: null,
      selected: null
    },
    {
      correct: null,
      selected: null
    },
    {
      correct: null,
      selected: null
    }
  ];

  it("should not update correct item when no selected answer", () => {
    const [updatedCache, answeredCount] = setUsersScore(
      buildDefaultPlayerCache(),
      null,
      0
    );
    expect(updatedCache).toEqual(buildDefaultPlayerCache());
    expect(answeredCount).toEqual(0);
  });

  it("should update the first item and return count to one", () => {
    const cache = buildDefaultPlayerCache();
    const [updatedCache, answeredCount] = setUsersScore(cache, 1, 0);

    const clonedCache = [...cache];
    clonedCache[0] = { correct: true, selected: 1 };
    expect(updatedCache).toEqual(clonedCache);
    expect(answeredCount).toEqual(1);
  });
});
