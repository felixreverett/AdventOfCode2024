// Trying inline-braces rather than newline for this solution

var fs = require("fs"); // imports fs
console.time('a');

let antennaMap = new Map();
let antinodePositions = [];

function CoordinatesInBounds(coordinates, array) {
  if ( coordinates[0] >= 0
    && coordinates[0] < array.length
    && coordinates[1] >= 0
    && coordinates[1] < array[0].length
  ) {
    return true;
  }
  return false;
}

function Solution() {
  let cityGrid = fs.readFileSync("08/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n")
    .map(line => line.split(""));

  for (let row = 0; row < cityGrid.length; row++) {
    for (let col = 0; col < cityGrid.length; col++) {
      let val = cityGrid[row][col];
      if (val !== ".") {
        if (antennaMap.has(val)) {
          antennaMap.set(val, antennaMap.get(val).concat([[row, col]]));
        }
        else {
          antennaMap.set(val, [[row, col]]);
        }
      }
    }
  }

  antennaMap.forEach(antenna => {
    for (let a = 0; a < antenna.length; a++) {
      for (let b = a + 1; b < antenna.length; b++) {
        let rowDelta = antenna[a][0] - antenna[b][0];
        let colDelta = antenna[a][1] - antenna[b][1];

        // find antinodes for A
        let antinodeA = [antenna[a][0], antenna[a][1]];
        let inBounds = true;

        while (inBounds) {
          if (!CoordinatesInBounds(antinodeA, cityGrid)) {
            inBounds = false;
          } else {
            if (!antinodePositions.includes(antinodeA[0] * cityGrid.length + antinodeA[1])) {
              antinodePositions.push(antinodeA[0] * cityGrid.length + antinodeA[1]);
            }
          }
          antinodeA[0] += rowDelta;
          antinodeA[1] += colDelta;
        }

        // find antinodes for B
        let antinodeB = [antenna[b][0], antenna[b][1]];
        inBounds = true;

        while (inBounds) {
          if (!CoordinatesInBounds(antinodeB, cityGrid)) {
            inBounds = false;
          } else {
            if (!antinodePositions.includes(antinodeB[0] * cityGrid.length + antinodeB[1])) {
              antinodePositions.push(antinodeB[0] * cityGrid.length + antinodeB[1]);
            }
          }
          antinodeB[0] -= rowDelta;
          antinodeB[1] -= colDelta;
        }
      }
    }
  });

  console.timeEnd('a');
  console.log(antinodePositions.length);
}

Solution();