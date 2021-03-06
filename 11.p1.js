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
    graph(x,y,powerLevel,size);
  }
  grid.push(col);
}

return 0;


let max = 0;
let mX = 0;
let mY = 0;

const w = 3;

for (let y = 1; y <= size - w; y++) {
  for (let x = 1; x <= size - w; x++) {

    let score = 0;

    for (let dy = 0; dy < w; dy++) {
      for (let dx = 0; dx < w; dx++) {
        const yy = y + dy;
        const xx = x + dx;
        if (grid[yy]) {
          let p = grid[yy][xx] || 0
          score = score + p
        }
      }
    }

    if (score >= max) {
      max = score;
      mX = x;
      mY = y;
      for (let dy = 0; dy < w; dy++) {
        for (let dx = 0; dx < w; dx++) {
          const yy = y + dy;
          const xx = x + dx;
          if (Number.isNaN(score)) console.log(xx,yy);
          if (grid[yy]) {
            let p = grid[yy][xx] || 0
            write(p.toString().padStart(3, ' '));
          }
        }
        write('\n');
      }
      write('\n');
    }
  }
}

console.log(`${serial} : (${mX}, ${mY}) -> ${max}`);




  



