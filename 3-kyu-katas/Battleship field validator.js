/*Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.


Before the game begins, players set up the board and place the ships accordingly to the following rules:
There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
Each ship must be a straight line, except for submarines, which are just single cell.

The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.*/

//Optimus solution

function validateBattlefield(field) {
  var hit = (row, col) =>
    row < 0 || col < 0 || row > 9 || col > 9 ? 0 : field[row][col];
  for (var ships = [10, 0, 0, 0, 0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if (hit(row, col)) {
        if (hit(row - 1, col - 1) || hit(row - 1, col + 1)) return false; // Corner is touching
        if (hit(row - 1, col) && hit(row, col - 1)) return false; // Side is touching
        if ((field[row][col] += hit(row - 1, col) + hit(row, col - 1)) > 4)
          return false; // Ship is too long
        ships[field[row][col]]++;
        ships[field[row][col] - 1]--;
      }
    }
  }
  return [0, 4, 3, 2, 1].every((s, i) => s == ships[i]);
}

//My first Solution
const validateBattlefield = (field) => {
  /*First step:
  A quick check for validity: 1×4-deck ship, 2×3-deck, 3×2-deck, 4×1-deck ships must occupy exactly 1*4 + 2*3 + 3*2 + 4*1 = 20 cells. So if our field does not contain 20 occupied cells, it is invalid (either ships overlap, or there aren't enough ships)
  */
  let occupiedCells = 0;

  for (let row = 0; row < field.length; row++) {
    for (let cell = 0; cell < field[row].length; cell++) {
      if (field[row][cell] === 1) occupiedCells += 1;
    }
  }
  if (occupiedCells !== 20) return false;
  /*Second step:
  Now we need to search the ships and label them so we can later know their location, size and amount.  To do this we are going to use and adapt to our necessities the connected-component labeling of Two-pass 8-connectivity algorithm. In the case of this algorithm we dont need the second pass of it, because with de 8-connectivity, in the case that a ship is touching another one, the first pass is going to label it like one ship with a strange morfology.
  */

  const reglementaryShips = {
    battleship: 1,
    cruiser: 2,
    destroyer: 3,
    submarines: 4,
  };

  const countShipsAndSize = {};
  const classifiedShips = {};

  // To run the algorithm we need to add a padding/margin with a values of 0.
  let addPadToField = field.map((row) => [0, ...row, 0]);
  addPadToField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ...addPadToField,
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let labels = addPadToField.map((p) => p.map((e) => (e = 0)));
  let nextLabel = 0;

  for (let row = 1; row < addPadToField.length; row++) {
    for (let column = 1; column < addPadToField[row].length; column++) {
      let cell = addPadToField[row][column];
      let topCell = addPadToField[row - 1][column];
      let leftCell = addPadToField[row][column - 1];
      let leftCornerCell = addPadToField[row - 1][column - 1];
      let rightCornerCell = addPadToField[row - 1][column + 1];

      if (cell !== 0) {
        let topLabel = labels[row - 1][column];
        let leftLabel = labels[row][column - 1];
        let leftCornerLabel = labels[row - 1][column - 1];
        let rightCornerLabel = labels[row - 1][column + 1];

        if (
          leftLabel !== 0 &&
          leftCornerLabel === 0 &&
          topLabel === 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = leftLabel;
        if (
          leftLabel === 0 &&
          leftCornerLabel !== 0 &&
          topLabel === 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = leftCornerLabel;
        if (
          leftLabel === 0 &&
          leftCornerLabel === 0 &&
          topLabel !== 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = topLabel;
        if (
          leftLabel === 0 &&
          leftCornerLabel === 0 &&
          topLabel === 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = rightCornerLabel;

        if (
          leftLabel !== 0 &&
          leftCornerLabel !== 0 &&
          topLabel === 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = Math.min(leftLabel, leftCornerLabel);
        if (
          leftLabel === 0 &&
          leftCornerLabel !== 0 &&
          topLabel !== 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = Math.min(leftCornerLabel, topLabel);
        if (
          leftLabel === 0 &&
          leftCornerLabel === 0 &&
          topLabel !== 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(topLabel, rightCornerLabel);
        if (
          leftLabel !== 0 &&
          leftCornerLabel === 0 &&
          topLabel === 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(leftLabel, rightCornerLabel);
        if (
          leftLabel !== 0 &&
          leftCornerLabel === 0 &&
          topLabel !== 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = Math.min(leftLabel, topLabel);
        if (
          leftLabel === 0 &&
          leftCornerLabel !== 0 &&
          topLabel === 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(leftCornerLabel, rightCornerLabel);
        if (
          leftLabel !== 0 &&
          leftCornerLabel !== 0 &&
          topLabel !== 0 &&
          rightCornerLabel === 0
        )
          labels[row][column] = Math.min(leftLabel, leftCornerLabel, topLabel);
        if (
          leftLabel !== 0 &&
          leftCornerLabel !== 0 &&
          topLabel === 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(
            leftLabel,
            leftCornerLabel,
            rightCornerLabel
          );
        if (
          leftLabel !== 0 &&
          leftCornerLabel === 0 &&
          topLabel !== 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(leftLabel, topLabel, rightCornerLabel);
        if (
          leftLabel === 0 &&
          leftCornerLabel !== 0 &&
          topLabel !== 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(
            leftCornerLabel,
            topLabel,
            rightCornerLabel
          );
        if (
          leftLabel !== 0 &&
          leftCornerLabel !== 0 &&
          topLabel !== 0 &&
          rightCornerLabel !== 0
        )
          labels[row][column] = Math.min(
            leftLabel,
            leftCornerLabel,
            topLabel,
            rightCornerLabel
          );
        if (
          topCell === 0 &&
          leftCell === 0 &&
          leftCornerCell === 0 &&
          rightCornerCell === 0
        ) {
          nextLabel += 1;
          labels[row][column] = nextLabel;
        }
      }
    }
  }

  /* Third step:
 Now we need to count the amount of ships we have on the field and their sizes to classify them
*/
  for (let row = 0; row < labels.length; row++) {
    for (let cell = 0; cell < labels[row].length; cell++) {
      if (labels[row][cell] !== 0)
        countShipsAndSize[labels[row][cell]] =
          (countShipsAndSize[labels[row][cell]] || 0) + 1;
    }
  }

  for (let ships in countShipsAndSize) {
    if (countShipsAndSize[ships] > 4)
      classifiedShips["unidentifiedObject"] =
        (classifiedShips["unidentifiedObject"] || 0) + 1;
    if (countShipsAndSize[ships] === 4)
      classifiedShips["battleship"] = (classifiedShips["battleship"] || 0) + 1;
    if (countShipsAndSize[ships] === 3)
      classifiedShips["cruiser"] = (classifiedShips["cruiser"] || 0) + 1;
    if (countShipsAndSize[ships] === 2)
      classifiedShips["destroyer"] = (classifiedShips["destroyer"] || 0) + 1;
    if (countShipsAndSize[ships] === 1)
      classifiedShips["submarines"] = (classifiedShips["submarines"] || 0) + 1;
  }

  /*Fourth step:
  Now we are going to verify if we have a ship with a strange morlofy, thats mean that is touching another one
  */
  const widthAndHeigthOfShips = {};

  for (let key in countShipsAndSize) {
    let s = Number(key);
    for (let row = 1; row < labels.length - 1; row++) {
      for (let column = 1; column < labels[row].length - 1; column++) {
        if (s === labels[row][column]) {
          if (widthAndHeigthOfShips[s] !== undefined) {
            widthAndHeigthOfShips[s]["width"].push(column);
            widthAndHeigthOfShips[s]["heigth"].push(row);
          } else {
            widthAndHeigthOfShips[s] = { width: [column], heigth: [row] };
          }
        }
      }
    }
  }

  for (let shipSize in widthAndHeigthOfShips) {
    if (
      widthAndHeigthOfShips[shipSize]["width"].length > 1 &&
      widthAndHeigthOfShips[shipSize]["heigth"].length > 1
    ) {
      if (
        Math.max(...widthAndHeigthOfShips[shipSize]["heigth"]) -
          Math.min(...widthAndHeigthOfShips[shipSize]["heigth"]) !==
          0 &&
        Math.max(...widthAndHeigthOfShips[shipSize]["width"]) -
          Math.min(...widthAndHeigthOfShips[shipSize]["width"]) !==
          0
      )
        return false;
    }
  }
  /* Fifth step:
  And finally we have to verify if the classification of ships and the amount of the is correct. To do this we have to campare two Objects.
  */
  const classifiedShipsLength = Object.keys(classifiedShips).length;
  const reglementaryShipsLength = Object.keys(reglementaryShips).length;

  if (reglementaryShipsLength === classifiedShipsLength) {
    return Object.keys(reglementaryShips).every(
      (key) =>
        classifiedShips.hasOwnProperty(key) &&
        classifiedShips[key] === reglementaryShips[key]
    );
  } else {
    return false;
  }
};
