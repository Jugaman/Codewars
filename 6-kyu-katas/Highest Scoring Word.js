/*
DESCRIPTION:
Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.

For example, the score of abad is 8 (1 + 2 + 1 + 4).

You need to return the highest scoring word as a string.

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid.
*/

const high = (x) => {
  let scores = {};
  let words = x.split(" ");
  for (let word of words) {
    scores[word] = 0;
    for (let i = 0; i < word.length; i++) {
      let char = word.charCodeAt(i);
      scores[word] += char - 96;
    }
  }
  const highScore = Object.entries(scores).reduce((acc, cur) =>
    acc[1] < cur[1] ? cur : acc
  );
  return highScore[0];
};