/**
 * Simple function that takes the array of players answers cache
 * creates an array of correct (1) or wrong (0)
 * then sums up the total correct answers
 * returns the total sum of correct answers
 */
export default playerAnswersCache =>
  playerAnswersCache
    .map((x, i) => (x.correct ? 1 : 0))
    .reduce((accumulator, currentValue) => accumulator + currentValue);
