const debug = true;
const out = (x) =>  debug && process.stdout.write(x);
const write = (x) =>  debug && process.stdout.write(x);

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
      process.stdout.write(p.toString().padStart(3,' '));
      const diff = x - xMin;
      if (diff !== 0 && diff % width === 0) process.stdout.write('\n');
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


const serial = 2568;
const size = 300;

const power = buildPower(serial);
const sizes = coords(3,1,33,45);
const logWindow = buildLogWindow(...sizes);

const grid = new Array();
grid.push(new Array({length: size}));

for (let y = 1; y <= size; y++) {
  const col = new Array();
  for (let x = 0; x <= size; x++) {
    const powerLevel = power(x,y);
    col.push(powerLevel);
    //graph(x,y,p,size);
  }
  grid.push(col);
}


let max = 0;
let mX = 0;
let mY = 0;
let mW = 0;

let w = 2;

const printer = (w) => {
  for (let yyy = 1; yyy <= w; yyy++) {
    for (let xxx = 1; xxx <= w; xxx++) {
      if (yyy !== w && xxx !== w) {
        write(' . ');
      } else {
        let p = grid[yyy][xxx];
        score = score + p
        if (p >= 0) {
          write(` ${p} `);
        } else {
          write(`${p} `);
        }
      }
    }
    write('\n');
  }
}

y:
for (let y = 1; y <= size; y++) {
  for (let x = 1; x <= size; x++) {
    let score = 0;
    write(`\n (${x}, ${y}) `);
    for (w = 1; w <= (size - y); w++) {
      const next = w+1;

      // calc border
      // ..1
      // ..2
      // 123x2
      for (let i = 1; i < w; i++) {
        score = score + grid[next][i];
        score = score + grid[i][next];
      }

      score = score - grid[next][next]; // remove 1 corner

      if (score >= max) {
        max = score;
        mX = x;
        mY = y;
        mW = w;
      }
      if (w % 10 === 0) write(`${w} -> ${score} `);
    } // w
    write('\n');
  } // x
}

console.log(`${serial} : (${mX}, ${mY}, ${mW}) -> ${max}`);




  



