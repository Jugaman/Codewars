/*
DESCRIPTION:
Simple, given a string of words, return the length of the shortest word(s).

String will never be empty and you do not need to account for different data types.
*/
const findShort = (s) =>
  s.split(" ").reduce((acc, cur) => (cur.length > acc.length ? acc : cur))
    .length;
