/*
DESCRIPTION:
The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

Examples
"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))((" 
Notes
Assertion messages may be unclear about what they display in some languages. If you read "...It Should encode XXX", the "XXX" is the expected result, not the input!
*/
function duplicateEncode(word) {
  //Count occurence
  let newStr = "";
  const count = {};
  let caseInsensitive = word.toLowerCase();
  for (element of caseInsensitive) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }
  //Replacing every character
  for (let i = 0; i < caseInsensitive.length; i++) {
    newStr += count[caseInsensitive[i]] > 1 ? ")" : "(";
  }
  return newStr;
}
