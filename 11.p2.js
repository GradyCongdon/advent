const logs = {
  all: false,
};

const debug = (x,l = 'all') =>  logs['all'] && logs[l] && process.stdout.write(x);
const write = (x) => process.stdout.write(x.toString());
const print = (x) => process.stdout.write(x + ' ');

const buildPower = (serial) => {
  const power = (x,y) => {
    let rack = x + 10;
    let power = rack * y;
    power = power + serial;
    power = power * rack;
    power = power
      .toString()
      .padStart(3, '0')
      .slice(-3,-2);
    return power - 5;
  }
  return power;
}

const buildLogWindow = (xMin, xMax, yMin, yMax) => {
  const width = xMax - xMin;
  const logWindow = (x,y,p) => {
    if ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) {
      process.stdout.print(p.toString().padStart(3,' '));
      const diff = x - xMin;
      if (diff !== 0 && diff % width === 0) process.stdout.print('\n');
    }
  }
  return logWindow;
}

const coords = (sizeIn, border, x, y) => {
  const xMin = x - border;
  const xMax = x + (sizeIn - 1) + border
  const yMin = y - border;
  const yMax = y + (sizeIn - 1) + border;
  return [xMin, xMax, yMin, yMax];
}

const graph = (x,y,p) => {
    if (x === 0 || y === 0) {
      if (y === 0 && x !== 0) out(x.toString().padStart(4, '_')); // write col number
      if (x === 0) out(y.toString().padEnd(3, ' ')+'|'); // write roj number
      return false;
    }
    out(p.toString().padStart(4,' '));
    if (x === size) out('\n');
    return true;
}

const printer = (x,y,w) => {
  const endX = w + x;
  const endY = w + y;
  let score = 0;
  for (let yyy = y; yyy < endY; yyy++) {
    for (let xxx = x; xxx < endX; xxx++) {
      let p = grid[yyy][xxx];
      score = score + p;
      if (p >= 0) {
        write(` ${p}`);
      } else {
        write(`${p}`);
      }
    }
    write('\n');
  }
  write(`--- ${score} --- `);
  write('\n');
  write('\n');
}

function test() {
  const power8 = buildPower(8);
  const power57 = buildPower(57);
  const power39 = buildPower(39);
  const power71 = buildPower(71);

  const assert = (p) => {
    if (!p) {
      throw Error('e');
    }
    console.log(p);
    return p;
  }

  assert(power8(3, 5) === 4);
  assert(power57(122, 79) === -5);
  assert(power39(217, 196) === 0);
  assert(power71(101, 153) === 4);
}


const serial = 18;
const size = 3;

const power = buildPower(serial);
// const sizes = coords(3,1,33,45);
// const logWindow = buildLogWindow(...sizes);

const grid = new Array();
grid.push(new Array({length: size}));

for (let y = 1; y <= size; y++) {
  const col = new Array();
  for (let x = 0; x <= size; x++) {
    const powerLevel = power(x,y);
    col.push(powerLevel);
    write(powerLevel);
  }
  grid.push(col);
  print('\n');
}


let max = 0;
let mX = 0;
let mY = 0;
let mW = 0;

for (let y = 1; y <= size; y++) {
  for (let x = 1; x <= size; x++) {
    let score = 0;
    const big = Math.max(x,y);
    console.log(`${x},${y}:`);
    for (let w = 1; w <= (size - big); w++) {
      console.log(`${w}x / ${size - big + 1}`);
      const last = score;
      let current = 0;

      if (w == 1) {
        current = grid[y][x];
        print(grid[y][x]);
      } else {
        // calc border
        // ..1
        // ..2
        // 123x2
        const rows = [];
        for (let i = 1; i <= w; i++) {
          const col = grid[y][i];
          const row = grid[i][x];
          current = current + col
          current = current + row
          rows.push(row);
          console.log(col);
        }
        console.log(rows.join(' ') + '\n\n');
        current = current - grid[y][x]; // remove 1 of double corner
      }
      score = score + current;

      if (score > max) {
        max = score;
        mX = x;
        mY = y;
        mW = w;
        //console.log(`${serial} : (${mX}, ${mY}, ${mW}) -> ${max}`);
      }
      //if (w % 9 === 0) print(`(${x}, ${y}, ${w}) -> ${score} \n`);
    } // w
    console.log();
    //if (x > 2) return;
  } // x
}
return;

console.log(`${serial} : (${mX}, ${mY}, ${mW}) -> ${max}`);
printer(mX,mY,mW);
printer(33,45,3);
