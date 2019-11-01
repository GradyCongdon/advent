const {performance} = require('perf_hooks');


const debug = true;
const x = (...args) => process.stdout.write(args.join(''));
const d = (...args) => debug && console.log(...args);

const wait = (ms) => {
  const start = performance.now();
  while (performance.now() - start < ms) {};
  return true;
}

class Circle {

  constructor(max) {
    this.current = -1;
    this.size = 0;
    this.array = Array.from({length: max});
    this.points = 0;
    this.max = max;
  }

  isDone() {
    return this.points === this.max;
  }

  place(v) {
    this.points = v;
    if (v % 23 === 0 && v !== 0) {
      let pop = (this.current - 7) % this.size;
      if (pop === 0 ) debugger;
      if (pop < 1) pop = this.size + pop;
      const [p] = this.array.splice(pop, 1);
      if (!p) debugger;
      this.current = pop; //??
      this.size = this.size - 1;
      return v + p;
    }

    const i = this.next();
    this.current = i;
    this.array.splice(i, 0, v);
    this.size = this.size + 1;
    return 0;
  }

  next() {
    if (this.size === 0) return 0;
    return (this.current + 1) % this.size + 1;
  }

  print() {
    x(`[${this.points}]`);
    for (let i = 0; i < this.size; i++) {
      const num = this.array[i];
      const out = this.current === i ? ` (${num}) ` : `  ${num}  `;
      x(out);
    }
    x('\n');
  }
}

//const regex = /(\d+) players; last marble is worth (\d+) points/;
//const [all, playerCount, endPoint] = regex.exec(e1);
const tests = [
  [425, 70848*100, null],
];
/*
  [9, 25, 32],
  [10, 1618, 8317],
  [13, 7999, 146373],
  [17, 1104, 2764],
  [21, 6111, 54718],
  [30, 5807, 37305],
 */


tests.forEach(t => {
  const [playerCount, endPoint, score] = t;
  console.log(playerCount, endPoint, score);

  const elves = Array.from({length: playerCount}).fill(0);
  const c = new Circle(endPoint);

  let start = performance.now();
  const clock = (p) => {
    if (p % 500 === 0) {
      const diff = (performance.now() - start);
      const tPt = diff / p; 
      const total = tPt * (endPoint - p) / 1000;
      const percent = (p / endPoint ) * 100;
      console.log(p, Math.round(percent), '%', Math.round(total / 60 / 60), 'h left',  Math.round(total / 60), 'min left'); 
    }
  };

  for (let p = 0; p <= endPoint; p++) {
    clock(p)
    const ei = p % elves.length;
    let score = elves[ei];
    const add = c.place(p);
    elves[ei] = score + add;
    //if (add) console.log(ei, p, add, elves[ei]);
    //c.print();
    // wait(50);
  }

  const final = elves.sort().pop();

  console.log('score: ', score , ' = ', final, ' ', final === score);
});
