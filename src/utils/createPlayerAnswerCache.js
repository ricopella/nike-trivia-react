/**
 * Function that will return an array of 10 objects.
 */
export default () =>
  [...Array(10)].map((x, i) => ({ correct: null, selected: null }));
