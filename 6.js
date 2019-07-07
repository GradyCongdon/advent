const d1 = ``;
const d0 = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

const log = (o) => {
  return o;
}

const data = d0
const coords = data
  .split('\n')
  .map(l => {
    return l.split(',')
      .map(i => log(parseInt(i, 10)))
  });

let maxX = -Infinity;
let maxY = -Infinity;
for (let i = 0; i < coords.length; i++) {
  x = coords[i][0];
  y = coords[i][1];
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

let grid = Array(maxX * maxY).fill('x');

let lines = [];
let line = [];
for (let i = 0; i < grid.length; i++) {
  let x = Math.floor(i / maxX);
  let y = i % maxX;
  let min = {
    letter: 'X',
    dist: Infinity,
  };


  for (let j = 0; j < coords.length; j++) {

    let cx = coords[j][0];
    let cy = coords[j][1];
    if (cx === x && cy === y)  {
      min.letter = String.fromCharCode(j + 65);
      break;
    }
    let dist = Math.abs(x - cx) + Math.abs(y - cy);
    if (dist === min.dist) {

      min.letter = '.';
    }
    if (dist < min.dist) {
      min.dist = dist;
      min.letter = String.fromCharCode(j + 97);
    }
    //console.log('c', cx,cy, dist, String.fromCharCode(j + 65));

  }


  line.push(min.letter);

  if (y === 0) {
    lines.push(line.join(''));
    line = [];
  }
}

console.log(lines.join('\n'));





