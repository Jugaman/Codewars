/*
DESCRIPTION:
Write a function which calculates the average of the numbers in a given list.

Note: Empty arrays should return 0.
*/
const findAverage = (array) =>
  array.length > 0 ? array.reduce((acc, cur) => acc + cur) / array.length : 0;
