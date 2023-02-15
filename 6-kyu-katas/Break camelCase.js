/*
DESCRIPTION:
Complete the solution so that the function will break up camel casing, using a space between words.

Example
"camelCasing"  =>  "camel Casing"
"identifier"   =>  "identifier"
""             =>  ""
*/
const solution = (string) => {
  let newStr = [];
  for (letter of string) {
    if (letter.charCodeAt() > 64 && letter.charCodeAt(letter) < 91) {
      newStr.push(" " + letter);
    } else {
      newStr.push(letter);
    }
  }
  return newStr.join("");
};
