/*
DESCRIPTION:
Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case). The next words should be always capitalized.

Examples
"the-stealth-warrior" gets converted to "theStealthWarrior"
"The_Stealth_Warrior" gets converted to "TheStealthWarrior"

*/

function toCamelCase(str) {
  let unificarSplit = str.replace(/[^A-Z0-9]/gi, "-").split("-");
  let separarPrimeraPalabra = unificarSplit.slice(0, 1);
  let restoDePalabras = unificarSplit.slice(1);
  let toUpperCase = restoDePalabras
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  let result = separarPrimeraPalabra + toUpperCase;
  return result;
}
